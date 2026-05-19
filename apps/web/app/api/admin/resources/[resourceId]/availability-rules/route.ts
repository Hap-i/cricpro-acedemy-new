import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;

    const { data, error } = await supabaseAdmin
      .from('resource_availability_rules')
      .select('*')
      .eq('resource_id', resourceId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, rules: data });
  } catch (error) {
    console.error('Availability rules fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability rules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { day_of_week, start_time, end_time, slot_duration_mins, buffer_mins, active } = body;

    if (day_of_week === undefined || !start_time || !end_time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: day_of_week, start_time, end_time' },
        { status: 400 }
      );
    }

    if (day_of_week < 0 || day_of_week > 6) {
      return NextResponse.json(
        { success: false, error: 'day_of_week must be between 0 (Sunday) and 6 (Saturday)' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('resource_availability_rules')
      .insert({
        resource_id: resourceId,
        day_of_week,
        start_time,
        end_time,
        slot_duration_mins: slot_duration_mins || 60,
        buffer_mins: buffer_mins || 0,
        active: active !== undefined ? active : true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, rule: data });
  } catch (error) {
    console.error('Availability rule creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create availability rule' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { id, day_of_week, start_time, end_time, slot_duration_mins, buffer_mins, active } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Rule ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (day_of_week !== undefined) updateData.day_of_week = day_of_week;
    if (start_time) updateData.start_time = start_time;
    if (end_time) updateData.end_time = end_time;
    if (slot_duration_mins !== undefined) updateData.slot_duration_mins = slot_duration_mins;
    if (buffer_mins !== undefined) updateData.buffer_mins = buffer_mins;
    if (active !== undefined) updateData.active = active;

    const { data, error } = await supabaseAdmin
      .from('resource_availability_rules')
      .update(updateData)
      .eq('id', id)
      .eq('resource_id', resourceId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, rule: data });
  } catch (error) {
    console.error('Availability rule update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update availability rule' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Rule ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('resource_availability_rules')
      .delete()
      .eq('id', id)
      .eq('resource_id', resourceId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Availability rule delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete availability rule' },
      { status: 500 }
    );
  }
}