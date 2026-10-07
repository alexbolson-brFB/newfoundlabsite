import type { VercelRequest, VercelResponse } from '@vercel/node';

const MAX_BODY_BYTES = 16 * 1024;
const limits = { name: 120, email: 254, company: 160, message: 5000, website: 200 } as const;

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  type: 'contact';
  website?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function json(res: VercelResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

function isEmail(value: string): boolean {
  return value.length >= 3 && value.length <= limits.email && !/[\r\n\s]/.test(value) && /^[^@]+@[^@]+\.[^@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  const contentType = req.headers['content-type'] || '';
  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return json(res, 415, { error: 'JSON content is required.' });
  }

  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? '');
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return json(res, 413, { error: 'Request is too large.' });
  }

  let body: unknown;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  if (!body || Array.isArray(body) || typeof body !== 'object') {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  const input = body as Record<string, unknown>;
  const allowedKeys = new Set(['name', 'email', 'company', 'message', 'type', 'website']);
  if (Object.keys(input).some((key) => !allowedKeys.has(key))) {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  if (![input.name, input.email, input.message, input.type].every((value) => typeof value === 'string') ||
      (input.company !== undefined && typeof input.company !== 'string') ||
      (input.website !== undefined && typeof input.website !== 'string')) {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  const payload: ContactPayload = {
    name: (input.name as string).trim(),
    email: (input.email as string).trim(),
    company: (input.company as string | undefined)?.trim() || undefined,
    message: (input.message as string).trim(),
    type: input.type as 'contact',
    website: (input.website as string | undefined)?.trim() || undefined,
  };

  if (payload.type !== 'contact' || !payload.name || payload.name.length > limits.name ||
      !isEmail(payload.email) || (payload.company?.length ?? 0) > limits.company ||
      !payload.message || payload.message.length > limits.message ||
      (payload.website?.length ?? 0) > limits.website) {
    return json(res, 400, { error: 'Invalid submission.' });
  }

  if (payload.website) {
    return json(res, 200, { success: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('contact_delivery_unavailable', { reason: 'missing_provider_configuration' });
    return json(res, 503, { error: 'Unable to deliver the message right now. Please try again later.' });
  }

  const receivedAt = new Date().toISOString();
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeCompany = escapeHtml(payload.company || 'N/A');
  const safeMessage = escapeHtml(payload.message).replace(/\r?\n/g, '<br>');
  const subjectName = payload.name.replace(/[\r\n\u0000-\u001f\u007f]/g, '').slice(0, limits.name);

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'FoundLab Website <noreply@foundlab.com.br>',
        to: ['commercial@foundlab.com.br'],
        subject: `[Contact Form] Message from ${subjectName}`,
        html: `<h2>FoundLab Website Contact</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Company:</strong> ${safeCompany}</p><p><strong>Message:</strong> ${safeMessage}</p><p><strong>Received at:</strong> ${receivedAt}</p>`,
        text: `FoundLab Website Contact\n\nName: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company || 'N/A'}\nMessage: ${payload.message}\nReceived at: ${receivedAt}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error('contact_delivery_failed', { provider: 'resend', status: resendResponse.status });
      return json(res, 502, { error: 'Unable to deliver the message right now. Please try again later.' });
    }
  } catch {
    console.error('contact_delivery_failed', { provider: 'resend', reason: 'request_error' });
    return json(res, 502, { error: 'Unable to deliver the message right now. Please try again later.' });
  }

  console.info('contact_submission', { type: 'contact', hasCompany: Boolean(payload.company), status: 'accepted' });
  return json(res, 200, { success: true });
}
