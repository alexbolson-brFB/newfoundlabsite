import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, ArrowRight, Fingerprint, Info, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import GeminiLiveDemo from './GeminiLiveDemo';

/* ------------------------------------------------------------------ */
/*  Bilingual copy                                                    */
/* ------------------------------------------------------------------ */
type Locale = 'en' | 'pt';

interface RexGuardCopy {
  badge: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  archEyebrow: string;
  archTitle: string;
  archSubtitle: string;
  steps: { label: string; desc: string; metric: string; calculation: string }[];
  hashTitle: string;
  diffEyebrow: string;
  diffTitle: string;
  differentials: { icon: 'shield' | 'lock' | 'file'; title: string; desc: string; tag: string }[];
  boundaryLabel: string;
  boundarySteps: string[];
  signatureExample: string;
}

const copy: Record<Locale, RexGuardCopy> = {
  "en": {
    "badge": "Auditable Trust Infrastructure (ATI)",
    "title": "REX Guard.",
    "titleItalic": "Authority stays with the institution.",
    "subtitle": "Between AI-generated intent and an enterprise action, REX Guard verifies authorization and enforces policy. The model proposes; it does not inherit institutional authority.",
    "cta1": "Evaluate REX Guard",
    "cta2": "View Architecture",
    "archEyebrow": "How it works",
    "archTitle": "Intent → Authority → Policy → Execution → Evidence",
    "archSubtitle": "Authorization is checked before execution. Its outcome receives a signed record; execution status is correlated separately.",
    "steps": [
      {
        "label": "Intent Received",
        "desc": "AI or software proposes an action; intent does not confer authority.",
        "metric": "Ingress Inspection",
        "calculation": "Calculated via SHA-256 payload integrity hashing and zero-persistence buffer validation before dispatch."
      },
      {
        "label": "Authority Verification",
        "desc": "Evaluates caller, tenant, purpose, action, scope and temporal validity.",
        "metric": "Multi-Factor Authority",
        "calculation": "Evaluated against 6-point tuple: caller identity, tenant claim, action scope, purpose tag, TTL, and adapter."
      },
      {
        "label": "Deterministic Policy",
        "desc": "Rules-as-Code allows or denies. Missing required authority fails closed.",
        "metric": "Deterministic Enforcement",
        "calculation": "Verified by compiled Rules-as-Code policy engine with mathematical certainty. Missing policy fails closed."
      },
      {
        "label": "Protected Execution",
        "desc": "Only authorized actions reach the downstream system through the protected adapter.",
        "metric": "Protected Gateway",
        "calculation": "Enforced through single-use ephemeral capability tokens dispatched strictly to validated downstream adapters."
      },
      {
        "label": "Signed Evidence",
        "desc": "DecisionID and a receipt record the authorization outcome for audit.",
        "metric": "Cryptographic Audit",
        "calculation": "Computed by asymmetric ECDSA signature over execution context, generating an immutable DecisionID receipt."
      }
    ],
    "hashTitle": "Illustrative example · not a real receipt",
    "diffEyebrow": "Execution-boundary properties",
    "diffTitle": "Explicit control. Verifiable evidence.",
    "differentials": [
      {
        "icon": "shield",
        "title": "Runtime Authority Verification",
        "desc": "Checks authority at execution time rather than inferring it from model output.",
        "tag": "Authority"
      },
      {
        "icon": "lock",
        "title": "Deterministic Enforcement",
        "desc": "Explicit rules govern execution, not probabilistic model judgment.",
        "tag": "Policy"
      },
      {
        "icon": "shield",
        "title": "Fail-Closed Execution",
        "desc": "If required authority cannot be proven, the protected action does not execute.",
        "tag": "Execution"
      },
      {
        "icon": "lock",
        "title": "Purpose-Bound Authorization",
        "desc": "Binds tenant, caller, purpose, action, scope and temporal validity.",
        "tag": "Context"
      },
      {
        "icon": "shield",
        "title": "Replay Protection",
        "desc": "Binds authorization to its intended execution context to reject improper reuse.",
        "tag": "Scoped use"
      },
      {
        "icon": "file",
        "title": "Auditable Evidence",
        "desc": "DecisionID and a signed receipt identify and enable verification of the authorization outcome.",
        "tag": "Evidence"
      }
    ],
    "boundaryLabel": "Execution boundary",
    "boundarySteps": [
      "AI / agent",
      "REX Guard",
      "Enterprise system",
      "Protected action"
    ],
    "signatureExample": "[illustrative signature — demo only]"
  },
  "pt": {
    "badge": "Auditable Trust Infrastructure (ATI)",
    "title": "REX Guard.",
    "titleItalic": "A autoridade permanece na instituição.",
    "subtitle": "Entre a intenção gerada por IA e a ação corporativa, REX Guard verifica a autorização e aplica a política. O modelo propõe; não herda autoridade institucional.",
    "cta1": "Avaliar REX Guard",
    "cta2": "Ver Arquitetura",
    "archEyebrow": "Como funciona",
    "archTitle": "Intenção → Autoridade → Política → Execução → Evidência",
    "archSubtitle": "A autorização é verificada antes da execução. O resultado recebe um registro assinado; o estado da execução é correlacionado separadamente.",
    "steps": [
      {
        "label": "Intenção recebida",
        "desc": "IA ou software propõe uma ação; a intenção não concede autoridade.",
        "metric": "Inspeção de Ingress",
        "calculation": "Calculado via integridade do payload com SHA-256 e validação em buffer de zero-persistência antes do despacho."
      },
      {
        "label": "Verificação de autoridade",
        "desc": "Avalia solicitante, tenant, finalidade, ação, escopo e validade temporal.",
        "metric": "Autoridade Multifatorial",
        "calculation": "Avaliado dinamicamente sobre a tupla de 6 fatores: solicitante, tenant, escopo, finalidade, TTL e adaptador downstream."
      },
      {
        "label": "Política determinística",
        "desc": "Rules-as-Code permite ou nega. Sem autoridade comprovada, falha de forma fechada.",
        "metric": "Aplicação Determinística",
        "calculation": "Verificado por motor compilado de Rules-as-Code com certeza matemática. Ausência de regra resulta em bloqueio (fail-closed)."
      },
      {
        "label": "Execução protegida",
        "desc": "Somente ações autorizadas alcançam o sistema de destino pelo adaptador protegido.",
        "metric": "Gateway Protegido",
        "calculation": "Aplicado por meio de tokens efêmeros de capacidade de uso único, despachados estritamente para adaptadores autorizados."
      },
      {
        "label": "Evidência assinada",
        "desc": "DecisionID e recibo registram o resultado da autorização para auditoria.",
        "metric": "Auditoria Criptográfica",
        "calculation": "Computado por assinatura assimétrica ECDSA sobre o contexto de execução, gerando um recibo imutável de DecisionID."
      }
    ],
    "hashTitle": "Exemplo ilustrativo · não é um recibo real",
    "diffEyebrow": "Propriedades da fronteira de execução",
    "diffTitle": "Controle explícito. Evidência verificável.",
    "differentials": [
      {
        "icon": "shield",
        "title": "Autoridade em runtime",
        "desc": "Verifica autoridade no momento da execução; não a infere da resposta do modelo.",
        "tag": "Autoridade"
      },
      {
        "icon": "lock",
        "title": "Aplicação determinística",
        "desc": "Regras explícitas governam a execução, não o julgamento probabilístico do modelo.",
        "tag": "Política"
      },
      {
        "icon": "shield",
        "title": "Execução fail closed",
        "desc": "Sem comprovação da autoridade exigida, a ação protegida não é executada.",
        "tag": "Execução"
      },
      {
        "icon": "lock",
        "title": "Autorização por finalidade",
        "desc": "Vincula tenant, solicitante, finalidade, ação, escopo e validade temporal.",
        "tag": "Contexto"
      },
      {
        "icon": "shield",
        "title": "Proteção contra replay",
        "desc": "Vincula a autorização ao contexto previsto para rejeitar reutilizações indevidas.",
        "tag": "Uso delimitado"
      },
      {
        "icon": "file",
        "title": "Evidência auditável",
        "desc": "DecisionID e recibo assinado permitem identificar e verificar o resultado da autorização.",
        "tag": "Evidência"
      }
    ],
    "boundaryLabel": "Fronteira de execução",
    "boundarySteps": [
      "IA / agente",
      "REX Guard",
      "Sistema corporativo",
      "Ação protegida"
    ],
    "signatureExample": "[assinatura ilustrativa — demonstração]"
  }
};

/* ------------------------------------------------------------------ */
/*  Icon map                                                          */
/* ------------------------------------------------------------------ */
const iconMap = {
  shield: Shield,
  lock: Lock,
  file: FileCheck,
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const RexGuardSection: React.FC = () => {
  const { language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const t = copy[locale];

  return (
    <section id="rex-guard" className="relative overflow-hidden">

      {/* ====== PART 1: HERO — WHITE (matches site aesthetic) ====== */}
      <div className="relative py-16 md:py-20 lg:py-28 bg-white border-t border-slate-100 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge — same as rest of site */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                    {t.badge}
                  </span>
                </div>

                {/* Title — serif, same scale as NewParadoxSection */}
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-navy-900 leading-[1.05] tracking-tight mb-5">
                  {t.title}
                  <span className="block italic font-light text-slate-400 mt-2">{t.titleItalic}</span>
                </h2>

                {/* Subtitle */}
                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-8 md:mb-10 text-pretty">
                  {t.subtitle}
                </p>

                {/* CTAs — matching Hero CTA style */}
                <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm min-h-[48px]"
                  >
                    {t.cta1}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#architecture"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-slate-300 text-navy-900 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors rounded-sm min-h-[48px]"
                  >
                    {t.cta2}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Product photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-8">{t.boundaryLabel}</p>
                  <ol className="space-y-4">
                    {t.boundarySteps.map((step, index) => (
                      <li key={step} className={`flex items-center gap-4 p-4 border ${index === 1 ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-200 text-navy-900'}`}>
                        <span className="font-mono text-xs text-gold-600">0{index + 1}</span>
                        <span className="font-serif text-xl">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Corner markings — consistent with ParadoxSection cards */}
              <div className="absolute top-2 left-2 border-t border-l w-4 h-4 border-slate-300 pointer-events-none" />
              <div className="absolute top-2 right-2 border-t border-r w-4 h-4 border-slate-300 pointer-events-none" />
              <div className="absolute bottom-2 left-2 border-b border-l w-4 h-4 border-slate-300 pointer-events-none" />
              <div className="absolute bottom-2 right-2 border-b border-r w-4 h-4 border-slate-300 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ====== PART 2: PIPELINE — DARK (matches ROI dark card) ====== */}
      <div id="how-it-works" className="relative scroll-mt-24 bg-navy-950 py-16 md:py-20 lg:py-24 border-t border-slate-200 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-14"
          >
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{t.archEyebrow}</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-serif text-3xl md:text-4xl text-white mb-4 text-balance"
              >
                {t.archTitle}
              </motion.h3>
              <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto text-pretty">
                {t.archSubtitle}
              </p>
            </div>
          </motion.div>

          {/* Pipeline steps — same border style as ROI card interior */}
          <div className="grid grid-cols-1 md:grid-cols-5 border border-navy-800 bg-navy-950/40 relative">
            {t.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative p-5 sm:p-6 lg:p-7 flex flex-col group hover:bg-navy-900/80 transition-all duration-300 ${
                  idx < t.steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-navy-800' : ''
                }`}
              >
                {/* Step header with index and metric pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                  <div 
                    tabIndex={0}
                    aria-label={`${step.metric} tooltip`}
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-navy-900/90 border border-gold-500/30 text-[9px] font-mono text-gold-400 group-hover:border-gold-500/60 transition-colors cursor-help"
                  >
                    <span className="truncate max-w-[95px] lg:max-w-[110px]">{step.metric}</span>
                    <Info className="w-2.5 h-2.5 text-gold-500/70 group-hover:text-gold-400 transition-colors flex-shrink-0" />
                  </div>
                </div>

                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {step.label}
                </h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed mt-auto">
                  {step.desc}
                </p>

                {/* Hover-based Tooltip */}
                <div
                  role="tooltip"
                  className="opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out translate-y-1 group-hover:translate-y-0 absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3.5 bg-navy-900/98 backdrop-blur-md border border-gold-500/40 text-white rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-50 pointer-events-none"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-navy-800">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                      {locale === 'pt' ? 'Métrica & Cálculo' : 'Metric & Calculation'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 mb-1">
                    {step.metric}
                  </p>
                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                    {step.calculation}
                  </p>
                  {/* Tooltip arrow caret */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-navy-900 border-r border-b border-gold-500/40 rotate-45" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cryptographic output — matches FoundLab Console pattern */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 md:mt-12 border border-navy-800 bg-navy-900/50 max-w-3xl mx-auto overflow-hidden"
          >
            {/* Toolbar */}
            <div className="bg-navy-900 border-b border-navy-800 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <div className="ml-3 flex items-center gap-2">
                  <Fingerprint className="w-3.5 h-3.5 text-gold-500/80" />
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{t.hashTitle}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-gold-400/90 bg-navy-800/80 px-2 py-0.5 rounded border border-gold-500/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  {locale === 'pt' ? 'Simulação de Agente · Gemini 3.8 Flash' : 'Agent Simulation · Gemini 3.8 Flash'}
                </span>
              </div>
            </div>

            {/* Live Gemini Chatbot Demo Container */}
            <div className="w-full">
              <GeminiLiveDemo />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ====== PART 3: DIFFERENTIALS — WHITE (matches WhitepaperSection) ====== */}
      <div className="relative py-18 lg:py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          {/* Eyebrow + Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                {t.diffEyebrow}
              </span>
            </div>
            <h3 className="font-serif text-4xl md:text-5xl text-navy-900 leading-tight text-balance">
              {t.diffTitle}
            </h3>
          </motion.div>

          {/* Cards — border grid like WhitepaperSection / MarketplaceSection */}
          <div className="border border-slate-200 bg-white shadow-xl">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {t.differentials.map((diff, idx) => {
                const Icon = iconMap[diff.icon];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col"
                  >
                    {/* Tag pill */}
                    <div className="inline-block self-start px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200 rounded-sm mb-6">
                      {diff.tag}
                    </div>
                    {/* Icon */}
                    <div className="w-10 h-10 flex items-center justify-center bg-navy-900 mb-5">
                      <Icon className="w-5 h-5 text-gold-500" />
                    </div>
                    {/* Title */}
                    <h4 className="text-xl font-serif text-navy-900 mb-3">{diff.title}</h4>
                    {/* Desc */}
                    <p className="text-sm text-slate-600 font-light leading-relaxed">{diff.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RexGuardSection;
