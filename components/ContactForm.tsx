import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Mail, Building2, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const cf = (t as any).contactForm;
  if (!cf) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) return;
    if (!email.includes('@') || !email.includes('.')) return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message, type: 'contact' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <section id="contact-form" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-5 gap-0 border border-slate-200 bg-white shadow-xl">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 bg-navy-900 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-navy-800 border border-slate-700 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {cf.badge}
                </span>
              </span>

              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
                {cf.title}
              </h2>
              <p className="text-slate-400 text-base font-light leading-relaxed mb-10">
                {cf.subtitle}
              </p>

              <div className="space-y-6">
                {cf.channels.map((ch: { label: string; value: string }, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-1">{ch.label}</p>
                      <a href={`mailto:${ch.value}`} className="text-sm text-white hover:text-gold-400 transition-colors">
                        {ch.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-700">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-600">
                {cf.responseTime}
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 p-8 md:p-12">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-serif text-2xl text-navy-900 mb-3">{cf.success.title}</h3>
                <p className="text-slate-500 text-sm max-w-sm">{cf.success.desc}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900 hover:text-gold-600 transition-colors"
                >
                  {cf.success.another}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">
                      <User className="w-3 h-3" />
                      {cf.fields.name} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-200 text-navy-900 px-4 py-3 text-base focus:outline-none focus:border-navy-900 transition-colors rounded-sm bg-slate-50 placeholder:text-slate-400"
                      placeholder={cf.placeholders.name}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">
                      <Mail className="w-3 h-3" />
                      {cf.fields.email} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200 text-navy-900 px-4 py-3 text-base focus:outline-none focus:border-navy-900 transition-colors rounded-sm bg-slate-50 placeholder:text-slate-400"
                      placeholder={cf.placeholders.email}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">
                    <Building2 className="w-3 h-3" />
                    {cf.fields.company}
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border border-slate-200 text-navy-900 px-4 py-3 text-base focus:outline-none focus:border-navy-900 transition-colors rounded-sm bg-slate-50 placeholder:text-slate-400"
                    placeholder={cf.placeholders.company}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-3">
                    <MessageSquare className="w-3 h-3" />
                    {cf.fields.message} *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-slate-200 text-navy-900 px-4 py-3 text-base focus:outline-none focus:border-navy-900 transition-colors rounded-sm bg-slate-50 placeholder:text-slate-400 resize-none"
                    placeholder={cf.placeholders.message}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg || cf.error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-navy-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {cf.submitting}
                    </>
                  ) : (
                    <>
                      {cf.submit}
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
