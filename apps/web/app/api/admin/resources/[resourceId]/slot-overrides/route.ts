import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = supabaseAdmin
      .from('slot_overrides')
      .select('*')
      .eq('resource_id', resourceId)
      .order('start_at', { ascending: true });

    if (startDate) {
      query = query.gte('start_at', startDate);
    }

    if (endDate) {
      query = query.lte('start_at', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, overrides: data });
  } catch (error) {
    console.error('Slot overrides fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slot overrides' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { slot_date, start_at, end_at, custom_price, blocked, reason } = body;

    if (!slot_date || !start_at || !end_at) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: slot_date, start_at, end_at' },
        { status: 400 }
      );
    }

    if (new Date(start_at) >= new Date(end_at)) {
      return NextResponse.json(
        { success: false, error: 'End time must be after start time' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('slot_overrides')
      .insert({
        resource_id: resourceId,
        slot_date,
        start_at,
        end_at,
        custom_price: custom_price ? parseFloat(custom_price) : null,
        blocked: blocked || false,
        reason: reason || null
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, override: data });
  } catch (error) {
    console.error('Slot override creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create slot override' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { id, slot_date, start_at, end_at, custom_price, blocked, reason } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Override ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (slot_date) updateData.slot_date = slot_date;
    if (start_at) updateData.start_at = start_at;
    if (end_at) updateData.end_at = end_at;
    if (custom_price !== undefined) updateData.custom_price = custom_price ? parseFloat(custom_price) : null;
    if (blocked !== undefined) updateData.blocked = blocked;
    if (reason !== undefined) updateData.reason = reason;

    const { data, error } = await supabaseAdmin
      .from('slot_overrides')
      .update(updateData)
      .eq('id', id)
      .eq('resource_id', resourceId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, override: data });
  } catch (error) {
    console.error('Slot override update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update slot override' },
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
        { success: false, error: 'Override ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('slot_overrides')
      .delete()
      .eq('id', id)
      .eq('resource_id', resourceId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Slot override delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete slot override' },
      { status: 500 }
    );
  }
}