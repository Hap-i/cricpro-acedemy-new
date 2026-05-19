"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Calendar, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/auth"

interface LaneResource {
  id: string
  name: string
  capacity: number
}

export default function LaneHirePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [lanes, setLanes] = useState<LaneResource[]>([])
  const [selectedLaneId, setSelectedLaneId] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [slots, setSlots] = useState<
    Array<{ time: string; availableLanes: number; price: string }>
  >([])
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    duration: "1",
    players: "1",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  // Pre-fill form from logged-in user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name ?? prev.name,
        email: user.email ?? prev.email,
        phone: user.user_metadata?.phone ?? prev.phone,
      }))
    }
  }, [user])

  // Fetch active lanes on mount
  useEffect(() => {
    async function fetchLanes() {
      try {
        const res = await fetch("/api/resources?type=lane")
        const data = await res.json()
        if (data.success && data.resources.length > 0) {
          setLanes(data.resources)
          setSelectedLaneId(data.resources[0].id)
        }
      } catch (e) {
        console.error("Failed to fetch lanes:", e)
      }
    }
    fetchLanes()
  }, [])

  // Refetch slots when lane or date changes
  useEffect(() => {
    if (selectedDate && selectedLaneId) fetchSlots()
  }, [selectedDate, selectedLaneId])

  async function fetchSlots() {
    setLoading(true)
    setSlots([])
    setSelectedSlots([])
    setTotalPrice(0)
    try {
      const res = await fetch(
        `/api/slots?resourceType=lane&resourceId=${selectedLaneId}&date=${selectedDate}`
      )
      const data = await res.json()
      if (data.success && data.dates.length > 0) {
        setSlots(data.dates[0].slots)
      }
    } catch (e) {
      console.error("Failed to fetch slots:", e)
    } finally {
      setLoading(false)
    }
  }

  function switchLane(laneId: string) {
    setSelectedLaneId(laneId)
    setSelectedSlots([])
    setTotalPrice(0)
    setSlots([])
  }

  function toggleSlot(time: string) {
    setSelectedSlots((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].sort()
    )
  }

  useEffect(() => {
    let price = 0
    selectedSlots.forEach((slotTime) => {
      const slot = slots.find((s) => s.time === slotTime)
      if (slot) price += parseFloat(slot.price) * parseInt(formData.duration)
    })
    setTotalPrice(price)
  }, [selectedSlots, slots, formData.duration])

  function formatTime(time: string) {
    const hour = parseInt(time.split(":")[0] ?? "0")
    const min = time.split(":")[1] ?? "00"
    if (hour === 0) return `12:${min} AM`
    if (hour < 12) return `${hour}:${min} AM`
    if (hour === 12) return `12:${min} PM`
    return `${hour - 12}:${min} PM`
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.")
      return
    }
    if (totalPrice === 0) {
      alert("Please ensure selected slots have prices.")
      return
    }
    if (!selectedLaneId) {
      alert("Please select a lane.")
      return
    }

    const lane = lanes.find((l) => l.id === selectedLaneId)
    sessionStorage.setItem(
      "pendingBooking",
      JSON.stringify({
        serviceType: "lane_hire",
        serviceLabel: `Lane Hire — ${lane?.name ?? "Lane"}`,
        resourceId: selectedLaneId,
        bookingDate: formData.date,
        selectedSlots,
        slots,
        duration: formData.duration,
        totalPrice,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        playerCount: parseInt(formData.players),
        notes: formData.notes,
      })
    )
    router.push("/booking-confirm")
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <Badge className="mb-4">Lane Hire</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Practice at Your Own Pace
            </h1>
            <p className="text-lg text-muted-foreground">
              Book our premium indoor lanes for solo practice or play with
              friends. Professional environment with floodlight-quality
              lighting.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Off Peak */}
            <Card className="border-2 border-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Off Peak</Badge>
                </CardTitle>
                <CardDescription>
                  Best value for flexible training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-4xl font-bold text-primary">£15</div>
                <p className="mb-4 text-sm text-muted-foreground">per hour</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    12 PM – 4 PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    10 PM – 12 AM
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Peak */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-primary">Peak</Badge>
                </CardTitle>
                <CardDescription>Evening & afternoon sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-4xl font-bold text-primary">£25</div>
                <p className="mb-4 text-sm text-muted-foreground">per hour</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />4 PM – 10
                    PM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Most popular times
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            What You Get
          </h2>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">12-Hour Access</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Open 12 PM to 12 AM, 7 days a week
              </p>
            </Card>
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Up to 6 Players</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Perfect for groups or team practice
              </p>
            </Card>
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Flexible Booking</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Book 1-3 hours at a time
              </p>
            </Card>
            <Card className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Professional Lanes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                4 indoor lanes with premium setup
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-center text-2xl font-bold">Book a Lane</h2>

            {/* Lane Tabs */}
            {lanes.length > 0 && (
              <div className="mb-6 flex gap-2 border-b border-border">
                {lanes.map((lane) => (
                  <button
                    key={lane.id}
                    onClick={() => switchLane(lane.id)}
                    className={`-mb-px rounded-t-lg border-b-2 px-5 py-2.5 text-sm font-medium transition-colors ${
                      selectedLaneId === lane.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {lane.name}
                    {/* <span className="ml-1.5 text-xs opacity-60">Up to {lane.capacity} players</span> */}
                  </button>
                ))}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>
                  {lanes.find((l) => l.id === selectedLaneId)?.name ??
                    "Book Your Lane"}
                </CardTitle>
                <CardDescription>
                  Select date, check availability, and confirm your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value })
                        setSelectedDate(e.target.value)
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Available Slots</Label>
                    {loading ? (
                      <div className="flex h-24 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                      </div>
                    ) : !formData.date ? (
                      <p className="text-sm text-muted-foreground">
                        Select a date to see available slots.
                      </p>
                    ) : slots.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No slots available for this lane on the selected date.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                        {slots.map((slot) => {
                          const booked = slot.availableLanes === 0
                          const selected = selectedSlots.includes(slot.time)
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => !booked && toggleSlot(slot.time)}
                              disabled={booked}
                              className={`flex flex-col items-center rounded-md border px-1 py-2 text-xs transition-colors ${
                                booked
                                  ? "cursor-not-allowed border-border/30 bg-muted/20 text-muted-foreground/40 line-through"
                                  : selected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border hover:border-primary/60 hover:bg-primary/5"
                              }`}
                            >
                              <span className="text-sm font-semibold">
                                {formatTime(slot.time)}
                              </span>
                              <span className="mt-0.5 opacity-70">
                                {booked ? "Booked" : "Available"}
                              </span>
                              <span className="mt-0.5 font-medium">
                                £{parseFloat(slot.price).toFixed(2)}/hr
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) =>
                          setFormData({ ...formData, duration: value })
                        }
                        disabled={selectedSlots.length === 0}
                      >
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Hour</SelectItem>
                          <SelectItem value="2">2 Hours</SelectItem>
                          <SelectItem value="3">3 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="players">Number of Players</Label>
                      <Select
                        value={formData.players}
                        onValueChange={(value) =>
                          setFormData({ ...formData, players: value })
                        }
                      >
                        <SelectTrigger id="players">
                          <SelectValue placeholder="Select players" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Player</SelectItem>
                          <SelectItem value="2">2 Players</SelectItem>
                          <SelectItem value="3">3 Players</SelectItem>
                          <SelectItem value="4">4 Players</SelectItem>
                          <SelectItem value="5">5 Players</SelectItem>
                          <SelectItem value="6">6 Players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="07xxx xxx xxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Requests (Optional)</Label>
                    <Input
                      id="notes"
                      placeholder="Any special requirements"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4 text-lg font-bold">
                    <span>Total:</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={selectedSlots.length === 0 || totalPrice === 0}
                  >
                    Confirm Booking
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/20 py-12">
        <div className="container px-4 text-center">
          <h3 className="mb-4 text-xl font-semibold">
            Questions about lane hire?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Our team is happy to help you plan your training session
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
