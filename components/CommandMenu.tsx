
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, Monitor, FileText, Globe, X, Cpu, ShieldAlert, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CommandMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [query, setQuery] = useState("");

  // Toggle Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for custom event from Navbar
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener('open-command-menu', openHandler);
    return () => window.removeEventListener('open-command-menu', openHandler);
  }, []);

  // Actions
  const handleNav = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleLang = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
    setIsOpen(false);
  };

  const menuItems = [
    {
      category: "Navigation",
      items: [
        { icon: Monitor, label: t.nav.paradox, action: () => handleNav('#the-paradox') },
        { icon: Cpu, label: t.nav.architecture, action: () => handleNav('#architecture') },
        { icon: ShieldAlert, label: t.nav.enclave, action: () => handleNav('#tech-stack') },
        { icon: FileText, label: t.nav.roi, action: () => handleNav('#roi-case-study') },
      ]
    },
    {
      category: "System",
      items: [
        { icon: Globe, label: `Switch Language (${language === 'en' ? 'PT' : 'EN'})`, action: handleLang },
      ]
    }
  ];

  // Filter items based on query
  const filteredItems = menuItems.map(section => ({
    ...section,
    items: section.items.filter(item => 
      (item.label || "").toLowerCase().includes(query.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-2xl bg-navy-925 border border-slate-700 rounded-lg shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Input */}
            <div className="flex items-center px-4 py-4 border-b border-slate-800">
              <Command className="w-5 h-5 text-slate-500 mr-3" />
              <input 
                type="text" 
                placeholder="Guardian Interface... (Type to search)"
                className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 font-mono text-sm h-6"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 bg-slate-800 text-[10px] rounded text-slate-400 font-mono uppercase tracking-wider hover:bg-slate-700 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                 <div className="p-8 text-center text-slate-500 font-mono text-sm">
                   No commands found.
                 </div>
              ) : (
                filteredItems.map((section, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      {section.category}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item, i) => (
                        <button
                          key={i}
                          onClick={item.action}
                          className="w-full flex items-center justify-between px-3 py-3 rounded-md hover:bg-navy-900/50 group transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-sm bg-slate-900 text-slate-400 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <span className="text-sm text-slate-300 font-light group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-gold-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Status */}
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                SYSTEM NORMAL
              </div>
              <div className="flex gap-4">
                 <span>CPU: 12%</span>
                 <span>MEM: 41%</span>
                 <span>NIM: ACTIVE</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
