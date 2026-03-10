import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import { STATIC_PAGE_ROUTES } from '../routes/pageRoutes';
import KillSwitchOverlay from './KillSwitchOverlay';
import { AlertOctagon } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [killSwitchActive, setKillSwitchActive] = useState(false);

  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-200 text-slate-600 relative">
      <KillSwitchOverlay isOpen={killSwitchActive} onComplete={() => setKillSwitchActive(false)} />
      
      <div className="max-w-7xl mx-auto border-x border-slate-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Brand Column */}
          <div className="col-span-1 p-8 md:p-12 flex flex-col justify-between h-full">
            <div>
              <div className="mb-8">
                <Logo className="w-8 h-8" classNameText="text-navy-900 text-lg" />
              </div>
              <p className="text-xs leading-relaxed text-slate-500 max-w-xs font-light">
                {t.footer.desc}
              </p>
            </div>
            
            <div className="mt-12">
               <button 
                 onClick={() => setKillSwitchActive(true)}
                 className="group relative flex items-center gap-3 px-4 py-3 border border-red-900/30 bg-red-950/5 hover:bg-red-900/10 rounded-sm transition-all duration-300 overflow-hidden min-h-[44px]"
                 aria-label="Simulate Zero-Persistence Protocol Kill Switch"
                 title="Simulate Zero-Persistence Protocol"
               >
                  <div className="absolute inset-0 bg-red-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 blur-lg" />
                  <AlertOctagon className="w-4 h-4 text-red-700 group-hover:text-red-500 transition-colors animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-red-800 group-hover:text-red-600 transition-colors">
                    Initialize Kill Switch
                  </span>
               </button>
            </div>
          </div>
          
          {/* Platform Links */}
          <div className="p-8 md:p-12">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900 mb-8">{t.footer.headers.platform}</h4>
            <ul className="space-y-4 text-xs font-medium text-slate-500">
                <li><a href="#architecture" className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.arch}</a></li>
                <li><a href="#the-paradox" className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.proto}</a></li>
                <li><a href="#marketplace" className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.market}</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="p-8 md:p-12">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900 mb-8">{t.footer.headers.company}</h4>
            <ul className="space-y-4 text-xs font-medium text-slate-500">
                <li><Link to={STATIC_PAGE_ROUTES.about} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.about}</Link></li>
                <li><Link to={STATIC_PAGE_ROUTES.careers} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.careers}</Link></li>
                <li><Link to={STATIC_PAGE_ROUTES.contact} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.contact}</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="p-8 md:p-12">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900 mb-8">{t.footer.headers.legal}</h4>
            <ul className="space-y-4 text-xs font-medium text-slate-500">
                <li><Link to={STATIC_PAGE_ROUTES.privacy} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.privacy}</Link></li>
                <li><Link to={STATIC_PAGE_ROUTES.terms} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.terms}</Link></li>
                <li><Link to={STATIC_PAGE_ROUTES.sla} className="hover:text-navy-900 hover:translate-x-1 transition-all duration-300 block py-1">{t.footer.links.sla}</Link></li>
            </ul>
          </div>
        </div>

        {/* Metadata Grid: System Status & Info */}
        <div className="border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Copyright */}
          <div className="p-4 md:px-8 flex items-center justify-center md:justify-start bg-slate-50/50">
            <p className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              © {new Date().getFullYear()} {t.footer.rights}
            </p>
          </div>

          {/* System Status Indicator */}
          <div className="p-4 flex items-center justify-center bg-white group cursor-default">
             <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/50 group-hover:border-emerald-200 group-hover:bg-emerald-100/50 transition-all duration-500 shadow-sm group-hover:shadow-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-bold group-hover:text-emerald-800 transition-colors">
                  All Systems Operational
                </span>
             </div>
          </div>

          {/* Location */}
          <div className="p-4 md:px-8 flex items-center justify-center md:justify-end bg-slate-50/50">
            <p className="font-mono text-[11px] text-slate-600 uppercase tracking-wider">
              {t.footer.locations}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
