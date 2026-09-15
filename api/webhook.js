export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send('SaveBucks Webhook is Live! ✅');
  } else if (req.method === 'POST') {
    console.log('Payment received:', req.body);
    res.status(200).json({ ok: true });
  } else {
    res.status(405).send('Method not allowed');
  }
}