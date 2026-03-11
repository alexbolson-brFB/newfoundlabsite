import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Clock, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CASE_STUDY_URL = 'https://irelia0nerf.github.io/Studycase/';
const RoiSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="roi-case-study" className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
               <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600">
                 {t.roi.eyebrow}
               </span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-navy-900 leading-[1.05] tracking-tight mb-8">
                {t.roi.title}
            </h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed mb-8">
                {t.roi.subtitle}
            </p>
            <a
              href={CASE_STUDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-navy-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-navy-800 transition-all shadow-lg group"
            >
              <FileText className="w-4 h-4" />
              {language === 'pt' ? 'Ver Estudo de Caso Completo' : 'View Full Case Study'}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: The Metrics - Rigid Report Style */}
            <div className="lg:col-span-4 space-y-0 border border-slate-200 bg-white shadow-sm">
                <div className="p-8 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <ShieldAlert className="w-5 h-5" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{t.roi.incident.label}</span>
                    </div>
                    <p className="text-navy-900 font-serif text-lg leading-relaxed">
                        "{t.roi.incident.desc}"
                    </p>
                </div>

                <div className="grid grid-cols-1 divide-y divide-slate-200">
                    <div className="p-8">
                        <div className="text-5xl md:text-6xl font-serif text-navy-900 font-bold tracking-tight mb-2">
                            {t.roi.metrics.saved}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-mono">
                            {t.roi.metrics.savedLabel}
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="text-5xl md:text-6xl font-serif text-emerald-600 font-bold tracking-tight mb-2">
                            {t.roi.metrics.reduction}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-mono">
                            {t.roi.metrics.reductionLabel}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: The Timeline Visualization - Technical Graph */}
            <div className="lg:col-span-8">
                <div className="bg-navy-950 border border-navy-800 p-10 md:p-14 rounded-sm shadow-2xl relative overflow-hidden">
                    
                    {/* Background Grid inside card */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-white font-serif text-2xl flex items-center gap-3">
                                <Clock className="w-6 h-6 text-gold-500" />
                                {t.roi.timeline.label}
                            </h3>
                            <div className="px-2 py-1 border border-white/10 text-[10px] text-white/50 uppercase tracking-widest font-mono">
                                Data: Incident_Log_2024
                            </div>
                        </div>

                        {/* Bar 1: Legacy */}
                        <div className="mb-10 group">
                            <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest mb-3 font-mono">
                                <span>Legacy Process</span>
                                <span className="text-red-400 group-hover:text-red-300 transition-colors">{t.roi.timeline.legacy}</span>
                            </div>
                            <div className="h-10 bg-navy-900 w-full relative overflow-hidden border border-navy-700">
                                {/* The Red Bar */}
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute inset-y-0 left-0 bg-red-900/80 border-r border-red-500"
                                />
                                {/* Striped pattern overlay */}
                                <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjZ2dn/gwgpTqyAgICA/wEAqqwI4Z9/2i4AAAAASUVORK5CYII=')] opacity-20"></div>
                            </div>
                        </div>

                        {/* Bar 2: FoundLab */}
                        <div className="group">
                            <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest mb-3 font-mono">
                                <span className="text-white">FoundLab Protocol</span>
                                <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">{t.roi.timeline.foundlab}</span>
                            </div>
                            <div className="h-10 bg-navy-900 w-full relative overflow-hidden border border-navy-700">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "1%" }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                    className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-500/80 font-mono uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                Near-Instant Resolution
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default RoiSection;
