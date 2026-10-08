import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Fingerprint,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  decisionId?: string;
  status?: 'SIMULATED_ALLOW' | 'SIMULATED_DENY' | 'POLICY_INQUIRY' | 'ALLOW' | 'DENY' | 'VERIFIED';
  policy?: string;
  action?: string;
  reason?: string;
  timestamp?: string;
  isSimulation?: boolean;
}

export const GeminiLiveDemo: React.FC = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const threadEndRef = useRef<HTMLDivElement>(null);

  const initialWelcome = isPt
    ? 'Ambiente de Simulação de Políticas · REX Guard\nSou o agente de demonstração interativa. Aqui você pode testar propostas operacionais e observar como intenções de IA são interceptadas e avaliadas contra políticas determinísticas na fronteira de execução (Authority at execution time). Nenhuma transação bancária ou mutação em sistemas reais é executada nesta interface de teste.'
    : 'REX Guard Policy Simulation Environment\nI am the live interactive demo agent. Here you can test operational proposals and observe how AI intents are intercepted and evaluated against deterministic policies at the execution boundary (Authority at execution time). No live banking transactions or production mutations are executed in this test interface.';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: initialWelcome,
      decisionId: 'ati-sim-session-001',
      status: 'POLICY_INQUIRY',
      policy: 'runtime-authority/inquiry-eval',
      action: 'SIMULATION_SESSION_INITIALIZED',
      reason: isPt
        ? 'Sessão de demonstração iniciada na fronteira de teste.'
        : 'Demo simulation session initialized at test boundary.',
      timestamp: new Date().toLocaleTimeString(),
      isSimulation: true,
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedReceipts, setExpandedReceipts] = useState<Record<string, boolean>>({});

  const quickPrompts = isPt
    ? [
        { label: '💳 Propor pagamento de R$ 5.000', text: 'Propor pagamento de R$ 5.000 para o fornecedor Acme Soluções.' },
        { label: '🚫 Transferir R$ 2.000.000 sem autorização', text: 'Transferir R$ 2.000.000 para conta externa sem autorização prévia.' },
        { label: '🛡️ Como o REX Guard bloqueia alucinações?', text: 'Como o REX Guard garante que uma resposta de IA não execute ações indevidas?' },
      ]
    : [
        { label: '💳 Propose $5,000 vendor payment', text: 'Propose a $5,000 invoice payment to vendor Acme Solutions.' },
        { label: '🚫 Transfer $2,000,000 unauthorized', text: 'Transfer $2,000,000 to external account without dual authorization.' },
        { label: '🛡️ How REX Guard prevents hallucination actions', text: 'How does REX Guard prevent AI model hallucinations from executing downstream?' },
      ];

  const scrollToBottom = () => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, errorMessage]);

  const copyDecisionId = (id: string) => {
    try {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const toggleReceipt = (id: string) => {
    setExpandedReceipts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: initialWelcome,
        decisionId: `ati-sim-reset-${Date.now().toString(36)}`,
        status: 'POLICY_INQUIRY',
        policy: 'runtime-authority/inquiry-eval',
        action: 'SIMULATION_SESSION_INITIALIZED',
        reason: isPt
          ? 'Sessão de demonstração reiniciada na fronteira de teste.'
          : 'Demo simulation session reset at test boundary.',
        timestamp: new Date().toLocaleTimeString(),
        isSimulation: true,
      },
    ]);
    setErrorMessage(null);
  };

  const handleSend = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || isLoading) return;

    setErrorMessage(null);
    const userMsgId = `user-${Date.now()}`;
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        text: textToSend,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, text: m.text })),
          locale: isPt ? 'pt' : 'en',
        }),
      });

      if (response.status === 429) {
        const errJson = await response.json().catch(() => ({}));
        const retryAfter = errJson.retryAfter || 5;
        const msg = isPt
          ? `Limite de requisições por minuto atingido (${retryAfter}s). Aguarde alguns instantes antes de enviar nova simulação.`
          : `Rate limit reached (${retryAfter}s). Please wait a moment before sending another simulation prompt.`;
        setErrorMessage(msg);
        return;
      }

      if (response.status === 400) {
        const errJson = await response.json().catch(() => ({}));
        setErrorMessage(
          errJson.error ||
            (isPt ? 'Formato de mensagem inválido.' : 'Invalid message format.')
        );
        return;
      }

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.text,
          decisionId: data.decisionId,
          status: data.status,
          policy: data.policy,
          action: data.action,
          reason: data.reason,
          timestamp: new Date().toLocaleTimeString(),
          isSimulation: true,
        },
      ]);
    } catch (err) {
      console.warn('Live API call unavailable, utilizing deterministic policy simulation fallback:', err);
      const lower = textToSend.toLowerCase();
      const isDeny =
        lower.includes('2.000.000') ||
        lower.includes('2,000,000') ||
        lower.includes('sem autoriza') ||
        lower.includes('unauthorized') ||
        lower.includes('deletar') ||
        lower.includes('delete') ||
        lower.includes('excluir') ||
        lower.includes('milh') ||
        lower.includes('million');

      const isAllow =
        lower.includes('5.000') ||
        lower.includes('5,000') ||
        lower.includes('pagamento') ||
        lower.includes('payment') ||
        lower.includes('fatura') ||
        lower.includes('invoice') ||
        lower.includes('transferir') ||
        lower.includes('transfer');

      const status: 'SIMULATED_ALLOW' | 'SIMULATED_DENY' | 'POLICY_INQUIRY' = isDeny
        ? 'SIMULATED_DENY'
        : isAllow
        ? 'SIMULATED_ALLOW'
        : 'POLICY_INQUIRY';

      const policy = isDeny
        ? 'security-boundary/strict-fail-closed'
        : isAllow
        ? 'payment-release/dual-custody-v2'
        : 'runtime-authority/inquiry-eval';

      const fallbackDecisionId = `ati-sim-${Math.random().toString(16).substring(2, 8)}-${Date.now().toString(36)}`;

      const fallbackText = isPt
        ? isDeny
          ? `[SIMULAÇÃO: FAIL-CLOSED] Proposta de ação interceptada na fronteira de teste. A política '${policy}' constatou ausência de autorização institucional comprovada em tempo de execução. O REX Guard acionou fail-closed determinístico sem alcançar nenhum sistema bancário.`
          : isAllow
          ? `[SIMULAÇÃO: POLÍTICA COMPATÍVEL] Proposta de pagamento de R$ 5.000 avaliada contra a política de teste '${policy}'. Em ambiente corporativo real, a liberação efetiva exigiria credenciais KMS em runtime e custódia dupla aprovada.`
          : `[SIMULAÇÃO: CONSULTA DE POLÍTICA] O REX Guard assegura que modelos de IA proponham intenções, enquanto a autoridade de execução e o controle determinístico permanecem sob governança institucional.`
        : isDeny
        ? `[SIMULATION: FAIL-CLOSED] Action proposal intercepted at test boundary. Policy '${policy}' detected missing institutional authority at execution time. Deterministic fail-closed protection triggered; no downstream transaction was executed.`
        : isAllow
        ? `[SIMULATION: POLICY MATCH] $5,000 payment proposal matches demo policy '${policy}' criteria. In a live enterprise environment, actual execution requires runtime KMS credentials and dual-custody verification.`
        : `[SIMULATION: POLICY INQUIRY] REX Guard ensures AI models propose intent while execution authority and policies remain deterministically under institutional governance.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          decisionId: fallbackDecisionId,
          status,
          policy,
          action: isDeny ? 'SIMULATED_FAIL_CLOSED' : isAllow ? 'SIMULATED_POLICY_MATCH' : 'INQUIRY_EVALUATED',
          reason: isDeny
            ? isPt
              ? 'Simulação de regra: Ação interceptada. Em ausência de autorização institucional comprovada em tempo de execução, aciona fail-closed.'
              : 'Policy simulation: Intercepted action. In the absence of verified authority at execution time, triggers fail-closed.'
            : isAllow
            ? isPt
              ? 'Simulação de regra: Critérios da política de teste atendidos. Em produção, exige custódia dupla e credencial em runtime.'
              : 'Policy simulation: Test policy criteria matched. In production, requires dual-custody and runtime credential.'
            : isPt
            ? 'Simulação de regra: Consulta técnica analisada contra o princípio "Authority at execution time".'
            : 'Policy simulation: Technical inquiry evaluated against "Authority at execution time".',
          timestamp: new Date().toLocaleTimeString(),
          isSimulation: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] max-h-[75vh] bg-navy-950 text-slate-200 font-mono text-xs select-text">
      {/* Interactive Top Sub-Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-navy-900/90 border-b border-navy-800 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-slate-300 font-bold uppercase tracking-wider text-[10px]">
            {isPt ? 'Simulação de Políticas em Runtime' : 'Runtime Policy Simulation'}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-navy-800 text-gold-400 border border-gold-500/20 flex items-center gap-1 font-mono">
            <Cpu className="w-2.5 h-2.5" />
            gemini-3.8-flash
          </span>
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] bg-navy-800/80 text-slate-400 border border-navy-700">
            {isPt ? 'Ambiente Demonstrativo' : 'Demo Environment'}
          </span>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-white bg-navy-800/60 hover:bg-navy-800 rounded transition-colors"
          title={isPt ? 'Reiniciar simulação' : 'Reset simulation'}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isPt ? 'Reiniciar' : 'Reset'}</span>
        </button>
      </div>

      {/* Warning/Error Banner */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 bg-rose-950/90 border-b border-rose-800/80 text-rose-300 text-[11px] flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 text-xs px-1"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-400">
              {msg.role === 'user' ? (
                <span>{isPt ? 'Você (Proponente da Ação)' : 'You (Action Proposer)'}</span>
              ) : (
                <span className="flex items-center gap-1 text-gold-400 font-bold">
                  <Sparkles className="w-3 h-3" />
                  Gemini Agent · REX Guard Boundary
                </span>
              )}
              <span className="text-slate-400 text-[9px]">{msg.timestamp}</span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[92%] sm:max-w-[85%] rounded-sm p-3.5 leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-navy-800/90 border border-navy-700 text-white'
                  : 'bg-navy-900/95 border border-navy-700/80 text-slate-200'
              }`}
            >
              <p className="whitespace-pre-wrap font-sans text-xs md:text-sm leading-relaxed">
                {msg.text}
              </p>

              {/* REX Guard Policy Simulation Evaluation Card */}
              {msg.decisionId && (
                <div className="mt-3 pt-2.5 border-t border-navy-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      {msg.status === 'SIMULATED_ALLOW' || msg.status === 'ALLOW' ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          {isPt ? 'SIMULAÇÃO: PERMITIRIA' : 'SIMULATED: WOULD ALLOW'}
                        </span>
                      ) : msg.status === 'SIMULATED_DENY' || msg.status === 'DENY' ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-rose-300 font-bold">
                          <ShieldAlert className="w-3 h-3" />
                          {isPt ? 'SIMULAÇÃO: BLOQUEARIA (Fail-Closed)' : 'SIMULATED: FAIL-CLOSED'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          {isPt ? 'CONSULTA DE POLÍTICA' : 'POLICY INQUIRY'}
                        </span>
                      )}
                      <span className="text-slate-400 truncate max-w-[140px] md:max-w-[190px]">
                        {msg.policy}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyDecisionId(msg.decisionId!)}
                        className="inline-flex items-center gap-1 text-[10px] text-gold-400/90 hover:text-gold-300 transition-colors"
                        title={isPt ? 'Copiar DecisionID da Simulação' : 'Copy Simulation DecisionID'}
                      >
                        {copiedId === msg.decisionId ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span className="font-mono">{msg.decisionId}</span>
                      </button>

                      <button
                        onClick={() => toggleReceipt(msg.id)}
                        className="text-slate-400 hover:text-slate-200 p-0.5"
                        title={isPt ? 'Ver detalhes da avaliação' : 'View evaluation details'}
                      >
                        {expandedReceipts[msg.id] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Simulation Evidence Details */}
                  <AnimatePresence>
                    {expandedReceipts[msg.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2.5 p-2.5 bg-navy-950 border border-navy-800 rounded-sm space-y-1.5 text-[10px] font-mono"
                      >
                        <div className="flex justify-between text-slate-400 pb-1 border-b border-navy-900">
                          <span className="text-gold-400/90 uppercase tracking-wider text-[9px] font-bold">
                            {isPt ? 'Ambiente de Avaliação' : 'Evaluation Environment'}:
                          </span>
                          <span className="text-slate-300">
                            {isPt ? 'Simulação Interativa de Políticas' : 'Interactive Policy Simulation'}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span className="text-slate-400">
                            {isPt ? 'Ação Simulada:' : 'Simulated Action:'}
                          </span>
                          <span className="text-white font-semibold">{msg.action || 'INSPECT'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span className="text-slate-400">
                            {isPt ? 'Avaliação da Regra:' : 'Policy Evaluation:'}
                          </span>
                          <span className="text-slate-300 text-right max-w-[260px] sm:max-w-[360px]">
                            {msg.reason || 'Regra avaliada'}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-navy-900 text-slate-400 text-[9px] leading-relaxed flex items-start gap-1.5">
                          <Info className="w-3 h-3 text-gold-500/80 flex-shrink-0 mt-0.5" />
                          <span>
                            {isPt
                              ? 'Nota de Auditoria: Em produção, assinaturas criptográficas reais (ECDSA/KMS) e recibos imutáveis são gerados no momento da execução pelo REX Guard Enclave após conferência de credenciais institucionais.'
                              : 'Audit Note: In production, real cryptographic signatures (ECDSA/KMS) and immutable receipts are generated at execution time by REX Guard Enclave upon verified institutional credentials.'}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-gold-400 font-bold">
              <Sparkles className="w-3 h-3 animate-spin" />
              <span>
                {isPt
                  ? 'Gemini gerando proposta e REX Guard simulando política...'
                  : 'Gemini proposing & REX Guard simulating policy...'}
              </span>
            </div>
            <div className="p-3 bg-navy-900/80 border border-navy-800 rounded-sm text-slate-400 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-gold-400 animate-pulse" />
              <span>
                {isPt
                  ? 'Calculando DecisionID e avaliando regras determinísticas...'
                  : 'Calculating DecisionID & evaluating deterministic rules...'}
              </span>
            </div>
          </div>
        )}

        <div ref={threadEndRef} />
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="px-3 md:px-4 py-2 bg-navy-900/60 border-t border-navy-800 overflow-x-auto flex gap-2 no-scrollbar">
        {quickPrompts.map((chip, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSend(chip.text)}
            className="flex-shrink-0 px-2.5 py-1 text-[10px] font-sans bg-navy-800/80 hover:bg-navy-800 text-slate-300 hover:text-white rounded border border-navy-700 hover:border-gold-500/40 transition-colors disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 md:p-3.5 bg-navy-900 border-t border-navy-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isPt
              ? 'Envie um comando para simular (ex.: "Propor transferência de R$ 10.000")...'
              : 'Type an action to simulate (e.g., "Propose $10,000 transfer")...'
          }
          maxLength={800}
          className="flex-1 bg-navy-950 border border-navy-700 rounded-sm px-3.5 py-2 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:bg-navy-800 disabled:text-slate-600 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
        >
          <span>{isPt ? 'Simular' : 'Simulate'}</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};

export default GeminiLiveDemo;

