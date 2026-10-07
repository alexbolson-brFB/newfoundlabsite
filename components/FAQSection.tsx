import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const faqData = t.faq;

  // Track currently open item index (default first item open)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  if (!faqData) return null;

  return (
    <section 
      id="faq" 
      className="scroll-mt-24 py-20 lg:py-28 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Block */}
          <div className="mb-12 md:mb-16 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-5 shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900 font-sans">
                {faqData.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-serif text-3xl md:text-5xl text-navy-900 leading-[1.1] tracking-tight mb-4"
            >
              {faqData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-base md:text-lg font-light leading-relaxed text-pretty max-w-3xl"
            >
              {faqData.subtitle}
            </motion.p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-3.5">
          {faqData.items.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const buttonId = `faq-trigger-${index}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`border transition-all duration-300 bg-white ${
                  isOpen 
                    ? 'border-slate-300 shadow-md ring-1 ring-gold-400/20' 
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(index)}
                  className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs bg-slate-100 text-slate-600 border border-slate-200/60">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg md:text-xl text-navy-900 font-medium leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div 
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? 'bg-navy-900 text-white rotate-180 border-navy-900' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 md:px-8 md:pb-7 border-t border-slate-100 text-slate-600 font-light text-sm md:text-base leading-relaxed text-pretty">
                        <div className="pl-3 border-l-2 border-gold-400">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

          {/* Footer Support Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 md:mt-12 p-6 md:p-8 border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-navy-900">
                <ShieldCheck className="w-4 h-4 text-navy-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900">
                  {faqData.supportPrompt.question}
                </p>
                <p className="text-xs text-slate-500 font-light">
                  {t.faq.eyebrow} · REX Guard
                </p>
              </div>
            </div>

            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2 px-5 py-3 bg-navy-900 text-white text-[11px] font-bold uppercase tracking-[0.16em] rounded-xs hover:bg-navy-800 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>{faqData.supportPrompt.action}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
