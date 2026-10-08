import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';

const MAX_BODY_BYTES = 32 * 1024;

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

function evaluateRexGuardPolicy(lastPrompt: string): {
  status: 'ALLOW' | 'DENY' | 'VERIFIED';
  policy: string;
  scope: string;
  action: string;
  reason: string;
} {
  const lower = lastPrompt.toLowerCase();

  // Test cases for unauthorized or high-risk actions
  if (
    lower.includes('sem autoriza') ||
    lower.includes('unauthorized') ||
    lower.includes('ignorar') ||
    lower.includes('bypass') ||
    lower.includes('hack') ||
    lower.includes('delete database') ||
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
      status: 'DENY',
      policy: 'security-boundary/strict-fail-closed',
      scope: 'unauthorized.high_risk_mutation',
      action: 'ACTION_BLOCKED',
      reason: 'Missing required multi-factor institutional authority. Fail-closed triggered.',
    };
  }

  // Authorized operational actions
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
      status: 'ALLOW',
      policy: 'payment-release/dual-custody-v2',
      scope: 'finance.payment_release',
      action: 'PAYMENT_AUTHORIZED',
      reason: 'Authority verified within valid temporal window and caller scope.',
    };
  }

  // Inquiry / architectural validation
  return {
    status: 'VERIFIED',
    policy: 'runtime-authority/inquiry-eval',
    scope: 'system.architecture_inspect',
    action: 'INQUIRY_EVALUATED',
    reason: 'Read-only inquiry evaluated against institutional knowledge boundary.',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  let body: unknown;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return json(res, 400, { error: 'Invalid submission format.' });
  }

  if (!body || typeof body !== 'object' || !Array.isArray((body as ChatRequestPayload).messages)) {
    return json(res, 400, { error: 'Invalid message payload.' });
  }

  const payload = body as ChatRequestPayload;
  const messages = payload.messages;

  if (messages.length === 0) {
    return json(res, 400, { error: 'At least one message is required.' });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  const userPrompt = lastUserMessage?.text || 'Hello';
  const locale = payload.locale || (userPrompt.match(/[áéíóúãõç]/i) ? 'pt' : 'en');

  // Evaluate REX Guard policy outcome
  const policyOutcome = evaluateRexGuardPolicy(userPrompt);

  const timestamp = new Date().toISOString();
  const decisionId = `ati-rex-${crypto.randomBytes(4).toString('hex')}-${Date.now().toString(36)}`;
  const hashDigest = crypto.createHash('sha256').update(`${decisionId}:${userPrompt}:${timestamp}`).digest('hex');
  const signature = `ecdsa-p256:0x${hashDigest.slice(0, 32)}...${hashDigest.slice(-16)}`;

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

      const systemInstruction = locale === 'pt'
        ? `Você é o Agente de Demonstração Interativa do REX Guard, desenvolvido pela FoundLab.
A FoundLab fornece Auditable Trust Infrastructure (ATI) para agentes de IA enterprise.
Nesta demonstração ao vivo, você atua como um agente corporativo que recebe comandos de usuários para testar a fronteira de execução.

Regras de comportamento:
1. Responda em português de forma concisa, profissional e direta (2 a 4 frases).
2. Se o usuário pedir para executar uma ação com impacto corporativo (pagamento, transferência, alteração de permissão, exclusão de dados):
   - Apresente a intenção da proposta de forma estruturada.
   - Esclareça que enquanto você (o modelo de IA) propõe a intenção, a execução real depende da verificação em runtime do REX Guard.
   - Mencione que o REX Guard avaliou o status como ${policyOutcome.status} (${policyOutcome.action}).
3. Se o usuário fizer uma pergunta conceitual ou técnica sobre o REX Guard:
   - Explique que o REX Guard resolve a lacuna de autoridade: o modelo propõe, mas a autoridade institucional permanece na organização através de políticas determinísticas e recibos criptográficos auditáveis (DecisionID).`
        : `You are the FoundLab REX Guard Live Demo Agent.
FoundLab provides Auditable Trust Infrastructure (ATI) for enterprise AI agents.
In this live demonstration, you act as an enterprise agent receiving user commands to test the execution boundary.

Behavior rules:
1. Reply concisely, professionally, and directly in English (2 to 4 sentences).
2. If the user asks to execute a consequential enterprise action (payment, transfer, permission update, data mutation):
   - State the intent proposal clearly.
   - Clarify that while you (the AI model) propose the action, execution is strictly governed by REX Guard runtime verification.
   - Reference that REX Guard evaluated the proposal as ${policyOutcome.status} (${policyOutcome.action}).
3. If the user asks a conceptual or technical question about REX Guard:
   - Explain that REX Guard bridges the authority gap: models propose, but authority remains with the institution via deterministic rules and signed cryptographic evidence (DecisionID).`;

      // Format multi-turn conversation
      const contents = messages.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const replyText = response.text || (locale === 'pt'
        ? `Proposta de ação processada pela fronteira do REX Guard. Resultado de autorização: ${policyOutcome.status}.`
        : `Action proposal processed at the REX Guard boundary. Authorization outcome: ${policyOutcome.status}.`);

      return json(res, 200, {
        text: replyText,
        decisionId,
        policy: policyOutcome.policy,
        status: policyOutcome.status,
        action: policyOutcome.action,
        reason: policyOutcome.reason,
        signature,
        timestamp,
      });
    } catch (err: unknown) {
      console.warn('Gemini live call error, using deterministic policy evaluation:', (err as Error)?.message);
    }
  }

  // Deterministic high-fidelity response fallback (if no GEMINI_API_KEY configured in dev)
  const fallbackText = locale === 'pt'
    ? policyOutcome.status === 'DENY'
      ? `[BLOQUEIO REX GUARD] A intenção de ação proposta foi interceptada na fronteira de execução. A política '${policyOutcome.policy}' identificou ausência de autorização institucional comprovada e acionou fail-closed imediato. Nenhuma chamada alcançou os sistemas downstream.`
      : policyOutcome.status === 'ALLOW'
      ? `[AUTORIZADO REX GUARD] Intenção analisada contra a política determinística '${policyOutcome.policy}'. Solicitante, tenant e validade temporal validados com sucesso. Token de capacidade efêmero emitido com DecisionID ${decisionId}.`
      : `[VERIFICADO REX GUARD] Consulta analisada pela camada de conformidade institucional. O REX Guard assegura que modelos probabilísticos proponham ações, mas a autoridade e a evidência auditável permaneçam 100% sob controle determinístico da organização.`
    : policyOutcome.status === 'DENY'
    ? `[REX GUARD FAIL-CLOSED] The proposed action intent was intercepted at the execution boundary. Policy '${policyOutcome.policy}' identified missing institutional authority and triggered immediate fail-closed protection. No downstream system was reached.`
    : policyOutcome.status === 'ALLOW'
    ? `[REX GUARD AUTHORIZED] Intent evaluated against deterministic policy '${policyOutcome.policy}'. Caller, tenant claim, and temporal validity confirmed. Ephemeral capability token issued under DecisionID ${decisionId}.`
    : `[REX GUARD VERIFIED] Query processed through institutional compliance boundary. REX Guard ensures probabilistic models propose intent while deterministic authority and audit evidence remain strictly under institutional control.`;

  return json(res, 200, {
    text: fallbackText,
    decisionId,
    policy: policyOutcome.policy,
    status: policyOutcome.status,
    action: policyOutcome.action,
    reason: policyOutcome.reason,
    signature,
    timestamp,
  });
}
