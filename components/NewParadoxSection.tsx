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
  "en": {
    "pressure": {
      "retention": {
        "eyebrow": "AI / agent",
        "detail": "Interprets. Recommends. Proposes.",
        "copy": "A plausible proposal does not grant permission to move resources or change systems."
      },
      "erasure": {
        "eyebrow": "Institution",
        "detail": "Defines. Authorizes. Revokes.",
        "copy": "Authority has an accountable holder, purpose, scope and validity. It must be proven when the action is about to occur."
      }
    },
    "timeline": [
      {
        "title": "Identity is not authority",
        "description": "Knowing who made the call does not establish whether that person or agent may perform the proposed action."
      },
      {
        "title": "Context belongs in authorization",
        "description": "Tenant, purpose, action, scope and time delimit institutional permission."
      },
      {
        "title": "The boundary must enforce control",
        "description": "A safety recommendation is not enough: an action without proven authority must stop before the protected system."
      }
    ],
    "safeguards": [
      {
        "title": "Deterministic policy",
        "copy": "Explicit rules govern the execution path."
      },
      {
        "title": "Attributable accountability",
        "copy": "The authorization outcome is identifiable and verifiable."
      }
    ],
    "flowTitle": "From identity to authority",
    "console": {
      "eyebrow": "The boundary question",
      "title": "Authorized to act, now?",
      "body": "Is this actor authorized to perform this action, for this purpose, in this context, now?"
    }
  },
  "pt": {
    "pressure": {
      "retention": {
        "eyebrow": "IA / agente",
        "detail": "Interpreta. Recomenda. Propõe.",
        "copy": "Uma proposta plausível não concede permissão para movimentar recursos ou alterar sistemas."
      },
      "erasure": {
        "eyebrow": "Instituição",
        "detail": "Define. Autoriza. Revoga.",
        "copy": "A autoridade tem titular, finalidade, escopo e validade. Deve ser comprovada quando a ação vai ocorrer."
      }
    },
    "timeline": [
      {
        "title": "Identidade não é autoridade",
        "description": "Saber quem fez a chamada não determina se essa pessoa ou agente pode executar a ação proposta."
      },
      {
        "title": "Contexto faz parte da autorização",
        "description": "Tenant, finalidade, ação, escopo e tempo delimitam a permissão institucional."
      },
      {
        "title": "A fronteira precisa aplicar o controle",
        "description": "Uma recomendação de segurança não basta: a ação sem autoridade comprovada deve parar antes do sistema protegido."
      }
    ],
    "safeguards": [
      {
        "title": "Política determinística",
        "copy": "Regras explícitas governam o caminho de execução."
      },
      {
        "title": "Responsabilidade atribuível",
        "copy": "O resultado da autorização é identificável e verificável."
      }
    ],
    "flowTitle": "Da identidade à autoridade",
    "console": {
      "eyebrow": "A pergunta na fronteira",
      "title": "Autorizado para agir, agora?",
      "body": "Este ator está autorizado a executar esta ação, para esta finalidade, neste contexto, agora?"
    }
  }
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
    <section id="authority-gap" className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 border-t border-slate-100">
      
      {/* Rigid Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <motion.div
          className="text-center mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-5">
               <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                 {t.paradox.eyebrow}
               </span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-navy-900 leading-tight mb-6">
            {t.paradox.titleMain}{' '}
            <span className="block italic font-light text-slate-400 mt-2">{t.paradox.titleItalic}</span>
          </h2>
          <div className="space-y-3.5 text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
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
                 relative p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-between min-h-[380px]
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
                <div className={`inline-block px-3 py-1 mb-5 text-[10px] font-bold uppercase tracking-widest rounded-sm ${card.pill}`}>
                  {card.eyebrow}
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif mb-2">{card.detail}</h3>
              </div>
              
              <div className="mt-6 sm:mt-8 border-t border-current/10 pt-6 sm:pt-8">
                 <p className={`text-base sm:text-lg font-light leading-relaxed ${card.labelKey === 'erasure' ? 'text-slate-300' : 'text-slate-600'}`}>
                   "{card.copy}"
                 </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline as "System Process" */}
        <div className="mt-16 md:mt-20 mx-auto">
           <div className="flex items-center gap-4 mb-8 md:mb-10">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">{copy.flowTitle}</span>
              <div className="h-px bg-slate-200 flex-1"></div>
           </div>

           <div className="relative border-l border-slate-200 ml-4 md:ml-0 space-y-8 md:space-y-10">
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
                      <span className="text-[10px] font-mono text-slate-400 mr-3 uppercase tracking-wider block md:inline mb-1 md:mb-0">0{idx + 1}</span>
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
        <div className="mt-16 md:mt-20 border border-slate-200 bg-white shadow-xl max-w-3xl mx-auto overflow-hidden rounded-sm">
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
                 <span className="font-bold">{copy.console.title}</span>
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
                 {copy.safeguards.map((safeguard) => (
                   <motion.p key={safeguard.title} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                     <span className="text-navy-900 font-bold">{safeguard.title}: </span>{safeguard.copy}
                   </motion.p>
                 ))}
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
