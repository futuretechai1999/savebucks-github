import crypto from 'crypto';
export async function POST(req){
const s='savebucks_webhook_secret_2024_123456';
const b=await req.text();
const h=crypto.createHmac('sha256',s).update(b).digest('hex');
if(h!==req.headers.get('x-signature')) return new Response('Invalid',{status:401});
const p=JSON.parse(b);
console.log(p.meta.event_name,p.data.attributes.user_email);
return new Response('OK',{status:200});
}
export async function GET(){
return new Response('SaveBucks Webhook is Live! ✅',{status:200});
}