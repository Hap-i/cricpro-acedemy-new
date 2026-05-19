import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const resourceId = searchParams.get('resourceId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = supabaseAdmin
      .from('blocked_slots')
      .select(`
        *,
        resource:resources(name, type)
      `)
      .order('start_at', { ascending: true });

    if (resourceId) {
      query = query.eq('resource_id', resourceId);
    }

    if (startDate) {
      query = query.gte('start_at', startDate);
    }

    if (endDate) {
      query = query.lte('start_at', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, blockedSlots: data });
  } catch (error) {
    console.error('Admin blocked slots fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blocked slots' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resource_id, start_at, end_at, reason, created_by } = body;

    if (!resource_id || !start_at || !end_at || !reason) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    if (new Date(start_at) >= new Date(end_at)) {
      return NextResponse.json(
        { success: false, error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    // Check for conflicts with existing bookings
    const { data: conflicts } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('resource_id', resource_id)
      .eq('status', 'confirmed')
      .lt('start_at', end_at)
      .gt('end_at', start_at);

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Slot conflicts with existing bookings' },
        { status: 409 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('blocked_slots')
      .insert({
        resource_id,
        start_at,
        end_at,
        reason,
        created_by
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, blockedSlot: data });
  } catch (error) {
    console.error('Admin blocked slot create error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blocked slot' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Blocked slot ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('blocked_slots')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin blocked slot delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blocked slot' },
      { status: 500 }
    );
  }
}