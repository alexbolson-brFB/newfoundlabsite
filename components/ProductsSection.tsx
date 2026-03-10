import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Shield,
  BrainCircuit,
  FileSearch,
  Gem,
  Filter,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Locale = 'en' | 'pt';

interface Product {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  tag: string;
  tagline: string;
  body: string;
  image?: string;
  proof?: string;
  proofLabel?: string;
  icon: React.ElementType;
  accentClass: string;        // Tailwind text colour
  accentBg: string;           // Tailwind bg for pill
  accentBorder: string;       // Tailwind border for pill
}

/* ------------------------------------------------------------------ */
/*  Copy                                                               */
/* ------------------------------------------------------------------ */
const productsCopy: Record<Locale, Omit<Product, 'id' | 'index' | 'icon' | 'accentClass' | 'accentBg' | 'accentBorder'>[]> = {
  en: [
    {
      name: 'ATI',
      subtitle: 'Auditable Trust Infrastructure',
      tag: 'Tier-1 Banks',
      tagline: 'The Zero-Persistence core.',
      body: 'ATI is the central pillar for Tier-1 banking institutions. It delivers the Zero-Persistence nucleus that resolves the Retention Paradox and justifies critical infrastructure valuations. In production, ATI demonstrated the ability to reduce Shadow IT incident response from 21 hours to just 16 minutes — mitigating liabilities exceeding $20M.',
      image: '/foundlab_ati.png',
      proof: '16 min',
      proofLabel: 'Incident response (from 21h)',
    },
    {
      name: 'REX',
      subtitle: 'Sovereign Reasoning Extraction',
      tag: 'AI & Operations',
      tagline: 'Decisions with proof, not faith.',
      body: 'The REX engine orchestrates advanced language models over sensitive data with zero exposure. It generates natural-language justifications for every AI decision — enabling real-time audit without data exfiltration. REX is essential for sectors where algorithmic black-boxes are regulatorily unacceptable.',
      image: '/hero_visual.png',
    },
    {
      name: 'VEX-OS',
      subtitle: 'Audit Operating System',
      tag: 'Big 4 & Internal Audit',
      tagline: 'Compliance visible to any auditor.',
      body: 'VEX-OS is the control interface for Big 4 firms and internal audit teams. It translates Veritas Protocol technical logs into comprehensible reports — transforming audit from a cost centre into a strategic partner in compliance validation.',
    },
    {
      name: 'Rex Guard Gemini',
      subtitle: 'Gemini Governance Layer',
      tag: 'Google Cloud · BCB 538',
      tagline: 'Native compliance for Vertex AI.',
      body: 'Specialised in governing Google Gemini-based infrastructure, this module ensures native compliance with BCB 538/2025. It acts as an interdiction layer that prevents sensitive data from leaking into public models — maintaining latency below 20ms.',
      proof: '<20 ms',
      proofLabel: 'Inference latency guarantee',
    },
    {
      name: 'Spezzatura',
      subtitle: 'The Signal Filter',
      tag: 'Acceleration Programmes',
      tagline: 'Separates real AI from AI washing.',
      body: 'Spezzatura operates at the ecosystem edge, validating the technical authenticity of AI startups in corporate acceleration programmes. It prevents AI Washing — ensuring only technologies with robust fundamentals are integrated into core infrastructure, creating a qualified lead pipeline for the FoundLab suite.',
    },
    {
      name: 'Umbrella',
      subtitle: 'Unified Compliance Platform',
      tag: 'C-Suite · CIO · CISO · CRO',
      tagline: 'One dashboard. Full governance.',
      body: 'The Umbrella platform unifies all modules, delivering a holistic view of compliance and computational trust. It serves as the central dashboard for C-level executives — consolidating evidence, risk scores, and regulatory coverage in a single interface integrated with the Google Cloud ecosystem.',
    },
  ],
  pt: [
    {
      name: 'ATI',
      subtitle: 'Auditable Trust Infrastructure',
      tag: 'Bancos Tier-1',
      tagline: 'O núcleo Zero-Persistência.',
      body: 'O ATI é o pilar central para instituições bancárias Tier-1. Ele provê o núcleo de Zero-Persistence que resolve o Paradoxo da Retenção e justifica valuations de infraestrutura crítica. Em implementações reais, o ATI demonstrou a capacidade de reduzir o tempo de resposta a incidentes de Shadow IT de 21 horas para apenas 16 minutos, mitigando passivos que poderiam ultrapassar US$ 20 milhões.',
      image: '/foundlab_ati.png',
      proof: '16 min',
      proofLabel: 'Resposta a incidente (de 21h)',
    },
    {
      name: 'REX',
      subtitle: 'Sovereign Reasoning Extraction',
      tag: 'IA & Operações',
      tagline: 'Decisões com prova, não fé.',
      body: 'O motor REX orquestra modelos de linguagem avançados sobre dados sensíveis com exposição zero. Ele gera justificativas em linguagem natural para cada decisão da IA, permitindo auditoria em tempo real sem exfiltração de dados. O REX é essencial para a adoção de IA em setores onde a "caixa-preta" dos algoritmos é inaceitável para o regulador.',
      image: '/hero_visual.png',
    },
    {
      name: 'VEX-OS',
      subtitle: 'Audit Operating System',
      tag: 'Big 4 & Auditoria Interna',
      tagline: 'Compliance visível para qualquer auditor.',
      body: 'O VEX-OS é a interface de controle para as Big 4 e auditores internos. Ele transforma logs técnicos do Protocolo Veritas em relatórios compreensíveis, permitindo que a auditoria deixe de ser um centro de custo e se torne parceiro estratégico na validação de conformidade.',
    },
    {
      name: 'Rex Guard Gemini',
      subtitle: 'Camada de Governança Gemini',
      tag: 'Google Cloud · BCB 538',
      tagline: 'Compliance nativo para Vertex AI.',
      body: 'Especializado na governança de infraestrutura baseada no Google Gemini, este módulo garante conformidade nativa com a Resolução BCB 538/2025. Ele atua como camada de interdição que impede o vazamento de dados sensíveis para modelos públicos, mantendo a latência abaixo de 20ms.',
      proof: '<20 ms',
      proofLabel: 'Garantia de latência de inferência',
    },
    {
      name: 'Spezzatura',
      subtitle: 'The Signal Filter',
      tag: 'Programas de Aceleração',
      tagline: 'Separa IA real de AI Washing.',
      body: 'O Spezzatura atua na borda do ecossistema, validando a autenticidade técnica de startups de IA em programas de aceleração corporativa. Ele previne o "AI Washing", garantindo que apenas tecnologias com fundamentos robustos sejam integradas à infraestrutura principal, criando um pipeline de leads qualificados para os outros produtos da FoundLab.',
    },
    {
      name: 'Umbrella',
      subtitle: 'Plataforma Unificada de Compliance',
      tag: 'C-Suite · CIO · CISO · CRO',
      tagline: 'Um dashboard. Governança total.',
      body: 'A plataforma Umbrella unifica todos os módulos, provendo uma visão holística da conformidade e da confiança computacional. Ela serve como o dashboard central para C-levels (CIO, CISO, CRO), consolidando evidências e pontuações de risco em uma interface integrada ao ecossistema Google Cloud.',
    },
  ],
};

const sectionCopy: Record<Locale, { eyebrow: string; title: string; subtitle: string }> = {
  en: {
    eyebrow: 'Product Suite',
    title: 'Six modules.\nOne architecture.',
    subtitle:
      'Each product solves a distinct compliance and trust challenge. Together, they form a closed loop that no single point-solution can replicate.',
  },
  pt: {
    eyebrow: 'Suite de Produtos',
    title: 'Seis módulos.\nUma arquitetura.',
    subtitle:
      'Cada produto resolve um desafio distinto de compliance e confiança. Juntos, formam um loop fechado que nenhuma solução pontual consegue replicar.',
  },
};

const icons: React.ElementType[] = [
  Shield,
  BrainCircuit,
  FileSearch,
  Gem,
  Filter,
  LayoutDashboard,
];

// Per-product accent — stays within Navy/Gold/Slate palette but adds variance
const accents = [
  { accentClass: 'text-gold-500',   accentBg: 'bg-amber-50',   accentBorder: 'border-amber-200'  },
  { accentClass: 'text-emerald-600', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-200' },
  { accentClass: 'text-sky-600',     accentBg: 'bg-sky-50',     accentBorder: 'border-sky-200'    },
  { accentClass: 'text-indigo-600',  accentBg: 'bg-indigo-50',  accentBorder: 'border-indigo-200' },
  { accentClass: 'text-violet-600',  accentBg: 'bg-violet-50',  accentBorder: 'border-violet-200' },
  { accentClass: 'text-navy-900',    accentBg: 'bg-slate-100',  accentBorder: 'border-slate-300'  },
];

/* ------------------------------------------------------------------ */
/*  ProductCard — full-bleed panel for one product                     */
/* ------------------------------------------------------------------ */
const ProductCard: React.FC<{ product: Product; isActive: boolean }> = ({ product, isActive }) => {
  const Icon = product.icon;

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: isActive ? 1 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        zIndex: isActive ? 10 : 0
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-hidden={!isActive}
      className="absolute inset-0 flex flex-col justify-between p-10 lg:p-14 bg-white"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        {/* Index */}
        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
          {String(product.index + 1).padStart(2, '0')} / 06
        </span>
        {/* Tag pill */}
        <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 border rounded-sm ${product.accentBg} ${product.accentBorder} ${product.accentClass}`}>
          {product.tag}
        </span>
      </div>

      {/* Centre block */}
      <div className="flex-1 flex flex-col justify-center gap-6 py-10">
        {/* Icon */}
        <div className={`w-12 h-12 flex items-center justify-center border ${product.accentBorder} bg-white`}>
          <Icon className={`w-6 h-6 ${product.accentClass}`} />
        </div>

        {/* Name + subtitle */}
        <div>
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-navy-900 leading-none tracking-tight mb-2">
            {product.name}
          </h3>
          <p className="text-sm font-mono uppercase tracking-widest text-slate-500">
            {product.subtitle}
          </p>
        </div>

        {/* Tagline */}
        <p className={`font-serif text-xl md:text-2xl italic font-light ${product.accentClass}`}>
          {product.tagline}
        </p>

        {/* Body */}
        <p className="text-slate-600 text-base md:text-lg font-light leading-relaxed max-w-xl">
          {product.body}
        </p>
      </div>

      {/* Right side Image block */}
      {product.image && (
        <div className="hidden lg:flex absolute top-1/2 right-0 -translate-y-1/2 w-[55%] h-[90%] items-center justify-center pointer-events-none z-0">
          <motion.img 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain object-right opacity-95 drop-shadow-2xl" 
          />
        </div>
      )}

      {/* Bottom row — proof metric + divider */}
      <div className="border-t border-slate-200 pt-8 flex items-end justify-between gap-6">
        {product.proof ? (
          <div>
            <p className={`font-serif text-4xl font-medium ${product.accentClass}`}>
              {product.proof}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 mt-1">
              {product.proofLabel}
            </p>
          </div>
        ) : (
          <div />
        )}
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-900 hover:text-gold-500 transition-colors group"
        >
          Request access
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  ProductsSection — sticky scroll container                          */
/* ------------------------------------------------------------------ */
const ProductsSection: React.FC = () => {
  const { language } = useLanguage();
  const locale: Locale = language === 'pt' ? 'pt' : 'en';
  const sc = sectionCopy[locale];

  const products = React.useMemo(() => {
    return productsCopy[locale].map((p, i) => ({
      ...p,
      // Stabilize ID by removing non-ascii characters for DOM safety. 
      // Fixed regex from 0-p to 0-9.
      id: p.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, ''),
      index: i,
      icon: icons[i],
      ...accents[i],
    })) as Product[];
  }, [locale]);

  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Deterministic segment mapping: [0, 1] divided by products.length
      const segment = 1 / products.length;
      const index = Math.floor(v / segment);
      setActiveIndex(Math.min(products.length - 1, Math.max(0, index)));
    });
    return unsubscribe;
  }, [scrollYProgress, products.length]);

  const progressBarHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  );

  const scrollToProduct = (index: number) => {
    if (!sectionRef.current) return;
    
    // Always use absolute document coordinates to avoid jumping out of the section
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = sectionRef.current.offsetHeight;
    const vh = window.innerHeight;
    
    // scrollYProgress maps [0,1] over (sectionHeight - vh), not sectionHeight.
    const scrollRange = sectionHeight - vh;
    
    // Target the midpoint of segment index: (index + 0.5) / products.length
    const targetProgress = (index + 0.5) / products.length;
    const targetScroll = sectionTop + targetProgress * scrollRange;
    
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      // 600vh = 100vh per product. This drives the sticky scroll.
      className="relative"
      style={{ height: `${products.length * 100}vh` }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-white border-t border-slate-200">

        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Gold ambient glow — follows active product accent */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/4 blur-[100px]" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[280px_1fr] gap-0">

          {/* ── Left: Section header + nav pills ── */}
          <div className="hidden lg:flex flex-col justify-between py-14 border-r border-slate-200 pr-10">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                  {sc.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-3xl text-navy-900 leading-tight whitespace-pre-line mb-4">
                {sc.title}
              </h2>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                {sc.subtitle}
              </p>
            </div>

            {/* Product nav list */}
            <nav className="flex flex-col gap-1" role="tablist" aria-label="Product selection">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  id={`product-tab-${p.id}`}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls="product-panel"
                  onClick={() => scrollToProduct(i)}
                  className={`group flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 rounded-sm ${
                    activeIndex === i
                      ? 'bg-navy-900 text-white'
                      : 'text-slate-500 hover:text-navy-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${activeIndex === i ? 'text-gold-400' : 'text-slate-400'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]">
                    {p.name}
                  </span>
                </button>
              ))}
            </nav>

            {/* Progress bar */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-slate-200">
              <motion.div
                className="w-full bg-gold-500 origin-top"
                style={{ height: progressBarHeight }}
              />
            </div>
          </div>

          {/* ── Right: Product card stage ── */}
          <div 
            className="relative h-full overflow-hidden bg-white" 
            id="product-panel" 
            role="tabpanel" 
            aria-labelledby={products[activeIndex] ? `product-tab-${products[activeIndex].id}` : undefined}
          >
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={activeIndex === i}
              />
            ))}

            {/* Mobile: dot nav */}
            <div className="lg:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
              {products.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to product ${i + 1}`}
                  onClick={() => scrollToProduct(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-8 bg-navy-900' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
