export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).send('SaveBucks Verify API is Live! ✅');
  }

  if (req.method === 'POST') {
    try {
      const { license_key } = req.body;

      if (!license_key) {
        return res.status(400).json({ valid: false });
      }

      console.log('Checking license:', license_key);

      // Testing ke liye - 5 se jyada letters ki key valid hai
      if (license_key.length > 5) {
        return res.status(200).json({ 
          valid: true, 
          plan: 'pro'
        });
      } else {
        return res.status(200).json({ valid: false });
      }

    } catch (error) {
      return res.status(500).json({ valid: false });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}