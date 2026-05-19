import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const resourceId = searchParams.get('resourceId');
    const serviceType = searchParams.get('serviceType');

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date is required' },
        { status: 400 }
      );
    }

    // Parse date and get start/end of day
    const selectedDate = new Date(date);
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Determine time slots based on service type
    const isPeak = selectedDate.getDay() === 6 || selectedDate.getDay() === 0; // Weekend

    // Generate time slots (9 AM to 10 PM)
    const timeSlots: { time: string; available: boolean; price: string }[] = [];

    const startHour = 9;
    const endHour = 22;

    for (let hour = startHour; hour < endHour; hour++) {
      const slotStart = new Date(selectedDate);
      slotStart.setUTCHours(hour, 0, 0, 0);
      const slotEnd = new Date(selectedDate);
      slotEnd.setUTCHours(hour + 1, 0, 0, 0);

      // Check if slot is in the past
      const now = new Date();
      const isPast = slotStart < now;

      // Check existing bookings for this slot
      let booked = false;

      // If specific resource requested, check that resource
      if (resourceId) {
        const { data: bookings } = await supabaseAdmin
          .from('bookings')
          .select('id')
          .eq('resource_id', resourceId)
          .in('status', ['confirmed', 'pending_payment'])
          .gte('start_at', slotStart.toISOString())
          .lt('start_at', slotEnd.toISOString());

        booked = (bookings?.length ?? 0) > 0;
      } else if (serviceType) {
        // For service types, find available resources
        let resourceType = 'lane';
        if (serviceType === 'bowling_machine') resourceType = 'bowling_machine';
        else if (serviceType === 'side_arm') resourceType = 'side_arm';

        // Get all active resources of this type
        const { data: resources } = await supabaseAdmin
          .from('resources')
          .select('id')
          .eq('type', resourceType)
          .eq('active', true);

        if (resources && resources.length > 0) {
          const resourceIds = resources.map(r => r.id);

          const { data: bookings } = await supabaseAdmin
            .from('bookings')
            .select('resource_id')
            .in('resource_id', resourceIds)
            .in('status', ['confirmed', 'pending_payment'])
            .gte('start_at', slotStart.toISOString())
            .lt('start_at', slotEnd.toISOString());

          // If all resources booked, slot is unavailable
          booked = (bookings?.length ?? 0) >= resources.length;
        }
      }

      // Check blocked slots
      const { data: blockedSlots } = await supabaseAdmin
        .from('blocked_slots')
        .select('id')
        .gte('start_at', slotStart.toISOString())
        .lt('start_at', slotEnd.toISOString());

      const blocked = (blockedSlots?.length ?? 0) > 0;

      const price = isPeak ? (hour >= 16 ? '25.00' : '25.00') : '15.00';

      timeSlots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: !isPast && !booked && !blocked,
        price
      });
    }

    return NextResponse.json({
      success: true,
      date,
      isPeak,
      slots: timeSlots
    });
  } catch (error) {
    console.error('Availability error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}