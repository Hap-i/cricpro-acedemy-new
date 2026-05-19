import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/services/supabase';
import { sendInquiryConfirmation, sendAdminInquiryNotification } from '@/lib/services/email';
import type { DbInquiry } from '@/lib/db/schema';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    let query = supabaseAdmin.from('inquiries').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('type', type);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ success: true, inquiries: data });
  } catch (error) {
    console.error('Inquiries fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message } = body;

    if (!type || !name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const inquiry: Partial<DbInquiry> = { type, name, email, phone: phone || null, message, status: 'new' };

    const { data, error } = await supabaseAdmin.from('inquiries').insert(inquiry).select().single();
    if (error) throw error;

    // Send emails (non-blocking)
    sendInquiryConfirmation({ name, email, type }).catch(console.error);
    sendAdminInquiryNotification({ name, email, type, message }).catch(console.error);

    return NextResponse.json({ success: true, inquiry: data });
  } catch (error) {
    console.error('Inquiry creation error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create inquiry' }, { status: 500 });
  }
}
