import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message, type } = req.body;

    // Validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    if (type === 'private-offer' && !email) {
      return res.status(400).json({ error: 'Email is required for private offers.' });
    }

    if (type === 'contact' && (!name || !message)) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }

    // Log the submission (visible in Vercel logs)
    console.log('--- NEW FORM SUBMISSION ---');
    console.log(`Type: ${type || 'contact'}`);
    console.log(`Name: ${name || 'N/A'}`);
    console.log(`Email: ${email}`);
    console.log(`Company: ${company || 'N/A'}`);
    console.log(`Message: ${message || 'Private Offer Request'}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('--- END SUBMISSION ---');

    // If RESEND_API_KEY is configured, send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'FoundLab Website <noreply@foundlab.com.br>',
            to: ['commercial@foundlab.com.br'],
            subject: type === 'private-offer'
              ? `[Private Offer] New request from ${email}`
              : `[Contact Form] Message from ${name}`,
            html: `
              <h2>${type === 'private-offer' ? 'Private Offer Request' : 'Contact Form Submission'}</h2>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Message:</strong> ${message || 'Private Offer Request'}</p>
              <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Submission received successfully.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
