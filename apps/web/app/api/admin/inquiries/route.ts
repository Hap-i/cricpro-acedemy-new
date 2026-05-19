import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabaseAdmin
      .from('inquiries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      inquiries: data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    });
  } catch (error) {
    console.error('Admin inquiries fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, inquiry: data });
  } catch (error) {
    console.error('Admin inquiry update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
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
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin inquiry delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}