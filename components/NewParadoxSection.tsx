import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

type PressureKey = 'retention' | 'erasure';
type Locale = 'en' | 'pt';

interface PressureCardStyle {
  labelKey: PressureKey;
  color: string;
  border: string;
  pill: string;
}

interface PressureCardCopy {
  eyebrow: string;
  detail: string;
  copy: string;
}

interface TimelineStep {
  title: string;
  description: string;
}

interface Safeguard {
  title: string;
  copy: string;
}

interface ParadoxContent {
  pressure: Record<PressureKey, PressureCardCopy>;
  timeline: TimelineStep[];
  safeguards: Safeguard[];
  flowTitle: string;
  console: {
    eyebrow: string;
    title: string;
    body: string;
  };
}

const pressureCardStyles: PressureCardStyle[] = [
  {
    labelKey: 'retention',
    color: 'bg-white',
    border: 'border-slate-200',
    pill: 'bg-slate-100 text-slate-600 border border-slate-200',
  },
  {
    labelKey: 'erasure',
    color: 'bg-navy-900',
    border: 'border-navy-950',
    pill: 'bg-navy-800 text-gold-400 border border-navy-700',
  },
];

const paradoxContent: Record<Locale, ParadoxContent> = {
  en: {
    pressure: {
      retention: {
        eyebrow: 'Regulators',
        detail: 'BACEN / SEC / SOX',
        copy: 'Retain every log forever. Evidence trails must survive every audit request.',
      },
      erasure: {
        eyebrow: 'Privacy Officers',
        detail: 'LGPD / GDPR',
        copy: 'Erase on demand. Zero residual data can rest on disk once a user requests deletion.',
      },
    },
    timeline: [
      {
        title: 'Zero-Persistence Fabric',
        description:
          'Inference spins up inside short-lived enclaves. Once the call ends, memory collapses and retention becomes a math event.',
      },
      {
        title: 'Dual Compliance Ledger',
        description:
          'Verifiable attestations prove the request happened and the data was destroyed. Regulators keep trails; users gain oblivion.',
      },
      {
        title: 'Explainable Exit',
        description:
          'Scores leave the enclave with narrative context, enabling instant human audit without exposing raw data.',
      },
    ],
    safeguards: [
      {
        title: 'Physics of Trust',
        copy: 'Deterministic paths and serverless orchestration eliminate ambiguity from audits.',
      },
      {
        title: 'Total Governance',
        copy: 'Legal, risk, and product share the same cryptographically signed evidence stream.',
      },
    ],
    flowTitle: 'Dual Compliance Flow',
    console: {
      eyebrow: 'Foundlab Response',
      title: 'Zero-Persistence Compliance Console',
      body: 'Real-time evidence shows cryptographic retention, instant erasures, and XAI narratives to defend every decision.',
    },
  },
  pt: {
    pressure: {
      retention: {
        eyebrow: 'Reguladores',
        detail: 'BACEN / SEC / SOX',
        copy: 'Reter tudo para sempre. Cada log, cada scoring e cada transacao precisam existir para auditorias retroativas.',
      },
      erasure: {
        eyebrow: 'Privacidade',
        detail: 'LGPD / GDPR',
        copy: 'Apagar sob demanda. Nenhum dado sensivel pode descansar em disco; o usuario precisa desaparecer quando solicitar.',
      },
    },
    timeline: [
      {
        title: 'Tecido de Zero-Persistencia',
        description:
          'Cada inferencia nasce em um enclave efemero e morre ao fim da chamada, transformando retencao em evento matematico.',
      },
      {
        title: 'Ledger Dual de Conformidade',
        description:
          'Assinaturas verificaveis provam que a requisicao existiu e que os dados foram apagados. Reguladores ganham trilha; o usuario ganha esquecimento.',
      },
      {
        title: 'Saida Explicavel',
        description:
          'Pontuacoes deixam o enclave com narrativa natural, permitindo auditoria imediata sem expor dados crus.',
      },
    ],
    safeguards: [
      {
        title: 'Fisica da Confianca',
        copy: 'Caminhos deterministicos e orquestracao serverless removem ambiguidade nos processos de auditoria.',
      },
      {
        title: 'Governanca Total',
        copy: 'Legal, risco e produto compartilham a mesma trilha assinada criptograficamente.',
      },
    ],
    flowTitle: 'Fluxo Dual de Conformidade',
    console: {
      eyebrow: 'Resposta Foundlab',
      title: 'Console de Compliance Zero-Persistencia',
      body: 'Evidencias em tempo real mostram retencao criptografada, exclusoes instantaneas e narrativas XAI para defender cada decisao diante de reguladores.',
    },
  },
};

const NewParadoxSection: React.FC = () => {
  const { t, language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const copy = paradoxContent[locale];
  const localizedPressureCards = pressureCardStyles.map((style) => ({
    ...style,
    ...copy.pressure[style.labelKey],
  }));

  return (
    <section id="the-paradox" className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 border-t border-slate-200">
      
      {/* Rigid Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                 {t.paradox.eyebrow}
               </span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-navy-900 leading-tight mb-8">
            {t.paradox.titleMain}{' '}
            <span className="block italic font-light text-slate-400 mt-2">{t.paradox.titleItalic}</span>
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            <p>{t.paradox.p1}</p>
            <p>{t.paradox.p2}</p>
          </div>
        </motion.div>

        {/* The Pressure Cards: Split View */}
        <div className="grid md:grid-cols-2 border border-slate-200 shadow-2xl shadow-slate-200/50">
          {localizedPressureCards.map((card, idx) => (
            <motion.div
              key={card.labelKey}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`
                 relative p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[400px]
                 ${card.color} ${idx === 0 ? 'border-b md:border-b-0 md:border-r border-slate-200' : ''}
                 ${card.labelKey === 'erasure' ? 'text-white' : 'text-navy-900'}
              `}
            >
              {/* Technical Corner Marking */}
              <div className="absolute top-4 left-4 border-t border-l w-4 h-4 border-current opacity-20"></div>
              <div className="absolute top-4 right-4 border-t border-r w-4 h-4 border-current opacity-20"></div>
              <div className="absolute bottom-4 left-4 border-b border-l w-4 h-4 border-current opacity-20"></div>
              <div className="absolute bottom-4 right-4 border-b border-r w-4 h-4 border-current opacity-20"></div>

              <div>
                <div className={`inline-block px-3 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest rounded-sm ${card.pill}`}>
                  {card.eyebrow}
                </div>
                <h3 className="text-3xl font-serif mb-2">{card.detail}</h3>
              </div>
              
              <div className="mt-8 border-t border-current/10 pt-8">
                 <p className={`text-lg font-light leading-relaxed ${card.labelKey === 'erasure' ? 'text-slate-300' : 'text-slate-600'}`}>
                   "{card.copy}"
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline as "System Process" */}
        <div className="mt-24 mx-auto">
           <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">{copy.flowTitle}</span>
              <div className="h-px bg-slate-200 flex-1"></div>
           </div>

           <div className="relative border-l border-slate-200 ml-4 md:ml-0 space-y-12">
              {copy.timeline.map((step, idx) => (
                 <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="relative pl-12 md:pl-24 group"
                 >
                    {/* Node Marker */}
                    <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-white border-2 border-slate-300 rounded-full group-hover:border-gold-500 group-hover:scale-125 transition-all z-10"></div>
                    
                    {/* Horizontal Connector */}
                    <div className="absolute left-0 top-3 w-8 md:w-16 h-px bg-slate-200 group-hover:bg-gold-500/50 transition-colors"></div>
                    
                    <h4 className="text-lg font-serif font-medium text-navy-900 group-hover:text-gold-600 transition-colors">
                      <span className="text-[10px] font-mono text-slate-400 mr-3 uppercase tracking-wider block md:inline mb-1 md:mb-0">Step 0{idx + 1}</span>
                      {step.title}
                    </h4>
                    <p className="mt-2 text-slate-600 font-light leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Console / Terminal Preview (Safeguards) */}
        <div className="mt-24 border border-slate-200 bg-white shadow-xl max-w-3xl mx-auto overflow-hidden rounded-sm">
           <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              </div>
              <div className="ml-4 text-[10px] text-slate-400 font-mono uppercase tracking-widest">FoundLab Console</div>
           </div>
           <div className="p-8 font-mono text-xs md:text-sm">
              <div className="text-navy-900 mb-4">
                 <span className="text-gold-500 mr-2">➜</span>
                 <span className="font-bold">verify_compliance_ledger</span> --target=transaction_0x8F
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.5 } }
                }}
                className="space-y-2 text-slate-500"
              >
                 <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>[INFO] Verifying cryptographic signatures...</motion.p>
                 <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>[INFO] Data Retention: <span className="text-emerald-600 font-bold">ENFORCED (Audit Trail)</span></motion.p>
                 <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>[INFO] PII Erasure: <span className="text-emerald-600 font-bold">CONFIRMED (Zero-Persistence)</span></motion.p>
                 <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-navy-900 mt-4 border-l-2 border-gold-500 pl-3 italic">
                    "{copy.console.body}"
                 </motion.p>
              </motion.div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default NewParadoxSection;
