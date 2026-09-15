import crypto from 'crypto';
export async function POST(req) {
const secret = 'savebucks_webhook_secret_2024_123456';
try {
const rawBody = await req.text();
const signature = req.headers.get('x-signature');
const hmac = crypto.createHmac('sha256', secret);
const digest = hmac.update(rawBody).digest('hex');
if (digest !== signature) {
return new Response('Invalid signature', { status: 401 });
}
const payload = JSON.parse(rawBody);
const eventName = payload.meta.event_name;
console.log('Event:', eventName);
if (eventName === 'order_created' || eventName === 'subscription_created' || eventName === 'license_key_created') {
const customerEmail = payload.data.attributes.user_email;
console.log('New Customer:', customerEmail);
}
return new Response('Webhook received!', { status: 200 });
} catch (error) {
return new Response('Error', { status: 500 });
}
}
export async function GET() {
return new Response('SaveBucks Webhook is Live! ✅', { status: 200 });
}