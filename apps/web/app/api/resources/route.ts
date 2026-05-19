import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');

    let query = supabaseAdmin
      .from('resources')
      .select('id, name, type, capacity')
      .eq('active', true);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.order('type').order('name');

    if (error) throw error;

    return NextResponse.json({ success: true, resources: data });
  } catch (error) {
    console.error('Resources fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}
