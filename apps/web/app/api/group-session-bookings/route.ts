import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import { sendGroupSessionConfirmation } from '@/lib/services/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      session_id, player_name, player_age, parent_name, parent_email,
      parent_phone, emergency_contact, medical_notes, skill_level
    } = body;

    if (!session_id || !player_name || !parent_name || !parent_email || !parent_phone) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Check session exists and has space
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('group_sessions')
      .select('id, max_players, current_players, title, price')
      .eq('id', session_id)
      .eq('active', true)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ success: false, error: 'Session not found or inactive' }, { status: 404 });
    }

    if (session.current_players >= session.max_players) {
      return NextResponse.json({ success: false, error: 'Session is full' }, { status: 400 });
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('group_session_bookings')
      .insert({ session_id, player_name, player_age: player_age ? parseInt(player_age) : null,
        parent_name, parent_email, parent_phone, emergency_contact, medical_notes, skill_level })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Increment player count
    await supabaseAdmin.from('group_sessions')
      .update({ current_players: session.current_players + 1 })
      .eq('id', session_id);

    // Send confirmation email (non-blocking)
    sendGroupSessionConfirmation(
      { player_name, parent_name, parent_email },
      { title: session.title, price: String(session.price) }
    ).catch(console.error);

    return NextResponse.json({ success: true, booking, message: 'Booking successful' });
  } catch (error) {
    console.error('Group session booking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to complete booking' }, { status: 500 });
  }
}
