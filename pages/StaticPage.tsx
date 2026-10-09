import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { StaticPageKey } from '../routes/pageRoutes';
import { motion } from 'framer-motion';

interface StaticPageProps {
  pageKey: StaticPageKey;
}

const StaticPage: React.FC<StaticPageProps> = ({ pageKey }) => {
  const { t } = useLanguage();
  const content = t.pages[pageKey];
  const isLegal = pageKey === 'privacy' || pageKey === 'terms' || pageKey === 'sla';
  const category = isLegal ? t.footer.headers.legal : t.footer.headers.company;

  useEffect(() => {
    const baseUrl = 'https://www.foundlab.com.br';
    const canonicalUrl = `${baseUrl}${window.location.pathname}`;
    const title = `${content.title} | FoundLab`;
    const description = content.description;
    document.title = title;

    const setMeta = (selector: string, attribute: 'name' | 'property', value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.match(/\"([^\"]+)\"/)?.[1] || '');
        document.head.appendChild(element);
      }
      element.content = value;
    };
    const setLink = (rel: string, href: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel=\"${rel}\"]`);
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    setMeta('meta[name=\"description\"]', 'name', description);
    setMeta('meta[property=\"og:title\"]', 'property', title);
    setMeta('meta[property=\"og:description\"]', 'property', description);
    setMeta('meta[property=\"og:url\"]', 'property', canonicalUrl);
    setLink('canonical', canonicalUrl);

    return () => {
      document.title = 'FoundLab | Auditable Trust Infrastructure';
      setLink('canonical', `${baseUrl}/`);
    };
  }, [content.description, content.title]);

  return (
    <section className="min-h-screen bg-slate-50 pt-28 md:pt-32 pb-20 md:pb-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Header Block - Rigid Style */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 md:p-16 mb-8 shadow-sm">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-slate-300"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        {category} / {pageKey.toUpperCase()}
                    </span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl text-navy-900 mb-6 tracking-tight">
                    {content.title}
                </h1>
                <p className="text-xl text-slate-600 font-light max-w-3xl leading-relaxed border-l-2 border-gold-500 pl-6">
                    {content.description}
                </p>
            </motion.div>
        </div>

        {/* Content Block - Document Style */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Body Text */}
            <motion.div 
              className="lg:col-span-9 bg-white border border-slate-200 p-6 sm:p-8 md:p-16 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div className="prose prose-slate prose-lg max-w-none">
                    {content.body.map((paragraph, index) => (
                        <p key={index} className="text-slate-600 font-light leading-8 mb-6 last:mb-0">
                            {paragraph}
                        </p>
                    ))}
                </div>
                
                {/* Signature / Footer of Document */}
                <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                    <div className="font-serif italic text-slate-400 text-lg">FoundLab Infrastructure</div>
                    <div className="w-12 h-12 border border-slate-200 rounded-full flex items-center justify-center opacity-50">
                        <div className="w-8 h-8 border border-slate-300 rounded-full"></div>
                    </div>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StaticPage;
