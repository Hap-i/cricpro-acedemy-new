import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? 'noreply@nextgencricket.co.uk';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@nextgencricket.co.uk';

async function send(to: string, subject: string, html: string): Promise<void> {
  if (!resend) {
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}\n${subject}`);
    return;
  }
  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) console.error('[EMAIL] Send error:', error);
}

// ─── Templates ────────────────────────────────────────────────────────────────

function bookingConfirmationHtml(b: {
  booking_reference: string;
  service_type: string;
  booking_date: string;
  start_at: string;
  amount: string;
  customer_name: string;
}) {
  const service = b.service_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const date = new Date(b.booking_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const time = new Date(b.start_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1d2544">
      <h2 style="color:#c21d4c;margin-bottom:4px">Booking Confirmed!</h2>
      <p>Hi ${b.customer_name}, your booking is confirmed.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0">
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Reference</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">${b.booking_reference}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Service</td><td style="padding:8px 0;border-bottom:1px solid #eee">${service}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Date</td><td style="padding:8px 0;border-bottom:1px solid #eee">${date}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666">Time</td><td style="padding:8px 0;border-bottom:1px solid #eee">${time}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Amount</td><td style="padding:8px 0;font-weight:bold">£${b.amount}</td></tr>
      </table>
      <p style="color:#666;font-size:14px">Please arrive 5 minutes before your session. For any questions contact us at info@nextgencricket.co.uk</p>
      <p style="color:#666;font-size:12px;margin-top:24px">Next Gen Cricket Academy · Cricpro Centre of Excellence</p>
    </div>`;
}

function inquiryConfirmationHtml(name: string, type: string) {
  const subject = type === 'birthday_party' ? 'Birthday Party' : type === 'coaching' ? 'Coaching' : 'General';
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1d2544">
      <h2 style="color:#c21d4c">Thanks for your enquiry!</h2>
      <p>Hi ${name}, we've received your ${subject} enquiry and will be in touch within 24 hours.</p>
      <p style="color:#666;font-size:14px">In the meantime, feel free to browse our <a href="https://nextgencricket.co.uk" style="color:#c21d4c">website</a> for more information.</p>
      <p style="color:#666;font-size:12px;margin-top:24px">Next Gen Cricket Academy · Cricpro Centre of Excellence</p>
    </div>`;
}

function groupSessionConfirmationHtml(booking: {
  player_name: string;
  parent_name: string;
}, session: { title: string; price: string }) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1d2544">
      <h2 style="color:#c21d4c">Group Session Booking Confirmed!</h2>
      <p>Hi ${booking.parent_name},</p>
      <p>${booking.player_name} has been successfully registered for <strong>${session.title}</strong>.</p>
      <p>Session fee: <strong>£${session.price}</strong></p>
      <p style="color:#666;font-size:14px">Please ensure your player arrives 10 minutes before the session starts. Full cricket kit is recommended.</p>
      <p style="color:#666;font-size:12px;margin-top:24px">Next Gen Cricket Academy · Cricpro Centre of Excellence</p>
    </div>`;
}

// ─── Exported functions ───────────────────────────────────────────────────────

export async function sendBookingConfirmation(booking: {
  booking_reference: string;
  service_type: string;
  booking_date: string;
  start_at: string;
  amount: string;
  customer_name: string;
  customer_email: string;
}) {
  await send(
    booking.customer_email,
    `Booking Confirmed – ${booking.booking_reference} | Next Gen Cricket Academy`,
    bookingConfirmationHtml(booking)
  );
}

export async function sendAdminBookingNotification(booking: {
  booking_reference: string;
  service_type: string;
  booking_date: string;
  start_at: string;
  amount: string;
  customer_name: string;
  customer_email: string;
}) {
  const service = booking.service_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  await send(
    ADMIN_EMAIL,
    `New Booking: ${booking.booking_reference} – ${service}`,
    `<p>New booking received:</p><pre>${JSON.stringify(booking, null, 2)}</pre>`
  );
}

export async function sendInquiryConfirmation(inquiry: {
  name: string;
  email: string;
  type: string;
}) {
  await send(
    inquiry.email,
    `Enquiry Received | Next Gen Cricket Academy`,
    inquiryConfirmationHtml(inquiry.name, inquiry.type)
  );
}

export async function sendAdminInquiryNotification(inquiry: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  await send(
    ADMIN_EMAIL,
    `New Enquiry from ${inquiry.name}`,
    `<p>New enquiry received:</p><pre>${JSON.stringify(inquiry, null, 2)}</pre>`
  );
}

export async function sendGroupSessionConfirmation(
  booking: { player_name: string; parent_name: string; parent_email: string },
  session: { title: string; price: string }
) {
  await send(
    booking.parent_email,
    `Group Session Booking Confirmed | Next Gen Cricket Academy`,
    groupSessionConfirmationHtml(booking, session)
  );
}
