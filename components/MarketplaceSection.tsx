import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Landmark, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PrivateOfferModal from './PrivateOfferModal';

// Safe image imports
import googlePartnerLogo from '../images/google_select_badge.png'; // Fallback
import partner2RpLogo from '../images/logo2rp.svg';

const localCardImages: Record<string, string> = {
  googlepartner: '/google_select_badge.png' // Using the file from public folder directly
};

const MarketplaceSection: React.FC = () => {
  const { t } = useLanguage();
  const [privateOfferOpen, setPrivateOfferOpen] = useState(false);
  
  if (!t?.marketplace) return null;
  const cards = t.marketplace.cards || [];

  const buildImageUrl = (base: string | undefined, width: number) => {
    if (!base) return '';
    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}auto=format&fit=crop&w=${width}&q=80`;
  };

  const getImageSources = (base: string | undefined) => {
    if (!base) return { src: '', srcSet: undefined };
    
    if (base.startsWith('local:')) {
      const key = base.replace('local:', '');
      return {
        src: localCardImages[key] ?? '',
        srcSet: undefined
      };
    }
    return {
      src: buildImageUrl(base, 900),
      srcSet: `
        ${buildImageUrl(base, 600)} 600w,
        ${buildImageUrl(base, 900)} 900w
      `
    };
  };

  // Calculator State
  const [budget, setBudget] = useState(100000); // Default $100k

  const formatCurrency = (val: number) => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val || 0);
    } catch (e) {
        return '$0';
    }
  };

  return (
    <section id="marketplace" className="py-24 lg:py-32 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
            <div 
              className="inline-flex items-center justify-center gap-3 py-1 px-4 border border-slate-200 rounded-full bg-white shadow-sm mb-8"
            >
                <Landmark className="w-3 h-3 text-navy-900" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                  {t.marketplace.badge}
                </span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-navy-900 mb-8 tracking-tight">
                {t.marketplace.title}
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed mx-auto font-light">
                {t.marketplace.subtitle}
            </p>
        </div>

        {/* The CUDs Calculator (Interactive Alchemy) */}
        <div className="max-w-5xl mx-auto mb-32">
            <div className="bg-white border border-slate-200 shadow-2xl p-0 relative overflow-hidden group">
                {/* Header Bar */}
                <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-navy-900">
                        <Calculator className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Cost Estimator</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        
                        {/* Input Side */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="api-budget-input" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-4 font-mono">
                                Monthly API Budget (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-serif text-slate-300">$</span>
                                <input 
                                    id="api-budget-input"
                                    type="number" 
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="w-full bg-transparent border-b-2 border-slate-200 text-4xl md:text-5xl font-serif text-navy-900 focus:outline-none focus:border-gold-500 transition-colors py-2 pl-8"
                                />
                            </div>
                            <input 
                                type="range" 
                                min="1000" 
                                max="1000000" 
                                step="1000"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                className="w-full mt-8 accent-navy-900 cursor-pointer"
                                aria-label="Monthly API Budget Range"
                            />
                        </div>

                        {/* Arrow Divider */}
                        <div className="hidden md:flex items-center justify-center">
                             <div className="w-px h-24 bg-slate-200"></div>
                        </div>

                        {/* Output Side */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                             <div className="inline-block px-3 py-1 bg-gold-50 text-gold-700 text-[10px] font-bold uppercase tracking-widest mb-4 border border-gold-100 rounded-sm">
                                 Est. Monthly Savings
                             </div>
                             <div 
                                className="text-5xl md:text-7xl font-serif font-bold text-navy-900 mb-2 transition-all duration-300"
                             >
                                {formatCurrency(budget * 0.45)}
                             </div>
                             <div className="flex flex-col gap-1 text-[10px] font-mono text-slate-600 mt-4 uppercase tracking-wider">
                                <div className="flex justify-between md:justify-start gap-4 border-b border-slate-100 pb-1">
                                    <span>CUD Abatement (30%):</span>
                                    <span className="text-navy-900">{formatCurrency(budget * 0.30)}</span>
                                </div>
                                <div className="flex justify-between md:justify-start gap-4">
                                    <span>OpEx Optimization (15%):</span>
                                    <span className="text-navy-900">{formatCurrency(budget * 0.15)}</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Grid of Partners - Rigid Catalog Style */}
        <div>
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 font-mono">Certified Integration Modules</span>
                <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-slate-200 bg-white shadow-sm">
                {cards.map((card, idx) => (
                    <div 
                        key={idx}
                        className={`
                            group relative p-8 md:p-12 flex flex-col items-center text-center transition-colors duration-500
                            border-b border-r border-slate-200
                            ${(idx + 1) % 3 === 0 ? 'lg:border-r-0' : ''}
                            ${(idx + 1) % 2 === 0 ? 'md:border-r-0 lg:border-r' : ''}
                            bg-slate-50 md:bg-white md:hover:bg-slate-50
                        `}
                    >
                         {/* Accent Line - Always visible on mobile, hover on desktop */}
                         <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-500 scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                         <div className="mb-8 h-16 flex items-center justify-center">
                            {/* Logo Placeholder logic */}
                            {card.image?.base && (card.image.base.startsWith('local:') || card.image.base.includes('unsplash')) ? (
                                <img 
                                    {...getImageSources(card.image.base)}
                                    alt={card.image.alt || card.title} 
                                    width={160}
                                    height={40}
                                    className="h-10 w-auto object-contain transition-all duration-500 
                                      filter grayscale-0 opacity-100 md:grayscale md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100" 
                                    loading="lazy"
                                />
                            ) : (
                                <div className="text-2xl font-serif transition-colors
                                  text-navy-900 md:text-slate-400 md:group-hover:text-navy-900">{card.title}</div>
                            )}
                         </div>

                         <h3 className="text-lg font-serif text-navy-900 mb-3 transition-colors
                           text-gold-600 md:text-navy-900 md:group-hover:text-gold-600">
                            {card.title}
                         </h3>
                         <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">
                            {card.desc}
                         </p>

                         <button 
                            onClick={() => setPrivateOfferOpen(true)}
                            className="mt-auto text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-colors
                              text-navy-900 md:text-slate-600 md:group-hover:text-navy-900"
                         >
                            View Module <ArrowRight className="w-3 h-3" />
                         </button>
                    </div>
                ))}
            </div>
        </div>

      </div>
      <PrivateOfferModal isOpen={privateOfferOpen} onClose={() => setPrivateOfferOpen(false)} />
    </section>
  );
};

export default MarketplaceSection;
