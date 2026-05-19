import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import { paymentsEnabled, createCheckoutSession } from '@/lib/services/stripe';

export async function POST(request: NextRequest) {
  if (!paymentsEnabled) {
    return NextResponse.json({ success: false, error: 'Payments are not enabled' }, { status: 503 });
  }

  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 });
    }

    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('status', 'pending_payment')
      .single();

    if (error || !booking) {
      return NextResponse.json({ success: false, error: 'Booking not found or already processed' }, { status: 404 });
    }

    if (booking.expires_at && new Date(booking.expires_at) < new Date()) {
      return NextResponse.json({ success: false, error: 'Booking has expired. Please create a new booking.' }, { status: 410 });
    }

    const serviceLabel = booking.service_type.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    const { sessionId, url } = await createCheckoutSession({
      bookingId: booking.id,
      bookingReference: booking.booking_reference,
      serviceType: booking.service_type,
      amount: booking.amount,
      customerEmail: booking.customer_email,
      customerName: booking.customer_name,
      description: `${serviceLabel} – ${new Date(booking.booking_date).toLocaleDateString('en-GB')}`,
    });

    await supabaseAdmin.from('bookings').update({ stripe_session_id: sessionId }).eq('id', bookingId);

    return NextResponse.json({ success: true, paymentUrl: url, sessionId });
  } catch (error: any) {
    console.error('Create payment session error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to create payment session' }, { status: 500 });
  }
}
