import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SocialProofSection: React.FC = () => {
  const { t } = useLanguage();
  const sp = (t as any).socialProof;
  if (!sp) return null;

  const stats = sp.stats as { value: string; label: string }[];
  const testimonials = sp.testimonials as { quote: string; author: string; role: string; org: string }[];
  const badges = sp.badges as string[];

  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Badge Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
              {sp.eyebrow}
            </span>
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy-900 tracking-tight mb-4 text-balance">
            {sp.title}
          </h2>
          <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl mx-auto text-pretty">
            {sp.subtitle}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200 border border-slate-200 bg-white mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 md:p-10 text-center"
            >
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-navy-900 mb-2">
                {stat.value}
              </span>
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-0 border border-slate-200 bg-white mb-16">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 md:p-12 flex flex-col justify-between ${
                i === 0 ? 'border-b md:border-b-0 md:border-r border-slate-200' : ''
              }`}
            >
              <div>
                <Quote className="w-5 h-5 text-gold-500 mb-6" />
                <blockquote className="text-navy-900 font-serif text-lg md:text-xl leading-relaxed mb-8 italic">
                  {`"${item.quote}"`}
                </blockquote>
              </div>
              <div className="border-t border-slate-200 pt-6">
                <p className="text-sm font-medium text-navy-900">{item.author}</p>
                <p className="text-xs text-slate-500 mt-1">{item.role}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gold-600 mt-2">
                  {item.org}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-slate-200 bg-slate-50 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 flex-wrap">
            {badges.map((badge, i) => {
              const icons = [Shield, Lock, Zap, Shield];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-sm"
                >
                  <Icon className="w-4 h-4 text-navy-900" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-navy-900">
                    {badge}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
