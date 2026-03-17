import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, ArrowRight, Fingerprint } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* ------------------------------------------------------------------ */
/*  Bilingual copy                                                    */
/* ------------------------------------------------------------------ */
type Locale = 'en' | 'pt';

interface GeminiGuardCopy {
  badge: string;
  title: string;
  titleItalic: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  archEyebrow: string;
  archTitle: string;
  archSubtitle: string;
  steps: { label: string; desc: string }[];
  hashTitle: string;
  diffEyebrow: string;
  diffTitle: string;
  differentials: { icon: 'shield' | 'lock' | 'file'; title: string; desc: string; tag: string }[];
  complianceTitle: string;
  badges: string[];
  boothCaption: string;
  photoCaption1: string;
}

const copy: Record<Locale, GeminiGuardCopy> = {
  en: {
    badge: 'New Product',
    title: 'REX Gemini Guard.',
    titleItalic: 'Compliance as Physics.',
    subtitle:
      'Middleware that enables banks and insurers to deploy Google Gemini at scale — while respecting BCB 538/2025, EU AI Act, and DORA. Every AI decision becomes a cryptographic proof.',
    cta1: 'Access Demo',
    cta2: 'Read Architecture',
    archEyebrow: 'Pipeline Architecture',
    archTitle: 'Zero-Persistence Pipeline',
    archSubtitle: 'Every inference travels through five deterministic stages. No data rests on disk.',
    steps: [
      { label: 'AI Input', desc: 'Prompt ingestion via encrypted channel' },
      { label: 'Policy Evaluation', desc: 'Real-time rule matching against BCB 538 & AI Act' },
      { label: 'Decision Execution', desc: 'RAM-only inference inside ephemeral enclave' },
      { label: 'Cryptographic Seal', desc: 'SHA-256 hash + digital signature of I/O pair' },
      { label: 'Veritas Ledger', desc: 'Immutable evidence record in BigQuery' },
    ],
    hashTitle: 'Cryptographic Evidence Output',
    diffEyebrow: 'Why Gemini Guard',
    diffTitle: 'From Cost Center to Strategic Advantage.',
    differentials: [
      {
        icon: 'shield',
        title: 'Zero-Persistence',
        desc: 'RAM-only execution in short-lived enclaves. Once the call ends, memory collapses. No data written to disk, ever.',
        tag: 'Architecture',
      },
      {
        icon: 'lock',
        title: 'Cryptographic Evidence',
        desc: 'Every AI decision is sealed with SHA-256 hashes and digital signatures, producing immutable audit trails in BigQuery.',
        tag: 'Security',
      },
      {
        icon: 'file',
        title: 'Regulatory Coverage',
        desc: 'Full compliance with BCB 538/2025, EU AI Act, DORA, Resolucao 4.893, and SR 11-7 out of the box.',
        tag: 'Compliance',
      },
    ],
    complianceTitle: 'Regulatory Framework Coverage',
    badges: ['BCB 538/2025', 'EU AI Act', 'DORA', 'Resolucao 4.893', 'SR 11-7'],
    boothCaption: 'FoundLab at Google Cloud Next — Trust Infrastructure for AI',
    photoCaption1: 'Governance & Cryptographic Proof of AI Decisions',
  },
  pt: {
    badge: 'Novo Produto',
    title: 'REX Gemini Guard.',
    titleItalic: 'Compliance como Fisica.',
    subtitle:
      'Middleware que permite bancos e seguradoras implantarem Google Gemini em escala — respeitando BCB 538/2025, EU AI Act e DORA. Cada decisao de IA se torna uma prova criptografica.',
    cta1: 'Acesse a Demo',
    cta2: 'Ver Arquitetura',
    archEyebrow: 'Arquitetura do Pipeline',
    archTitle: 'Pipeline Zero-Persistencia',
    archSubtitle: 'Cada inferencia percorre cinco estagios deterministicos. Nenhum dado descansa em disco.',
    steps: [
      { label: 'AI Input', desc: 'Ingestao de prompt via canal criptografado' },
      { label: 'Policy Evaluation', desc: 'Avaliacao em tempo real contra BCB 538 e AI Act' },
      { label: 'Decision Execution', desc: 'Inferencia somente em RAM dentro de enclave efemero' },
      { label: 'Cryptographic Seal', desc: 'Hash SHA-256 + assinatura digital do par I/O' },
      { label: 'Veritas Ledger', desc: 'Registro de evidencia imutavel no BigQuery' },
    ],
    hashTitle: 'Saida de Evidencia Criptografica',
    diffEyebrow: 'Por que Gemini Guard',
    diffTitle: 'De Centro de Custo a Diferencial Estrategico.',
    differentials: [
      {
        icon: 'shield',
        title: 'Zero-Persistencia',
        desc: 'Execucao somente em RAM em enclaves efemeros. Quando a chamada termina, a memoria colapsa. Nenhum dado gravado em disco.',
        tag: 'Arquitetura',
      },
      {
        icon: 'lock',
        title: 'Evidencia Criptografica',
        desc: 'Cada decisao de IA e selada com hashes SHA-256 e assinaturas digitais, produzindo trilhas de auditoria imutaveis no BigQuery.',
        tag: 'Seguranca',
      },
      {
        icon: 'file',
        title: 'Cobertura Regulatoria',
        desc: 'Conformidade total com BCB 538/2025, EU AI Act, DORA, Resolucao 4.893 e SR 11-7 out-of-the-box.',
        tag: 'Compliance',
      },
    ],
    complianceTitle: 'Cobertura Regulatoria',
    badges: ['BCB 538/2025', 'EU AI Act', 'DORA', 'Resolucao 4.893', 'SR 11-7'],
    boothCaption: 'FoundLab no Google Cloud Next — Trust Infrastructure for AI',
    photoCaption1: 'Governanca e Prova Criptografica de Decisoes de IA',
  },
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
const GeminiGuardSection: React.FC = () => {
  const { language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const t = copy[locale];

  return (
    <section id="gemini-guard" className="relative overflow-hidden">

      {/* ====== PART 1: HERO — WHITE (matches site aesthetic) ====== */}
      <div className="relative py-24 lg:py-32 bg-white border-t border-slate-200 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge — same as rest of site */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                    {t.badge}
                  </span>
                </div>

                {/* Title — serif, same scale as NewParadoxSection */}
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-navy-900 leading-[1.05] tracking-tight mb-4">
                  {t.title}
                  <span className="block italic font-light text-slate-400 mt-2">{t.titleItalic}</span>
                </h2>

                {/* Subtitle */}
                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10 text-pretty">
                  {t.subtitle}
                </p>

                {/* CTAs — matching Hero CTA style */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://foundlab-ati.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
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
                <img
                  src="/images/gemini-guard-main.jpg"
                  alt={t.photoCaption1}
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
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
      <div className="relative bg-navy-950 py-20 lg:py-28 border-t border-slate-200 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{t.archEyebrow}</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 text-balance">
                {t.archTitle}
              </h3>
              <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto text-pretty">
                {t.archSubtitle}
              </p>
            </div>
          </motion.div>

          {/* Pipeline steps — same border style as ROI card interior */}
          <div className="grid grid-cols-1 md:grid-cols-5 border border-navy-800">
            {t.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`relative p-6 lg:p-8 flex flex-col group hover:bg-navy-900/60 transition-all duration-300 ${
                  idx < t.steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-navy-800' : ''
                }`}
              >
                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold uppercase tracking-[0.1em] text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {step.label}
                </h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed mt-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Cryptographic output — matches FoundLab Console pattern */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 border border-navy-800 bg-navy-900/50 max-w-3xl mx-auto overflow-hidden"
          >
            {/* Toolbar */}
            <div className="bg-navy-900 border-b border-navy-800 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Fingerprint className="w-3.5 h-3.5 text-gold-500/60" />
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{t.hashTitle}</span>
              </div>
            </div>
            <div className="p-6 md:p-8 font-mono text-xs md:text-sm space-y-2">
              <p>
                <span className="text-gold-500/80">{'hash(input)'}</span>
                <span className="text-slate-700 mx-2">{':'}</span>
                <span className="text-slate-400">{'0xa1b3c5d7e9f0...c9d0e1f2a3b4'}</span>
              </p>
              <p>
                <span className="text-gold-500/80">{'hash(output)'}</span>
                <span className="text-slate-700 mx-2">{':'}</span>
                <span className="text-slate-400">{'0x3f7a9b1d4e6c...8b2c4d6e0f1a'}</span>
              </p>
              <p>
                <span className="text-gold-500/80">{'hash(policy)'}</span>
                <span className="text-slate-700 mx-2">{':'}</span>
                <span className="text-slate-400">{'0x9e0d2b4a6c8f...1a5b7c3d9e0f'}</span>
              </p>
              <div className="border-t border-navy-800 pt-3 mt-3">
                <p>
                  <span className="text-emerald-500/80">{'signature'}</span>
                  <span className="text-slate-700 mx-2">{':'}</span>
                  <span className="text-slate-600 break-all">
                    {'MEUCIQDf3...YnRz9wIgK8m2h...verified=true'}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ====== PART 3: DIFFERENTIALS — WHITE (matches WhitepaperSection) ====== */}
      <div className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Eyebrow + Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
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
                    className="relative p-8 lg:p-12 flex flex-col"
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

      {/* ====== PART 4: COMPLIANCE BADGES + BOOTH IMAGE ====== */}
      <div className="relative py-16 lg:py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Badge bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">{t.complianceTitle}</span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {t.badges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 min-h-[44px]"
                >
                  <Shield className="w-3.5 h-3.5 text-navy-900/40" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-navy-900">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booth photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative border border-slate-200 bg-white shadow-xl overflow-hidden"
          >
            <img
              src="/images/foundlab-booth.jpg"
              alt={t.boothCaption}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6 md:p-8 pt-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                    {t.boothCaption}
                  </p>
                  <p className="text-xs text-slate-500 font-light">
                    Powered by Google Cloud
                  </p>
                </div>
                <a
                  href="https://foundlab-ati.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-navy-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm self-start md:self-auto min-h-[48px]"
                >
                  {t.cta1}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GeminiGuardSection;
