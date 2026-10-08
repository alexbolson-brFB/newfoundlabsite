import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';

const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGES_COUNT = 15;
const MAX_PROMPT_CHARS = 800;

// Rate limiting and abuse prevention (in-memory per runtime instance)
interface RateLimitBucket {
  timestamps: number[];
  lastPromptHash?: string;
  lastPromptTime?: number;
}

const rateLimitMap = new Map<string, RateLimitBucket>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const MAX_REQUESTS_PER_WINDOW = 12; // max 12 requests / minute / client
const MIN_INTERVAL_SAME_PROMPT_MS = 2000; // debounce duplicate submissions

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return (req.headers['x-real-ip'] as string) || req.socket?.remoteAddress || '127.0.0.1';
}

function checkRateLimitAndAbuse(
  ip: string,
  promptText: string
): { allowed: boolean; status: number; message: string; retryAfter?: number } {
  const now = Date.now();
  const bucket = rateLimitMap.get(ip) || { timestamps: [] };

  // Evict timestamps older than sliding window
  bucket.timestamps = bucket.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = bucket.timestamps[0];
    const retryAfter = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    return {
      allowed: false,
      status: 429,
      message: 'Rate limit exceeded. Please wait a moment before sending another simulation prompt.',
      retryAfter,
    };
  }

  // Duplicate prompt spam protection
  const promptHash = crypto.createHash('md5').update(promptText).digest('hex');
  if (
    bucket.lastPromptHash === promptHash &&
    bucket.lastPromptTime &&
    now - bucket.lastPromptTime < MIN_INTERVAL_SAME_PROMPT_MS
  ) {
    return {
      allowed: false,
      status: 429,
      message: 'Duplicate request throttled. Please avoid submitting the same prompt repeatedly.',
      retryAfter: 2,
    };
  }

  bucket.timestamps.push(now);
  bucket.lastPromptHash = promptHash;
  bucket.lastPromptTime = now;
  rateLimitMap.set(ip, bucket);

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.timestamps.every((ts) => now - ts > RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { allowed: true, status: 200, message: 'OK' };
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface ChatRequestPayload {
  messages: ChatMessage[];
  locale?: 'en' | 'pt';
}

function json(res: VercelResponse, status: number, body: Record<string, unknown>) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

function evaluateRexGuardSimulationPolicy(lastPrompt: string, locale: 'en' | 'pt'): {
  status: 'SIMULATED_ALLOW' | 'SIMULATED_DENY' | 'POLICY_INQUIRY';
  policy: string;
  scope: string;
  action: string;
  reason: string;
} {
  const lower = lastPrompt.toLowerCase();

  // Test cases for unauthorized or high-risk actions (Simulation: Fail-Closed)
  if (
    lower.includes('sem autoriza') ||
    lower.includes('unauthorized') ||
    lower.includes('ignorar') ||
    lower.includes('bypass') ||
    lower.includes('hack') ||
    lower.includes('delete') ||
    lower.includes('deletar') ||
    lower.includes('excluir') ||
    lower.includes('desabilitar') ||
    lower.includes('disable firewall') ||
    lower.includes('2.000.000') ||
    lower.includes('2,000,000') ||
    lower.includes('milh') ||
    lower.includes('million')
  ) {
    return {
      status: 'SIMULATED_DENY',
      policy: 'security-boundary/strict-fail-closed',
      scope: 'unauthorized.high_risk_mutation',
      action: 'SIMULATED_FAIL_CLOSED',
      reason:
        locale === 'pt'
          ? 'Simulação de política: Ação de alto risco interceptada. Em ausência de autorização institucional comprovada em tempo de execução, a política determinística aciona fail-closed.'
          : 'Policy simulation: High-impact mutation intercepted. In the absence of proven institutional authority at execution time, deterministic policy triggers fail-closed.',
    };
  }

  // Permissible operational actions (Simulation: Policy Match)
  if (
    lower.includes('pagamento') ||
    lower.includes('payment') ||
    lower.includes('transfer') ||
    lower.includes('transferir') ||
    lower.includes('5.000') ||
    lower.includes('5,000') ||
    lower.includes('fatura') ||
    lower.includes('invoice')
  ) {
    return {
      status: 'SIMULATED_ALLOW',
      policy: 'payment-release/dual-custody-v2',
      scope: 'finance.payment_release',
      action: 'SIMULATED_POLICY_MATCH',
      reason:
        locale === 'pt'
          ? 'Simulação de política: Proposta avaliada como compatível com os critérios de teste. Em produção, a execução real exigiria custódia dupla e credencial institucional no momento do disparo.'
          : 'Policy simulation: Proposal satisfies test policy criteria. In production, real execution requires dual-custody and institutional credentials at execution time.',
    };
  }

  // Conceptual inquiry / architectural question
  return {
    status: 'POLICY_INQUIRY',
    policy: 'runtime-authority/inquiry-eval',
    scope: 'system.architecture_inspect',
    action: 'INQUIRY_EVALUATED',
    reason:
      locale === 'pt'
        ? 'Simulação de política: Consulta analisada contra o princípio "Authority at execution time" (o modelo propõe, a autoridade reside na organização).'
        : 'Policy simulation: Inquiry evaluated against the "Authority at execution time" principle (models propose intent, authority remains institutional).',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed. Only POST is supported.' });
  }

  // Validate payload format & parse safely
  let body: unknown;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return json(res, 400, { error: 'Malformed JSON payload.' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json(res, 400, { error: 'Invalid payload structure. Expected an object.' });
  }

  const rawPayload = body as Record<string, unknown>;

  // Validate messages array
  if (!Array.isArray(rawPayload.messages)) {
    return json(res, 400, { error: 'Invalid payload: "messages" must be an array.' });
  }

  if (rawPayload.messages.length === 0) {
    return json(res, 400, { error: 'Invalid payload: "messages" cannot be empty.' });
  }

  if (rawPayload.messages.length > MAX_MESSAGES_COUNT) {
    return json(res, 400, {
      error: `Payload exceeds maximum allowed conversation length (${MAX_MESSAGES_COUNT} messages).`,
    });
  }

  // Validate each message
  const validatedMessages: ChatMessage[] = [];
  for (let i = 0; i < rawPayload.messages.length; i++) {
    const item = rawPayload.messages[i];
    if (!item || typeof item !== 'object') {
      return json(res, 400, { error: `Invalid message at index ${i}: must be an object.` });
    }
    const { role, text } = item as Record<string, unknown>;
    if (role !== 'user' && role !== 'model') {
      return json(res, 400, {
        error: `Invalid message at index ${i}: role must be either "user" or "model".`,
      });
    }
    if (typeof text !== 'string') {
      return json(res, 400, {
        error: `Invalid message at index ${i}: text must be a string.`,
      });
    }
    const trimmed = text.trim();
    if (!trimmed) {
      return json(res, 400, {
        error: `Invalid message at index ${i}: message text cannot be empty.`,
      });
    }
    if (trimmed.length > MAX_PROMPT_CHARS) {
      return json(res, 400, {
        error: `Message at index ${i} exceeds maximum length of ${MAX_PROMPT_CHARS} characters.`,
      });
    }
    validatedMessages.push({ role, text: trimmed });
  }

  const lastUserMessage = [...validatedMessages].reverse().find((m) => m.role === 'user');
  if (!lastUserMessage) {
    return json(res, 400, { error: 'Conversation must contain at least one message from "user".' });
  }

  // Validate locale
  let locale: 'en' | 'pt' = 'en';
  if (typeof rawPayload.locale === 'string') {
    if (rawPayload.locale === 'pt' || rawPayload.locale === 'en') {
      locale = rawPayload.locale;
    } else {
      return json(res, 400, { error: 'Invalid locale. Supported values are "en" and "pt".' });
    }
  } else {
    locale = lastUserMessage.text.match(/[áéíóúãõç]/i) ? 'pt' : 'en';
  }

  // Rate Limiting & Abuse Check
  const clientIp = getClientIp(req);
  const rateLimitResult = checkRateLimitAndAbuse(clientIp, lastUserMessage.text);
  if (!rateLimitResult.allowed) {
    if (rateLimitResult.retryAfter) {
      res.setHeader('Retry-After', String(rateLimitResult.retryAfter));
    }
    return json(res, rateLimitResult.status, {
      error: rateLimitResult.message,
      retryAfter: rateLimitResult.retryAfter,
    });
  }

  // Evaluate REX Guard simulation policy outcome
  const policyOutcome = evaluateRexGuardSimulationPolicy(lastUserMessage.text, locale);
  const timestamp = new Date().toISOString();
  const simulatedDecisionId = `ati-sim-${crypto.randomBytes(3).toString('hex')}-${Date.now().toString(36)}`;

  const rawApiKey = (process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim();
  const isValidApiKey = Boolean(
    rawApiKey &&
    rawApiKey.startsWith('AIza') &&
    rawApiKey.length > 25 &&
    !rawApiKey.includes('your_') &&
    !rawApiKey.includes('placeholder')
  );

  if (isValidApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: rawApiKey });

      const systemInstruction =
        locale === 'pt'
          ? `Você é o Agente de Demonstração Interativa do REX Guard, desenvolvido pela FoundLab (Auditable Trust Infrastructure).
Esta é estritamente uma demonstração interativa de simulação de políticas na web.

Princípios inegociáveis:
1. Narrativa central: "Authority at execution time" (Autoridade em tempo de execução). Modelos probabilísticos propõem intenções; a autoridade institucional é determinística e aplicada exclusivamente na fronteira de execução pelo REX Guard.
2. Distinção explícita de simulação:
   - Deixe claro que esta resposta demonstra como uma política avalia a intenção em simulação.
   - NUNCA afirme que pagamentos reais, transferências ou mutações bancárias foram efetuados em sistemas de produção.
   - NUNCA mencione assinaturas criptográficas fabricadas ou recibos de hardware reais nesta simulação.
   - Não faça alegações quantitativas sem evidência auditável (não use percentuais ou métricas inventadas).
3. Responda em português conciso, técnico e direto (2 a 3 frases).
4. O resultado da simulação determinística para esta mensagem é: ${policyOutcome.status} (${policyOutcome.action}). Política avaliada: ${policyOutcome.policy}. Justificativa: ${policyOutcome.reason}.`
          : `You are the FoundLab REX Guard Live Interactive Demo Agent.
FoundLab provides Auditable Trust Infrastructure (ATI) for enterprise AI agents.
This is strictly an interactive policy simulation demo on the web.

Non-negotiable principles:
1. Core narrative: "Authority at execution time". Probabilistic models propose intent; institutional authority is deterministic and enforced strictly at the execution boundary by REX Guard.
2. Explicit simulation distinction:
   - Clearly convey that this interaction demonstrates simulated policy evaluation.
   - NEVER claim that real payments, bank transfers, or production mutations were executed.
   - NEVER reference fabricated cryptographic signatures or live hardware receipts in this simulation.
   - Do NOT make quantitative claims without auditable evidence (no invented percentages or latency metrics).
3. Reply concisely, professionally, and directly in English (2 to 3 sentences).
4. The deterministic simulation outcome for this prompt is: ${policyOutcome.status} (${policyOutcome.action}). Policy evaluated: ${policyOutcome.policy}. Reason: ${policyOutcome.reason}.`;

      const contents = validatedMessages.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      // Model update: Gemini 3.8 Flash
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.5,
        },
      });

      const replyText =
        response.text ||
        (locale === 'pt'
          ? `[Simulação REX Guard] Intenção analisada contra a política ${policyOutcome.policy}. Resultado da simulação: ${policyOutcome.status}.`
          : `[REX Guard Simulation] Intent evaluated against policy ${policyOutcome.policy}. Simulation outcome: ${policyOutcome.status}.`);

      return json(res, 200, {
        text: replyText,
        decisionId: simulatedDecisionId,
        policy: policyOutcome.policy,
        status: policyOutcome.status,
        action: policyOutcome.action,
        reason: policyOutcome.reason,
        timestamp,
        isSimulation: true,
        mode: 'policy_simulation',
        notice:
          locale === 'pt'
            ? 'Demonstração de simulação de políticas em tempo de execução. Nenhuma transação bancária ou mutação em sistemas reais é executada nesta interface.'
            : 'Runtime policy simulation demonstration. No real banking transaction or production mutation is executed in this interface.',
      });
    } catch (err: unknown) {
      console.warn('Gemini 3.8 Flash live call error, using deterministic policy simulation fallback:', (err as Error)?.message);
    }
  }

  // Deterministic policy simulation fallback (when no API key is set or in dev offline)
  const fallbackText =
    locale === 'pt'
      ? policyOutcome.status === 'SIMULATED_DENY'
        ? `[SIMULAÇÃO: FAIL-CLOSED] A intenção proposta foi interceptada na fronteira de execução. A política de demonstração '${policyOutcome.policy}' identifica ausência de autorização institucional comprovada em tempo de execução, acionando fail-closed determinístico. Nenhum sistema downstream foi acionado.`
        : policyOutcome.status === 'SIMULATED_ALLOW'
        ? `[SIMULAÇÃO: POLÍTICA COMPATÍVEL] A intenção de pagamento enquadra-se nos parâmetros da política de demonstração '${policyOutcome.policy}'. Em ambiente corporativo real, a execução efetiva dependeria de custódia institucional e atestação criptográfica em runtime.`
        : `[SIMULAÇÃO: CONSULTA DE POLÍTICA] Consulta avaliada pela fronteira do REX Guard. A arquitetura assegura que modelos de IA proponham intenções, enquanto a autoridade de execução e as regras de controle permanecem sob governança determinística da organização.`
      : policyOutcome.status === 'SIMULATED_DENY'
      ? `[SIMULATION: FAIL-CLOSED] The proposed action intent was intercepted at the execution boundary. Demo policy '${policyOutcome.policy}' identified missing institutional authority at execution time and triggered deterministic fail-closed protection. No downstream system was reached.`
      : policyOutcome.status === 'SIMULATED_ALLOW'
      ? `[SIMULATION: POLICY MATCH] The payment proposal satisfies demo policy '${policyOutcome.policy}' criteria. In a production enterprise deployment, actual execution requires institutional custody and cryptographic attestation at runtime.`
      : `[SIMULATION: POLICY INQUIRY] Inquiry evaluated through the REX Guard boundary. The architecture ensures AI models propose intent while execution authority and policies remain deterministically under institutional governance.`;

  return json(res, 200, {
    text: fallbackText,
    decisionId: simulatedDecisionId,
    policy: policyOutcome.policy,
    status: policyOutcome.status,
    action: policyOutcome.action,
    reason: policyOutcome.reason,
    timestamp,
    isSimulation: true,
    mode: 'policy_simulation',
    notice:
      locale === 'pt'
        ? 'Demonstração de simulação de políticas em tempo de execução. Nenhuma transação bancária ou mutação em sistemas reais é executada nesta interface.'
        : 'Runtime policy simulation demonstration. No real banking transaction or production mutation is executed in this interface.',
  });
}

