import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('group_sessions')
      .select('*')
      .eq('active', true)
      .order('schedule');

    if (error) throw error;

    return NextResponse.json({ success: true, sessions: data });
  } catch (error) {
    console.error('Group sessions fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch group sessions' },
      { status: 500 }
    );
  }
}
