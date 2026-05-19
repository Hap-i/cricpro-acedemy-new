import { NextResponse } from 'next/server';
import { supabase } from '@/lib/services/supabase';

export async function GET() {
  try {
    // Test connection by fetching resources
    const { data, error } = await supabase
      .from('resources')
      .select('id, name, type, active, peak_price, offpeak_price')
      .limit(10);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      resources: data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Connection failed' },
      { status: 500 }
    );
  }
}