'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  booking_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  start_at: string;
  end_at: string;
  status: string;
  payment_status: string;
  amount: string;
  resource: { name: string; type: string };
  service_type: string;
  created_at: string;
  notes: string | null;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / 20);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, page]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      params.set('page', page.toString());

      const res = await fetch(`/api/admin/bookings?${params}`);
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  }

  async function updatePaymentStatus(id: string, newStatus: string) {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, payment_status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(bookings.map(b => b.id === id ? { ...b, payment_status: newStatus } : b));
      }
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  }

  const statusColors: Record<string, string> = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    expired: 'bg-gray-100 text-gray-800',
    refunded: 'bg-purple-100 text-purple-800'
  };

  const paymentColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Statuses</option>
          <option value="pending_payment">Pending Payment</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No bookings found
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ref</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{booking.booking_reference}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-900">{booking.customer_name}</div>
                        <div className="text-gray-500 text-xs">{booking.customer_email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{booking.resource?.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(booking.start_at).toLocaleDateString()}
                        <div className="text-xs">
                          {new Date(booking.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                          {new Date(booking.end_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">£{booking.amount}</td>
                      <td className="px-4 py-3">
                        <select
                          value={booking.status}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded border ${statusColors[booking.status] || 'bg-gray-100'}`}
                        >
                          <option value="pending_payment">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                          <option value="expired">Expired</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${paymentColors[booking.payment_status] || 'bg-gray-100'}`}>
                          {booking.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => {
                            const notes = prompt('Add notes:', booking.notes || '');
                            if (notes !== null) {
                              fetch('/api/admin/bookings', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: booking.id, notes })
                              });
                            }
                          }}
                          className="text-primary hover:underline"
                        >
                          Notes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}