import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Locale = 'en' | 'pt';

interface PartnerEntry {
  name: string;
  role: string;
  status: 'active' | 'validated' | 'pipeline';
  type: 'technology' | 'distribution' | 'advisory';
  logo?: string; // path to logo asset
  logoType?: 'svg' | 'png' | 'img';
}

interface SectionCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  statusLabels: Record<string, string>;
  typeLabels: Record<string, string>;
  ctaLabel: string;
  ctaNote: string;
  techTitle: string;
  distributionTitle: string;
  advisoryTitle: string;
}

const copy: Record<Locale, SectionCopy> = {
  en: {
    eyebrow: 'Partner Ecosystem',
    title: 'Built on institutional trust.',
    subtitle:
      'REX Guard is distributed through a curated network of technology and advisory partners — each validated for regulatory exposure, enterprise access, and operational capability.',
    statusLabels: {
      active: 'Active',
      validated: 'Validated',
      pipeline: 'In qualification',
    },
    typeLabels: {
      technology: 'Technology',
      distribution: 'Distribution',
      advisory: 'Advisory',
    },
    ctaLabel: 'Become a partner',
    ctaNote: 'Authorized channel program · NDA required · Pilot-first model',
    techTitle: 'Technology Infrastructure',
    distributionTitle: 'Authorized Distribution',
    advisoryTitle: 'Advisory & Compliance',
  },
  pt: {
    eyebrow: 'Ecossistema de Parceiros',
    title: 'Construído sobre confiança institucional.',
    subtitle:
      'O REX Guard é distribuído por uma rede curada de parceiros de tecnologia e consultoria — cada um validado por exposição regulatória, acesso enterprise e capacidade operacional.',
    statusLabels: {
      active: 'Ativo',
      validated: 'Validado',
      pipeline: 'Em qualificação',
    },
    typeLabels: {
      technology: 'Tecnologia',
      distribution: 'Distribuição',
      advisory: 'Advisory',
    },
    ctaLabel: 'Torne-se parceiro',
    ctaNote: 'Programa de canal autorizado · NDA obrigatório · Modelo pilot-first',
    techTitle: 'Infraestrutura Tecnológica',
    distributionTitle: 'Distribuição Autorizada',
    advisoryTitle: 'Advisory & Compliance',
  },
};

const partners: PartnerEntry[] = [
  {
    name: 'Google Cloud',
    role: 'Vertex AI / GCP',
    status: 'active',
    type: 'technology',
    logo: '/google_select_badge.png',
    logoType: 'img',
  },
  {
    name: '2RP Net',
    role: 'Systems Integration',
    status: 'active',
    type: 'distribution',
    logo: '/images/logo2rp.svg',
    logoType: 'svg',
  },
  {
    name: 'NetSecurity',
    role: 'MSSP · Financial Sector',
    status: 'pipeline',
    type: 'distribution',
  },
  {
    name: 'Century Data',
    role: 'AI Governance Assessment',
    status: 'pipeline',
    type: 'advisory',
  },
];

const statusConfig = {
  active: {
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-400',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    Icon: CheckCircle2,
  },
  validated: {
    dot: 'bg-gold-500',
    ping: 'bg-gold-400',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    Icon: CheckCircle2,
  },
  pipeline: {
    dot: 'bg-slate-400',
    ping: 'bg-slate-300',
    text: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    Icon: Clock,
  },
};

const PartnerCard: React.FC<{ partner: PartnerEntry; t: SectionCopy; index: number }> = ({
  partner,
  t,
  index,
}) => {
  const cfg = statusConfig[partner.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative group flex flex-col p-8 bg-white border border-slate-200 hover:border-navy-900/20 hover:shadow-elevation transition-all duration-300"
    >
      {/* Hover top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-navy-900 to-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

      {/* Logo or text placeholder */}
      <div className="mb-6 h-10 flex items-center">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-8 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ) : (
          <span className="text-lg font-serif font-medium text-navy-900">{partner.name}</span>
        )}
      </div>

      {/* If logo shown, also show name below */}
      {partner.logo && (
        <p className="text-sm font-medium text-navy-900 mb-1">{partner.name}</p>
      )}

      <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-5">
        {partner.role}
      </p>

      {/* Footer: type pill + status */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
          {t.typeLabels[partner.type]}
        </span>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.12em] ${cfg.text} ${cfg.bg} border ${cfg.border}`}>
          <span className="relative flex h-1.5 w-1.5">
            {partner.status === 'active' && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.ping} opacity-75`} />
            )}
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${cfg.dot}`} />
          </span>
          {t.statusLabels[partner.status]}
        </div>
      </div>
    </motion.div>
  );
};

const PartnersSection: React.FC = () => {
  const { language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const t = copy[locale];

  return (
    <section id="partners" className="relative py-20 lg:py-28 bg-slate-50 border-t border-slate-200 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-navy-900 leading-tight mb-5 text-balance">
            {t.title}
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed text-pretty">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Partner grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-200">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className={[
                i % 2 === 0 && i < partners.length - 2 ? 'border-b lg:border-b-0' : '',
                i < 3 ? 'border-b lg:border-b-0 lg:border-r' : '',
                i === 1 ? 'sm:border-r' : '',
                i === 3 ? '' : '',
              ].join(' ')}
            >
              <PartnerCard partner={partner} t={t} index={i} />
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-200 bg-white p-6 md:p-8"
        >
          <div>
            <p className="text-sm font-medium text-navy-900 mb-1">{t.ctaLabel}</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              {t.ctaNote}
            </p>
          </div>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-navy-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-navy-800 transition-all shadow-glow rounded-sm min-h-[44px] shrink-0"
          >
            {t.ctaLabel}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
