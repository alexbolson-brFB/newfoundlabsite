import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const WhitepaperSection: React.FC = () => {
  const { t } = useLanguage();
  const highlights = t.whitepaper.highlights;
  const meta = t.whitepaper.meta;

  return (
    <section id="whitepaper" className="relative py-24 lg:py-32 bg-white overflow-hidden border-t border-slate-200">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                {t.whitepaper.badge}
              </span>
            </div>
            <a 
              href="/whitepaper.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-navy-900 leading-tight mb-4 group-hover:text-gold-600 transition-colors">
                {t.whitepaper.title}
              </h2>
            </a>
            <p className="text-slate-600 text-lg leading-relaxed font-light">{t.whitepaper.subtitle}</p>
          </motion.div>

          {/* Technical Document Container */}
          <div className="border border-slate-200 bg-white shadow-xl">
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                  
                  {/* Highlights Column */}
                  <motion.div
                      className="lg:col-span-7 p-10 md:p-14"
                      initial={{ opacity: 0, x: -25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                  >
                      <div className="space-y-6 mb-12">
                      {highlights.map((item, idx) => (
                          <div key={idx} className="flex gap-4 group">
                          <div className="mt-1.5 w-1.5 h-1.5 bg-slate-300 group-hover:bg-gold-500 transition-colors" />
                          <p className="text-slate-600 leading-relaxed font-light group-hover:text-navy-900 transition-colors">{item}</p>
                          </div>
                      ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                      <a
                          href="/whitepaper.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-all"
                      >
                          {t.whitepaper.ctaPrimary}
                      </a>
                      <a
                          href="#contact"
                          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-300 text-navy-900 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm transition-colors"
                      >
                          {t.whitepaper.ctaSecondary}
                      </a>
                      </div>
                  </motion.div>

                  {/* Meta Data Column */}
                  <motion.div
                      className="lg:col-span-5 bg-slate-50 p-10 md:p-14"
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                  >
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-8 border-b border-slate-200 pb-4">
                          {t.whitepaper.detailsLabel}
                      </p>
                      <ul className="space-y-0 divide-y divide-slate-200 border-b border-slate-200">
                          {meta.map((item) => (
                          <li key={item.label} className="py-4 flex justify-between items-center group">
                              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">{item.label}</span>
                              <span className="text-base font-serif text-navy-900 font-medium group-hover:text-gold-600 transition-colors">{item.value}</span>
                          </li>
                          ))}
                      </ul>
                      
                      <div className="mt-8 p-4 bg-white border border-slate-200 text-[10px] text-slate-400 font-mono leading-relaxed">
                          <span className="block mb-2 font-bold text-slate-500 uppercase tracking-wider">Abstract ID:</span>
                          SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                      </div>
                  </motion.div>
              </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhitepaperSection;
