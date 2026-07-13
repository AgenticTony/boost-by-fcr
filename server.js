import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/send-verification-email', async (req, res) => {
  const { to, name, verificationUrl } = req.body;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('❌ Missing RESEND_API_KEY');
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject: 'Verifiera din e-post',
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Välkommen!</h2>
            <p>Hej ${name},</p>
            <p>Klicka <a href="${verificationUrl}">här</a> för att verifiera din e-post.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('❌ Resend error:', data);
      return res.status(response.status).json({ error: data });
    }
    console.log(`✅ Email sent to ${to}`);
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Server error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`📧 Email server running on http://localhost:${port}`);
});