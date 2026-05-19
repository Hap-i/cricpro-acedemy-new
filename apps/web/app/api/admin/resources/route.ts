import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');

    let query = supabaseAdmin.from('resources').select('*');

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query
      .order('type')
      .order('name');

    if (error) throw error;

    return NextResponse.json({ success: true, resources: data });
  } catch (error) {
    console.error('Admin resources fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, active, capacity } = body;

    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('resources')
      .insert({
        name,
        type,
        active: active ?? true,
        capacity: capacity ?? 1,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, resource: data });
  } catch (error) {
    console.error('Admin resource create error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, type, active, capacity } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (active !== undefined) updateData.active = active;
    if (capacity) updateData.capacity = capacity;

    const { data, error } = await supabaseAdmin
      .from('resources')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, resource: data });
  } catch (error) {
    console.error('Admin resource update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update resource' },
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
        { success: false, error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    // Check if resource has bookings
    const { data: bookings } = await supabaseAdmin
      .from('bookings')
      .select('id')
      .eq('resource_id', id)
      .limit(1);

    if (bookings && bookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete resource with existing bookings' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin resource delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}