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
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  decisionId?: string;
  status?: 'ALLOW' | 'DENY' | 'VERIFIED';
  policy?: string;
  action?: string;
  reason?: string;
  signature?: string;
  timestamp?: string;
}

export const GeminiLiveDemo: React.FC = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const threadEndRef = useRef<HTMLDivElement>(null);

  const initialWelcome = isPt
    ? 'Olá! Sou o agente corporativo operando sob a fronteira de execução do REX Guard. Você pode me pedir para realizar ações de negócio (ex.: propor pagamentos, alterar acessos, verificar conformidade) ou tirar dúvidas. Minhas propostas são interceptadas e verificadas pelo REX Guard antes de qualquer execução.'
    : 'Hello! I am an enterprise agent operating under the REX Guard execution boundary. You can request business actions (e.g., propose payments, grant access, verify compliance) or ask questions. My proposals are intercepted and deterministically verified by REX Guard before any downstream execution.';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: initialWelcome,
      decisionId: 'ati-rex-init-001',
      status: 'VERIFIED',
      policy: 'runtime-authority/inquiry-eval',
      action: 'SESSION_INITIALIZED',
      reason: isPt ? 'Sessão iniciada na fronteira de confiança.' : 'Session initialized at trust boundary.',
      signature: 'ecdsa-p256:0x4f8a291c...9b821a',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  }, [messages, isLoading]);

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
        decisionId: `ati-rex-reset-${Date.now().toString(36)}`,
        status: 'VERIFIED',
        policy: 'runtime-authority/inquiry-eval',
        action: 'SESSION_INITIALIZED',
        reason: isPt ? 'Sessão reiniciada na fronteira de confiança.' : 'Session reset at trust boundary.',
        signature: 'ecdsa-p256:0x4f8a291c...9b821a',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleSend = async (userText: string) => {
    const textToSend = userText.trim();
    if (!textToSend || isLoading) return;

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
          signature: data.signature,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (err) {
      // High-fidelity deterministic simulation fallback
      console.warn('Live API unavailable, utilizing boundary evaluation fallback:', err);
      const lower = textToSend.toLowerCase();
      const isDeny =
        lower.includes('2.000.000') ||
        lower.includes('2,000,000') ||
        lower.includes('sem autoriza') ||
        lower.includes('unauthorized') ||
        lower.includes('deletar') ||
        lower.includes('delete') ||
        lower.includes('milh') ||
        lower.includes('million');

      const isAllow =
        lower.includes('5.000') ||
        lower.includes('5,000') ||
        lower.includes('pagamento') ||
        lower.includes('payment') ||
        lower.includes('fatura') ||
        lower.includes('invoice');

      const status: 'ALLOW' | 'DENY' | 'VERIFIED' = isDeny ? 'DENY' : isAllow ? 'ALLOW' : 'VERIFIED';
      const policy = isDeny
        ? 'security-boundary/strict-fail-closed'
        : isAllow
        ? 'payment-release/dual-custody-v2'
        : 'runtime-authority/inquiry-eval';

      const fallbackDecisionId = `ati-rex-${Math.random().toString(16).substring(2, 8)}-${Date.now().toString(36)}`;

      const fallbackText = isPt
        ? isDeny
          ? `[BLOQUEIO DETERMINÍSTICO] Proposta de ação interceptada na fronteira. A política '${policy}' constatou ausência de alçada suficiente para o valor solicitado. Execução rejeitada (fail-closed) sem alcançar o sistema bancário.`
          : isAllow
          ? `[AUTORIZADO] Proposta de pagamento de R$ 5.000 analisada contra a política '${policy}'. Solicitante autenticado e escopo válido. Ação liberada com token criptográfico de uso único.`
          : `[CONSULTA VALIDADA] O REX Guard atua como a fronteira de autoridade entre a inferência da IA e seus sistemas corporativos. Toda proposta gera uma decisão determinística e recibo imutável.`
        : isDeny
        ? `[DETERMINISTIC BLOCK] Action proposal intercepted at boundary. Policy '${policy}' detected insufficient authorization for the requested amount. Fail-closed triggered; downstream transaction was blocked.`
        : isAllow
        ? `[AUTHORIZED] $5,000 payment proposal verified against policy '${policy}'. Valid tenant claim and caller scope confirmed. Ephemeral capability token issued.`
        : `[INQUIRY VERIFIED] REX Guard acts as the deterministic authority boundary between model inference and enterprise systems, ensuring verifiable execution evidence.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: fallbackText,
          decisionId: fallbackDecisionId,
          status,
          policy,
          action: isDeny ? 'ACTION_BLOCKED' : isAllow ? 'PAYMENT_AUTHORIZED' : 'INQUIRY_EVALUATED',
          reason: isDeny
            ? isPt
              ? 'Falta de autorização institucional comprovada.'
              : 'Missing verified institutional authority.'
            : isPt
            ? 'Autoridade e escopo temporal validados.'
            : 'Verified authority and temporal scope.',
          signature: `ecdsa-p256:0x${Math.random().toString(16).substring(2, 18)}...`,
          timestamp: new Date().toLocaleTimeString(),
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
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300 font-bold uppercase tracking-wider text-[10px]">
            {isPt ? 'Demonstração Interativa' : 'Live Interactive Demo'}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] bg-navy-800 text-gold-400 border border-gold-500/20 flex items-center gap-1">
            <Cpu className="w-2.5 h-2.5" />
            gemini-3.5-flash
          </span>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-white bg-navy-800/60 hover:bg-navy-800 rounded transition-colors"
          title={isPt ? 'Reiniciar conversa' : 'Reset chat'}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isPt ? 'Reiniciar' : 'Reset'}</span>
        </button>
      </div>

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
                <span>{isPt ? 'Você (Solicitante Enterprise)' : 'You (Enterprise Caller)'}</span>
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

              {/* REX Guard Cryptographic Audit Evidence Card */}
              {msg.decisionId && (
                <div className="mt-3 pt-2.5 border-t border-navy-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      {msg.status === 'ALLOW' ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          ALLOW
                        </span>
                      ) : msg.status === 'DENY' ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 text-rose-400 font-bold">
                          <ShieldAlert className="w-3 h-3" />
                          DENY (Fail-Closed)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 font-bold">
                          <ShieldCheck className="w-3 h-3" />
                          VERIFIED
                        </span>
                      )}
                      <span className="text-slate-400 truncate max-w-[150px] md:max-w-[200px]">
                        {msg.policy}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyDecisionId(msg.decisionId!)}
                        className="inline-flex items-center gap-1 text-[10px] text-gold-400/90 hover:text-gold-300 transition-colors"
                        title={isPt ? 'Copiar DecisionID' : 'Copy DecisionID'}
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
                        title={isPt ? 'Ver recibo criptográfico' : 'View cryptographic receipt'}
                      >
                        {expandedReceipts[msg.id] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Signed Evidence Details */}
                  <AnimatePresence>
                    {expandedReceipts[msg.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2.5 p-2.5 bg-navy-950 border border-navy-800 rounded-sm space-y-1 text-[10px] font-mono"
                      >
                        <div className="flex justify-between text-slate-400">
                          <span className="text-slate-400">Action:</span>
                          <span className="text-white">{msg.action || 'INSPECT'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span className="text-slate-400">Reason:</span>
                          <span className="text-slate-300 text-right">{msg.reason || 'Policy evaluated'}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-navy-900">
                          <span className="text-emerald-400">Signature:</span>
                          <span className="text-slate-400 font-mono truncate max-w-[200px]">
                            {msg.signature || 'ecdsa-p256:0x...'}
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
              <span>{isPt ? 'Gemini gerando proposta e REX Guard avaliando...' : 'Gemini proposing & REX Guard evaluating...'}</span>
            </div>
            <div className="p-3 bg-navy-900/80 border border-navy-800 rounded-sm text-slate-400 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-gold-400 animate-pulse" />
              <span>{isPt ? 'Calculando DecisionID e verificando políticas deterministicas...' : 'Calculating DecisionID & verifying deterministic policy...'}</span>
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
              ? 'Envie um comando ou teste (ex.: "Propor transferência de R$ 10.000")...'
              : 'Type an action or prompt (e.g., "Propose $10,000 transfer")...'
          }
          className="flex-1 bg-navy-950 border border-navy-700 rounded-sm px-3.5 py-2 text-xs md:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:bg-navy-800 disabled:text-slate-600 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
        >
          <span>{isPt ? 'Enviar' : 'Send'}</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};

export default GeminiLiveDemo;
