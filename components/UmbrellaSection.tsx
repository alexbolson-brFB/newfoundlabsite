import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Database,
  BrainCircuit,
  LucideIcon,
  ArrowUpRight,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeatureAccent {
  cardBackground: string;
  border: string;
  glow: string;
  badge: string;
  icon: string;
  halo: string;
}

interface Feature {
  title: string;
  description: string;
  detail: string;
  badge: string;
  icon: LucideIcon;
  accent: FeatureAccent;
}

type Locale = 'en' | 'pt';

type FeatureKey = 'trust' | 'zero' | 'score' | 'philosophy';

const featureBlueprint: Record<
  FeatureKey,
  { icon: LucideIcon; accent: FeatureAccent }
> = {
  trust: {
    icon: ShieldCheck,
    accent: {
      cardBackground: 'from-blue-50/80 via-white to-white',
      border: 'border-blue-100/60',
      glow: 'shadow-[0_35px_80px_rgba(59,130,246,0.2)]',
      badge: 'text-blue-700 border-blue-200/70 bg-blue-50/70',
      icon: 'text-blue-500',
      halo: 'from-blue-200/60 via-white/15 to-transparent',
    },
  },
  zero: {
    icon: Zap,
    accent: {
      cardBackground: 'from-emerald-50/85 via-white to-white',
      border: 'border-emerald-100/70',
      glow: 'shadow-[0_35px_80px_rgba(16,185,129,0.2)]',
      badge: 'text-emerald-700 border-emerald-200/70 bg-emerald-50/80',
      icon: 'text-emerald-500',
      halo: 'from-emerald-200/60 via-white/15 to-transparent',
    },
  },
  score: {
    icon: Database,
    accent: {
      cardBackground: 'from-indigo-50/85 via-white to-white',
      border: 'border-indigo-100/70',
      glow: 'shadow-[0_35px_80px_rgba(99,102,241,0.2)]',
      badge: 'text-indigo-700 border-indigo-200/70 bg-indigo-50/80',
      icon: 'text-indigo-500',
      halo: 'from-indigo-200/60 via-white/15 to-transparent',
    },
  },
  philosophy: {
    icon: BrainCircuit,
    accent: {
      cardBackground: 'from-purple-50/85 via-white to-white',
      border: 'border-purple-100/70',
      glow: 'shadow-[0_35px_80px_rgba(168,85,247,0.2)]',
      badge: 'text-purple-700 border-purple-200/70 bg-purple-50/80',
      icon: 'text-purple-500',
      halo: 'from-purple-200/60 via-white/15 to-transparent',
    },
  },
};

const featureCopy: Record<
  Locale,
  Record<FeatureKey, Omit<Feature, 'icon' | 'accent'>>
> = {
  en: {
    trust: {
      title: 'Infrastructure for Trust',
      description:
        'Precision ingestion, validation, scoring, and evidence generation through the Veritas Protocol.',
      detail: 'Deterministic scoring trail for regulators and auditors.',
      badge: 'Veritas Stack',
    },
    zero: {
      title: 'Zero-Persistence Architecture',
      description:
        'Sensitive data stays in volatile memory and never lands on disk, eliminating custody risk.',
      detail: 'Ephemeral enclaves guarantee zero stored bytes post-inference.',
      badge: 'Ephemeral Compute',
    },
    score: {
      title: 'Explainable Score',
      description:
        'AI-generated scores with narrative justifications ensure auditability.',
      detail: 'Every decision is paired with human-readable context.',
      badge: 'Explainability',
    },
    philosophy: {
      title: 'AI Philosophy',
      description:
        'Explainability, bias mitigation, and robust governance layered over Google Gemini.',
      detail: 'Ethical guardrails embedded from design to deployment.',
      badge: 'Governance',
    },
  },
  pt: {
    trust: {
      title: 'Infraestrutura para Confianca',
      description:
        'Ingestao, validacao, score e evidencia auditavel conduzidos pelo Protocolo Veritas.',
      detail: 'Trilha deterministica para reguladores e auditorias.',
      badge: 'Stack Veritas',
    },
    zero: {
      title: 'Arquitetura Zero-Persistencia',
      description:
        'Dados sensiveis vivem em memoria volatil e nunca tocam disco, removendo risco de custodia.',
      detail: 'Enclaves efemeros garantem zero bytes armazenados.',
      badge: 'Compute Efemero',
    },
    score: {
      title: 'Score Explicavel',
      description:
        'Pontuacoes com narrativas naturais entregam transparencia auditavel.',
      detail: 'Cada decisao vem acompanhada de contexto legivel.',
      badge: 'Explainability',
    },
    philosophy: {
      title: 'Filosofia de IA',
      description:
        'Explainability, mitigacao de vieses e governanca robusta alavancando Google Gemini.',
      detail: 'Trilhos eticos integrados do design ao deploy.',
      badge: 'Governanca',
    },
  },
};

const sectionCopy: Record<Locale, { eyebrow: string; heading: string; subheading: string }> = {
  en: {
    eyebrow: 'Trust-native primitives',
    heading: "Foundlab's Umbrella Platform",
    subheading:
      'A cinematic, serverless infrastructure engineered for computational trust, low-latency inference, and institutional certainty across regulated industries.',
  },
  pt: {
    eyebrow: 'Primitivos nativos de confianca',
    heading: 'Plataforma Umbrella da FoundLab',
    subheading:
      'Infraestrutura serverless cinematografica desenhada para confianca computacional, inferencia de baixa latencia e certeza institucional em mercados regulados.',
  },
};

const statsCopy: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: 'Cold-start SLA', value: '< 50 ms' },
    { label: 'Custody Risk', value: '0 stored bytes' },
    { label: 'Explainability Coverage', value: '100% of decisions' },
  ],
  pt: [
    { label: 'SLA de cold-start', value: '< 50 ms' },
    { label: 'Risco de custodia', value: '0 bytes armazenados' },
    { label: 'Cobertura de XAI', value: '100% das decisoes' },
  ],
};

const UmbrellaSection: React.FC = () => {
  const { language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const section = sectionCopy[locale];
  const stats = statsCopy[locale];
  const features = (Object.keys(featureBlueprint) as FeatureKey[]).map((key) => ({
    icon: featureBlueprint[key].icon,
    accent: featureBlueprint[key].accent,
    ...featureCopy[locale][key],
  }));

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 border-t border-slate-200">
      {/* Background with Audit Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none border-b border-slate-200"
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Cinematic Gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-white via-white/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="px-6 md:px-10 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-navy-900 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                 {section.eyebrow}
               </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif text-navy-900 leading-tight mb-6">
              {section.heading}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mx-auto leading-relaxed font-light">
              {section.subheading}
            </p>
          </motion.div>

          {/* KPI Bar - Rigid Style */}
          <div className="mt-12 inline-flex flex-col md:flex-row border border-slate-200 bg-white shadow-sm divide-y md:divide-y-0 md:divide-x divide-slate-200 max-w-4xl mx-auto w-full">
             {stats.map((stat, index) => (
                <div key={stat.label} className="flex-1 p-6 flex flex-col items-center justify-center group hover:bg-slate-50 transition-colors">
                   <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-mono mb-2">{stat.label}</p>
                   <p className="text-2xl font-serif text-navy-900">{stat.value}</p>
                </div>
             ))}
          </div>
        </div>

        {/* Feature Grid - The "Audit Layout" */}
        <div className="border-y border-slate-200 bg-white">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="relative group p-8 lg:p-10 flex flex-col h-full hover:bg-slate-50/50 transition-colors duration-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Hover Top Border Accent */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-navy-900 to-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="mb-8 flex items-start justify-between">
                       <div className="p-3 bg-white border border-slate-200 shadow-sm text-navy-900 group-hover:text-gold-600 transition-colors">
                          <Icon className="w-6 h-6" />
                       </div>
                       <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 border border-slate-100 px-2 py-1 rounded-sm bg-slate-50">
                          {String(index + 1).padStart(2, '0')}
                       </span>
                    </div>

                    <h3 className="text-xl font-serif font-medium text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
                      {feature.description}
                    </p>

                    <div className="pt-6 border-t border-slate-100 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-1 h-1 bg-gold-500 rounded-full" />
                           <span className="text-[10px] font-bold uppercase tracking-wider text-navy-900">{feature.badge}</span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono leading-tight">
                           // {feature.detail}
                        </p>
                    </div>
                  </motion.div>
                );
              })}
           </div>
        </div>
      </div>
    </section>
  );
};

export default UmbrellaSection;
