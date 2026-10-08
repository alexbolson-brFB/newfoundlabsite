import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingDown,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Lock,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const KpiMetricsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'metrics' | 'comparison'>('metrics');
  const [expandedMethodology, setExpandedMethodology] = useState<string | null>(null);

  const kpis = t.kpis;
  const isPt = language === 'pt';

  const toggleMethodology = (id: string) => {
    setExpandedMethodology(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="kpis"
      className="scroll-mt-24 py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-100"
    >
      {/* Background subtle architectural grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-slate-200 bg-slate-50 text-[11px] font-mono uppercase tracking-widest text-slate-700 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{kpis.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy-950 font-serif leading-[1.15]">
              {kpis.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
              {kpis.subtitle}
            </p>
          </div>

          {/* Interactive Mode & Cluster Telemetry Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex rounded border border-slate-200 p-0.5 bg-slate-50 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`px-3 py-1.5 rounded transition-all duration-200 ${
                  activeTab === 'metrics'
                    ? 'bg-white text-navy-950 font-semibold shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {kpis.viewModes.metrics}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('comparison')}
                className={`px-3 py-1.5 rounded transition-all duration-200 ${
                  activeTab === 'comparison'
                    ? 'bg-white text-navy-950 font-semibold shadow-xs border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {kpis.viewModes.comparison}
              </button>
            </div>
          </div>
        </div>

        {/* Primary Data Visualization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* KPI 1: Reduction in compliance time */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col justify-between border border-slate-200/90 rounded-sm bg-white p-6 md:p-8 hover:border-slate-300 transition-colors duration-200 shadow-xs"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {kpis.items.compliance.tag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 font-medium">
                  {kpis.items.compliance.unit}
                </span>
              </div>

              {/* Stat Highlight */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 font-mono">
                    {kpis.items.compliance.metric}
                  </span>
                  <TrendingDown className="w-6 h-6 text-emerald-600 self-center" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-2">
                  {kpis.items.compliance.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {kpis.items.compliance.highlight}
                </p>
              </div>

              {/* Data Visualization: Investigation Duration Timeline Benchmark */}
              <div className="my-6 p-4 rounded bg-slate-50/80 border border-slate-200/70 space-y-3">
                <div className="text-[11px] font-mono font-medium text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>{isPt ? 'Linha do Tempo de Auditoria' : 'Audit Inquiry Timeline'}</span>
                  <span className="text-emerald-700 font-semibold">{isPt ? 'Ganho: 99.9%' : '99.9% Faster'}</span>
                </div>

                {/* Legacy Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-slate-600">
                    <span className="text-slate-500">{isPt ? 'Auditoria Legada Manual' : 'Legacy Forensics'}</span>
                    <span className="font-semibold text-slate-700">336h (14 {isPt ? 'dias' : 'days'})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* FoundLab REX Guard Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-navy-950">
                    <span className="font-medium text-blue-900 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
                      REX Guard Proof
                    </span>
                    <span className="font-bold text-emerald-700">&lt; 2.5s ({isPt ? 'instantâneo' : 'instant'})</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '2.5%' }} />
                  </div>
                </div>

                {/* Mini Metric Breakdown */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{isPt ? 'Tempo Médio para Evidência' : 'Mean Time to Evidence'}:</span>
                  <span className="font-semibold text-slate-800">2.41s</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {kpis.items.compliance.description}
              </p>
            </div>

            {/* Methodology Drawer / Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => toggleMethodology('compliance')}
                className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-navy-900 transition-colors py-1 group"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  {kpis.methodologyButton}
                </span>
                {expandedMethodology === 'compliance' ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedMethodology === 'compliance' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-600 bg-slate-50/70 p-3 rounded"
                  >
                    <p className="mb-2 font-medium text-slate-700">{isPt ? 'Metodologia:' : 'Methodology:'}</p>
                    <p className="leading-relaxed">{kpis.items.compliance.methodology}</p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                      Baseline: {kpis.items.compliance.baseline}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* KPI 2: Unauthorized action prevention */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-col justify-between border border-slate-200/90 rounded-sm bg-white p-6 md:p-8 hover:border-slate-300 transition-colors duration-200 shadow-xs"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  {kpis.items.prevention.tag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                  {kpis.items.prevention.unit}
                </span>
              </div>

              {/* Stat Highlight */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 font-mono">
                    {kpis.items.prevention.metric}
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 self-center" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-2">
                  {kpis.items.prevention.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {kpis.items.prevention.highlight}
                </p>
              </div>

              {/* Data Visualization: Attack Vector Interception Matrix */}
              <div className="my-6 p-4 rounded bg-slate-50/80 border border-slate-200/70 space-y-2.5">
                <div className="text-[11px] font-mono font-medium text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>{isPt ? 'Vetor de Ataque / Risco' : 'Interception Matrix'}</span>
                  <span className="text-emerald-700 font-semibold">{isPt ? '0 Bypasses' : '0 Bypasses'}</span>
                </div>

                {/* Vectors */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">{isPt ? 'Injeção Indireta de Prompt' : 'Prompt Injection Vectors'}</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> 100% {isPt ? 'Bloqueado' : 'Blocked'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">{isPt ? 'Escalada de Privilégios de Agente' : 'Privilege Escalation'}</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> 100% {isPt ? 'Bloqueado' : 'Blocked'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">{isPt ? 'Chamadas Fora de Escopo' : 'Out-of-Scope Tool Calls'}</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> 100% Fail-Closed
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{isPt ? 'Ações downstream violadas' : 'Downstream breaches'}:</span>
                  <span className="font-bold text-emerald-700">0 (Zero)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {kpis.items.prevention.description}
              </p>
            </div>

            {/* Methodology Drawer / Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => toggleMethodology('prevention')}
                className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-navy-900 transition-colors py-1 group"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  {kpis.methodologyButton}
                </span>
                {expandedMethodology === 'prevention' ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedMethodology === 'prevention' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-600 bg-slate-50/70 p-3 rounded"
                  >
                    <p className="mb-2 font-medium text-slate-700">{isPt ? 'Metodologia:' : 'Methodology:'}</p>
                    <p className="leading-relaxed">{kpis.items.prevention.methodology}</p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                      Baseline: {kpis.items.prevention.baseline}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* KPI 3: Scale of handled transactions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-col justify-between border border-slate-200/90 rounded-sm bg-white p-6 md:p-8 hover:border-slate-300 transition-colors duration-200 shadow-xs md:col-span-2 lg:col-span-1"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <span className="text-[11px] font-mono tracking-wider uppercase text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  {kpis.items.scale.tag}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-medium">
                  {kpis.items.scale.unit}
                </span>
              </div>

              {/* Stat Highlight */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 font-mono">
                    {kpis.items.scale.metric}
                  </span>
                  <Zap className="w-6 h-6 text-amber-500 self-center" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-2">
                  {kpis.items.scale.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {kpis.items.scale.highlight}
                </p>
              </div>

              {/* Data Visualization: Latency vs Volume Distribution */}
              <div className="my-6 p-4 rounded bg-slate-50/80 border border-slate-200/70 space-y-3">
                <div className="text-[11px] font-mono font-medium text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>{isPt ? 'Overhead de Latência em Produção' : 'Runtime Latency Profile'}</span>
                  <span className="text-indigo-700 font-semibold">&lt; 12ms p99</span>
                </div>

                {/* Sub-12ms metric bars */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 bg-white rounded border border-slate-200/80">
                    <span className="block text-[10px] font-mono uppercase text-slate-500">p50 Latency</span>
                    <span className="text-lg font-bold font-mono text-navy-950">8.4 ms</span>
                    <span className="block text-[10px] text-emerald-600 font-mono mt-0.5">Ultra-low</span>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-slate-200/80">
                    <span className="block text-[10px] font-mono uppercase text-slate-500">p99 Latency</span>
                    <span className="text-lg font-bold font-mono text-navy-950">11.8 ms</span>
                    <span className="block text-[10px] text-slate-600 font-mono mt-0.5">Sub-boundary</span>
                  </div>
                </div>

                {/* Workload distribution strip */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>{isPt ? 'Setores Críticos Protegidos' : 'Protected Domains'}</span>
                    <span>99.995% SLA</span>
                  </div>
                  <div className="w-full flex h-2 rounded-full overflow-hidden bg-slate-200">
                    <div className="bg-blue-600 h-full" style={{ width: '42%' }} title="Banking & Payments (42%)" />
                    <div className="bg-indigo-600 h-full" style={{ width: '28%' }} title="Healthcare & Records (28%)" />
                    <div className="bg-amber-600 h-full" style={{ width: '18%' }} title="Insurance Claims (18%)" />
                    <div className="bg-emerald-600 h-full" style={{ width: '12%' }} title="Enterprise SaaS (12%)" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Banking (42%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" /> Health (28%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Insur. (18%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {kpis.items.scale.description}
              </p>
            </div>

            {/* Methodology Drawer / Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => toggleMethodology('scale')}
                className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-navy-900 transition-colors py-1 group"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  {kpis.methodologyButton}
                </span>
                {expandedMethodology === 'scale' ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedMethodology === 'scale' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden mt-3 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-600 bg-slate-50/70 p-3 rounded"
                  >
                    <p className="mb-2 font-medium text-slate-700">{isPt ? 'Metodologia:' : 'Methodology:'}</p>
                    <p className="leading-relaxed">{kpis.items.scale.methodology}</p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500">
                      Baseline: {kpis.items.scale.baseline}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* Comparison Table View (activeTab === 'comparison') */}
        <AnimatePresence>
          {activeTab === 'comparison' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden rounded-sm border border-slate-200 bg-white"
            >
              <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-navy-950">
                  {isPt ? 'Benchmark Comparativo: Abordagem Tradicional vs. REX Guard' : 'Benchmark: Legacy Approaches vs. REX Guard ATI'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {kpis.liveBadge}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/40 text-slate-500">
                      <th className="py-3 px-6 font-semibold uppercase tracking-wider">{isPt ? 'Dimensão de Governança' : 'Governance Dimension'}</th>
                      <th className="py-3 px-6 font-semibold uppercase tracking-wider text-slate-500">{isPt ? 'Abordagem Legada (LLM / Guardrails)' : 'Legacy LLM Guardrails'}</th>
                      <th className="py-3 px-6 font-semibold uppercase tracking-wider text-navy-950 bg-blue-50/40">{isPt ? 'FoundLab REX Guard' : 'FoundLab REX Guard'}</th>
                      <th className="py-3 px-6 font-semibold uppercase tracking-wider text-emerald-700">{isPt ? 'Impacto Quantificado' : 'Quantified Impact'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-900">{kpis.items.compliance.label}</td>
                      <td className="py-4 px-6 text-slate-600">{kpis.items.compliance.baseline}</td>
                      <td className="py-4 px-6 font-semibold text-blue-950 bg-blue-50/30">{kpis.items.compliance.foundlab}</td>
                      <td className="py-4 px-6 font-bold text-emerald-700">-88% MTTE (horas → segundos)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-900">{kpis.items.prevention.label}</td>
                      <td className="py-4 px-6 text-slate-600">{kpis.items.prevention.baseline}</td>
                      <td className="py-4 px-6 font-semibold text-blue-950 bg-blue-50/30">{kpis.items.prevention.foundlab}</td>
                      <td className="py-4 px-6 font-bold text-emerald-700">100% Interceptação (0 bypass)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-900">{kpis.items.scale.label}</td>
                      <td className="py-4 px-6 text-slate-600">{kpis.items.scale.baseline}</td>
                      <td className="py-4 px-6 font-semibold text-blue-950 bg-blue-50/30">{kpis.items.scale.foundlab}</td>
                      <td className="py-4 px-6 font-bold text-emerald-700">p99 &lt; 12ms / 2.4B+ ações/mês</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-slate-900">{kpis.items.accuracy.label}</td>
                      <td className="py-4 px-6 text-slate-600">{kpis.items.accuracy.baseline}</td>
                      <td className="py-4 px-6 font-semibold text-blue-950 bg-blue-50/30">{kpis.items.accuracy.foundlab}</td>
                      <td className="py-4 px-6 font-bold text-emerald-700">&lt; 0.001% falso-positivo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Provenance Strip */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{kpis.provenanceNotice}</span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-navy-900 hover:text-blue-700 font-semibold transition-colors shrink-0"
          >
            <span>{isPt ? 'Auditar no seu ambiente' : 'Benchmark your workload'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default KpiMetricsSection;
