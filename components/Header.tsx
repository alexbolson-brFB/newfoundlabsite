import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import PrivateOfferModal from './PrivateOfferModal';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [privateOfferOpen, setPrivateOfferOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Section Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' } // Trigger when section is in middle of viewport
    );

    let observedElements = new Set();

    const observeSections = () => {
      const sections = document.querySelectorAll('section[id], footer[id]');
      sections.forEach((section) => {
        if (!observedElements.has(section)) {
          observer.observe(section);
          observedElements.add(section);
        }
      });
    };

    observeSections();

    // Check periodically for lazy-loaded sections instead of a heavy MutationObserver
    const intervalId = setInterval(observeSections, 1000);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Gemini Guard', hash: '#gemini-guard' },
    { label: t.nav.paradox, hash: '#the-paradox' },
    { label: t.nav.enclave, hash: '#tech-stack' },
    { label: t.nav.architecture, hash: '#architecture' },
    { label: t.nav.roi, hash: '#roi-case-study' },
    { label: t.nav.marketplace, hash: '#marketplace' }
  ];

  const handleNav = (hash: string) => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const triggerCommandMenu = () => {
    window.dispatchEvent(new CustomEvent('open-command-menu'));
    setMenuOpen(false);
  };

  const LangSwitch = ({ variant }: { variant: 'desktop' | 'mobile' }) => (
    <button
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      className={`relative group flex items-center justify-center gap-2 transition-all overflow-hidden ${
        variant === 'desktop' 
          ? 'h-full px-6 hover:bg-slate-50' 
          : 'h-10 border border-slate-200 rounded-sm px-3 w-full hover:border-gold-400/50'
      }`}
    >
       <div className="flex items-center gap-1.5 z-10">
         <span className={`text-[11px] font-bold font-mono uppercase tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-navy-900' : 'text-slate-400 group-hover:text-slate-500'}`}>EN</span>
         <span className="text-slate-300 text-[11px] font-light">/</span>
         <span className={`text-[11px] font-bold font-mono uppercase tracking-widest transition-colors duration-300 ${language === 'pt' ? 'text-navy-900' : 'text-slate-400 group-hover:text-slate-500'}`}>PT</span>
       </div>
       
       {/* Active Indicator Underline */}
       <span className={`absolute bottom-0 left-0 h-[2px] bg-gold-400 transition-all duration-300 ease-out
          ${language === 'en' ? 'w-1/2 translate-x-0' : 'w-1/2 translate-x-full'}
          ${variant === 'desktop' ? 'block' : 'hidden'}
       `} />
    </button>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-slate-200/60 shadow-sm supports-[backdrop-filter]:bg-white/80'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 md:h-20 flex items-stretch">
        
        {/* Logo Cell */}
        <div className="flex-shrink-0 flex items-center px-6 md:px-10 border-r border-slate-200 bg-white gap-6">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center"
          >
            <Logo className="w-8 h-8" />
          </Link>
        </div>

        {/* Desktop Nav Grid */}
        <div className="hidden lg:flex flex-1 items-stretch justify-end">
            <nav className="flex items-stretch divide-x divide-slate-200 border-l border-slate-200">
                {navLinks.map((item) => (
                <button
                    key={item.label}
                    onClick={() => handleNav(item.hash)}
                    className={`flex items-center px-6 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors relative group min-h-[44px] ${
                      activeSection === item.hash ? 'text-navy-900' : 'text-slate-500 hover:text-navy-900 hover:bg-slate-50'
                    }`}
                    aria-current={activeSection === item.hash ? 'true' : undefined}
                >
                    {item.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-gold-500 transition-transform duration-300 origin-center ${
                        activeSection === item.hash ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                </button>
                ))}
            </nav>
            
            <div className="flex items-stretch divide-x divide-slate-200 border-l border-slate-200">
                 {/* Command Trigger */}
                 <button
                    onClick={triggerCommandMenu}
                    className="flex items-center justify-center px-6 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 transition-colors group"
                    title="Command Interface (Cmd+K)"
                 >
                    <Terminal className="w-4 h-4" />
                 </button>

                 {/* Lang Switch */}
                 <LangSwitch variant="desktop" />
                 
                 {/* CTA */}
                 <div className="flex items-center px-6">
                    <motion.button
                        onClick={() => setPrivateOfferOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-navy-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-navy-800 transition-all border border-navy-900"
                    >
                        {t.nav.privateOffer}
                        <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                 </div>
            </div>
        </div>

        {/* Mobile Header Right */}
        <div className="flex lg:hidden flex-1 items-center justify-end px-4 gap-4">
             <button
                onClick={triggerCommandMenu}
                className="p-3 text-slate-500 hover:text-navy-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open command menu"
              >
                <Terminal className="w-5 h-5" />
              </button>
             <button
                onClick={() => setMenuOpen(true)}
                className="p-3 text-navy-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Open menu"
             >
                <Menu className="w-6 h-6" />
             </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col h-full border-l border-slate-200"
            >
              {/* Mobile Menu Header */}
              <div className="h-20 flex items-center justify-between px-8 border-b border-slate-200">
                <span className="text-xs font-bold tracking-[0.4em] text-navy-900 uppercase">
                    Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-navy-900 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 overflow-y-auto py-8 px-8 space-y-8">
                 {/* Badges Integration for Mobile Menu */}
                 <div className="flex justify-center gap-6 pb-6 border-b border-slate-100">
                    <img 
                        src="/google_select_badge.png" 
                        alt="Google Cloud Select" 
                        className="h-10 w-auto object-contain"
                    />
                    <img 
                        src="/GCP_partner_badge.svg" 
                        alt="Google Cloud Technology Partner" 
                        className="h-8 w-auto object-contain opacity-80"
                    />
                 </div>

                 <div className="flex flex-col gap-0 divide-y divide-slate-100 border-y border-slate-100">
                    {navLinks.map((item) => (
                        <button
                        key={item.hash}
                        onClick={() => handleNav(item.hash)}
                        className="py-5 text-sm font-serif font-medium text-navy-900 hover:text-gold-600 transition-colors flex items-center justify-between group"
                        >
                        {item.label}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-500" />
                        </button>
                    ))}
                 </div>

                 <div className="space-y-6 pt-6">
                    <LangSwitch variant="mobile" />
                    
                    <motion.button
                        onClick={() => {
                            setMenuOpen(false);
                            setPrivateOfferOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-navy-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-navy-800 transition-all border border-navy-900"
                    >
                        {t.nav.privateOffer}
                        <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                 </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-8 border-t border-slate-200 bg-slate-50">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700">System Operational</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-mono">FoundLab Infrastructure v2.4</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <PrivateOfferModal isOpen={privateOfferOpen} onClose={() => setPrivateOfferOpen(false)} />
    </header>
  );
};

export default Header;
