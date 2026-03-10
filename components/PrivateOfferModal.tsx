import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, X, Server, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivateOfferModal: React.FC<PrivateOfferModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'validating' | 'granted' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) return;
    
    setStatus('validating');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: 'private-offer',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Submission failed');
      }

      setStatus('granted');
    } catch (err) {
      console.error('Private offer submission error:', err);
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-navy-925 border border-slate-800 rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-gold-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Private Access Protocol</span>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-8">
                {status === 'idle' && (
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                <Server className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="text-white font-serif text-2xl mb-2">{t.privateOffer.title}</h3>
                            <p className="text-slate-500 text-sm">{t.privateOffer.desc}</p>
                        </div>

                        <div className="space-y-4">
                            <input 
                                type="email" 
                                placeholder={t.privateOffer.emailPlaceholder}
                                className="w-full bg-slate-900/50 border border-slate-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm font-mono placeholder:text-slate-600"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                            <button 
                                type="submit"
                                className="w-full bg-gold-600 text-navy-950 font-bold uppercase tracking-widest text-[10px] py-3 hover:bg-gold-500 transition-colors rounded-sm flex items-center justify-center gap-2"
                            >
                                {t.privateOffer.submitBtn} <ArrowRight className="w-3 h-3" />
                            </button>
                            <p className="text-[10px] text-slate-500 leading-tight mt-4 border-t border-slate-800 pt-4">
                                {t.privateOffer.disclaimer}
                            </p>
                        </div>
                    </form>
                )}

                {status === 'validating' && (
                    <div className="text-center py-8">
                        <div className="inline-block relative w-16 h-16 mb-6">
                            <div className="absolute inset-0 border-t-2 border-gold-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-r-2 border-slate-700 rounded-full animate-spin-reverse"></div>
                        </div>
                        <div className="font-mono text-xs text-gold-500 uppercase tracking-widest animate-pulse">
                            {t.privateOffer.validating.title}
                        </div>
                        <div className="mt-2 text-[10px] text-slate-600 font-mono">
                           {t.privateOffer.validating.desc}
                        </div>
                    </div>
                )}

                {status === 'granted' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-white font-serif text-xl mb-2">{t.privateOffer.success.title}</h3>
                        <p className="text-emerald-500/80 font-mono text-xs mb-6 uppercase tracking-widest">{t.privateOffer.success.desc}</p>
                        <p className="text-slate-500 text-sm">{t.privateOffer.success.checkEmail}</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                            <X className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-white font-serif text-xl mb-2">Submission Failed</h3>
                        <p className="text-red-400/80 font-mono text-xs mb-6">{errorMsg}</p>
                        <button
                            onClick={() => { setStatus('idle'); setErrorMsg(''); }}
                            className="text-[10px] font-bold uppercase tracking-widest text-gold-500 hover:text-gold-400 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
            
            {/* Footer Status */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between text-[9px] text-slate-600 font-mono uppercase tracking-wider">
                <span>Encryption: RSA-4096</span>
                <span>FoundLab™</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivateOfferModal;
