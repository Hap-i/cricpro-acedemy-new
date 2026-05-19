import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;

    const { data, error } = await supabaseAdmin
      .from('pricing_rules')
      .select('*')
      .eq('resource_id', resourceId)
      .order('priority', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, rules: data });
  } catch (error) {
    console.error('Pricing rules fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pricing rules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { name, start_time, end_time, days, price, priority, active } = body;

    if (!name || !start_time || !end_time || !days || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, start_time, end_time, days, price' },
        { status: 400 }
      );
    }

    if (!Array.isArray(days) || days.length === 0) {
      return NextResponse.json(
        { success: false, error: 'days must be a non-empty array' },
        { status: 400 }
      );
    }

    for (const day of days) {
      if (day < 0 || day > 6) {
        return NextResponse.json(
          { success: false, error: 'Each day must be between 0 (Sunday) and 6 (Saturday)' },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabaseAdmin
      .from('pricing_rules')
      .insert({
        resource_id: resourceId,
        name,
        start_time,
        end_time,
        days,
        price: parseFloat(price),
        priority: priority || 1,
        active: active !== undefined ? active : true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, rule: data });
  } catch (error) {
    console.error('Pricing rule creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create pricing rule' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ resourceId: string }> }) {
  try {
    const { resourceId } = await params;
    const body = await request.json();
    const { id, name, start_time, end_time, days, price, priority, active } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Rule ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (start_time) updateData.start_time = start_time;
    if (end_time) updateData.end_time = end_time;
    if (days) updateData.days = days;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (priority !== undefined) updateData.priority = priority;
    if (active !== undefined) updateData.active = active;

    const { data, error } = await supabaseAdmin
      .from('pricing_rules')
      .update(updateData)
      .eq('id', id)
      .eq('resource_id', resourceId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, rule: data });
  } catch (error) {
    console.error('Pricing rule update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update pricing rule' },
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
      .from('pricing_rules')
      .delete()
      .eq('id', id)
      .eq('resource_id', resourceId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pricing rule delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete pricing rule' },
      { status: 500 }
    );
  }
}