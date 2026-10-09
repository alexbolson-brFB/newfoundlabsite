import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  Search,
  Monitor,
  Cpu,
  ShieldCheck,
  FileText,
  Terminal,
  Building2,
  HelpCircle,
  Send,
  Globe,
  ArrowRight,
  CornerDownLeft,
  Briefcase,
  Shield,
  FileCode,
  ArrowUp,
  X,
  Layers,
  Sparkles,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { STATIC_PAGE_ROUTES } from '../routes/pageRoutes';

type ItemCategory = 'section' | 'page' | 'action';

interface CommandItem {
  id: string;
  category: ItemCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
  keywords: string[];
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

const CommandMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'section' | 'page' | 'action'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isPt = language === 'pt';

  // Toggle & Open Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
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

  useEffect(() => {
    const openHandler = () => {
      setIsOpen(true);
      setQuery('');
      setActiveTab('all');
    };
    window.addEventListener('open-command-menu', openHandler);
    return () => window.removeEventListener('open-command-menu', openHandler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      setQuery('');
      setActiveTab('all');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Navigation Helpers
  const handleNavSection = (hash: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', hash);
      }
    } else {
      navigate(`/${hash}`);
    }
  };

  const handleNavPage = (route: string) => {
    setIsOpen(false);
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLangToggle = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
    setIsOpen(false);
  };

  const handleScrollTop = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Canonical Command Items
  const items: CommandItem[] = useMemo(() => {
    return [
      // === Main Page Sections ===
      {
        id: 'sec-rex-guard',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'REX Guard · Visão Geral do Produto' : 'REX Guard · Product Overview',
        subtitle: isPt 
          ? 'Auditable Trust Infrastructure: verificação de autoridade e políticas determinísticas em runtime.'
          : 'Auditable Trust Infrastructure: runtime authority verification and deterministic policy enforcement.',
        badge: '#rex-guard',
        keywords: ['rex guard', 'produto', 'product', 'ati', 'autoridade', 'authority', 'overview', 'visao geral', 'guardrails', 'runtime'],
        icon: ShieldCheck,
        action: () => handleNavSection('#rex-guard'),
        shortcut: 'G P'
      },
      {
        id: 'sec-authority-gap',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'O Paradoxo da Autoridade (Authority Gap)' : 'The Authority Gap Paradox',
        subtitle: isPt
          ? 'Identidade não é autoridade. Uma proposta plausível de IA não concede permissão institucional.'
          : 'Identity is not authority. Plausible AI proposals do not confer institutional permission.',
        badge: '#authority-gap',
        keywords: ['paradoxo', 'paradox', 'gap', 'autoridade', 'authority', 'identidade', 'identity', 'erasure', 'retention', 'pressure cards'],
        icon: Monitor,
        action: () => handleNavSection('#authority-gap'),
        shortcut: 'G A'
      },
      {
        id: 'sec-how-it-works',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Como Funciona (Pipeline de Execução)' : 'How It Works (Execution Pipeline)',
        subtitle: isPt
          ? 'Intenção → Autoridade → Política → Execução → Evidência verificável.'
          : 'Intent → Authority → Policy → Execution → Verifiable Signed Evidence.',
        badge: '#how-it-works',
        keywords: ['como funciona', 'how it works', 'pipeline', 'fluxo', 'workflow', 'intencao', 'politica', 'policy', 'regras', 'rules'],
        icon: Layers,
        action: () => handleNavSection('#how-it-works'),
        shortcut: 'G H'
      },
      {
        id: 'sec-architecture',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Arquitetura e Módulos do Sistema' : 'Architecture & System Modules',
        subtitle: isPt
          ? 'Camadas da infraestrutura, adaptadores protegidos e motores de política.'
          : 'Infrastructure layers, protected downstream adapters, and policy engines.',
        badge: '#architecture',
        keywords: ['arquitetura', 'architecture', 'modulos', 'engines', 'adapters', 'infra', 'specs', 'sistemas'],
        icon: Cpu,
        action: () => handleNavSection('#architecture'),
        shortcut: 'G M'
      },
      {
        id: 'sec-evidence',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Terminal Interativo e Evidência Assinada' : 'Interactive Terminal & Signed Evidence',
        subtitle: isPt
          ? 'Demonstração ilustrativa de logs, DecisionID e resultado de autorização.'
          : 'Illustrative execution logs, DecisionID, and authorization outcome records.',
        badge: '#evidence',
        keywords: ['terminal', 'evidencia', 'evidence', 'logs', 'assinatura', 'signature', 'decision id', 'console', 'bash', 'auditoria'],
        icon: Terminal,
        action: () => handleNavSection('#evidence'),
        shortcut: 'G T'
      },
      {
        id: 'sec-enterprise',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Avaliação Enterprise' : 'Enterprise Evaluation',
        subtitle: isPt
          ? 'Integração, fronteiras de execução, isolamento e requisitos operacionais para ambientes enterprise.'
          : 'Integration, execution boundaries, isolation, and operational requirements for enterprise environments.',
        badge: '#enterprise',
        keywords: ['enterprise', 'corporativo', 'escala', 'scale', 'isolamento', 'isolation', 'performance', 'kpi'],
        icon: Building2,
        action: () => handleNavSection('#enterprise'),
        shortcut: 'G E'
      },
      {
        id: 'sec-kpis',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Métricas e KPIs Enterprise' : 'Enterprise KPIs & Data Visualization',
        subtitle: isPt
          ? 'Indicadores quantificados: -88% tempo de compliance, 100% prevenção de ações indevidas e 2.4B+ transações.'
          : 'Quantified metrics: -88% compliance time, 100% unauthorized action prevention, and 2.4B+ transactions.',
        badge: '#kpis',
        keywords: ['kpi', 'metricas', 'metrics', 'compliance', 'tempo', 'prevencao', 'unauthorized', 'transacoes', 'escala', 'data visualization', 'benchmark', 'desempenho'],
        icon: BarChart3,
        action: () => handleNavSection('#kpis'),
        shortcut: 'G K'
      },
      {
        id: 'sec-faq',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Perguntas Frequentes (FAQ)' : 'Frequently Asked Questions (FAQ)',
        subtitle: isPt
          ? 'Respostas sobre arquitetura, integração, autoridade em runtime e evidência do REX Guard.'
          : 'Answers on architecture, integration, runtime authority, and REX Guard evidence.',
        badge: '#faq',
        keywords: ['faq', 'perguntas', 'duvidas', 'questions', 'answers', 'ajuda', 'suporte', 'compliance'],
        icon: HelpCircle,
        action: () => handleNavSection('#faq'),
        shortcut: 'G F'
      },
      {
        id: 'sec-contact',
        category: 'section',
        categoryLabel: isPt ? 'Seção Principal' : 'Main Section',
        title: isPt ? 'Solicitar Avaliação Técnica (Contato)' : 'Request Technical Evaluation (Contact)',
        subtitle: isPt
          ? 'Formulário direto para avaliação técnica de REX Guard e validação de casos de uso.'
          : 'Direct form to evaluate REX Guard and validate institutional AI use cases.',
        badge: '#contact-form',
        keywords: ['contato', 'contact', 'avaliacao', 'evaluation', 'formulario', 'form', 'briefing', 'demo', 'email'],
        icon: Send,
        action: () => handleNavSection('#contact-form'),
        shortcut: 'G C'
      },

      // === Static Pages & Documentation ===
      {
        id: 'page-about',
        category: 'page',
        categoryLabel: isPt ? 'Página Institucional' : 'Company Page',
        title: isPt ? 'Sobre a FoundLab' : 'About FoundLab',
        subtitle: isPt
          ? 'Missão, arquitetura de governança e origens da Auditable Trust Infrastructure.'
          : "FoundLab's mission, governance architecture, and origin of Auditable Trust Infrastructure.",
        badge: '/about',
        keywords: ['sobre', 'about', 'foundlab', 'empresa', 'company', 'missao', 'mission', 'equipe'],
        icon: BookOpen,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.about),
        shortcut: 'P A'
      },
      {
        id: 'page-careers',
        category: 'page',
        categoryLabel: isPt ? 'Página Institucional' : 'Company Page',
        title: isPt ? 'Carreiras na FoundLab' : 'Careers at FoundLab',
        subtitle: isPt
          ? 'Oportunidades em engenharia de sistemas confiáveis e segurança determinística.'
          : 'Engineering opportunities in high-assurance systems and deterministic security.',
        badge: '/careers',
        keywords: ['carreiras', 'careers', 'vagas', 'jobs', 'engenharia', 'trabalho', 'oportunidades'],
        icon: Briefcase,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.careers),
        shortcut: 'P C'
      },
      {
        id: 'page-contact',
        category: 'page',
        categoryLabel: isPt ? 'Página Institucional' : 'Company Page',
        title: isPt ? 'Canais de Contato Institucional' : 'Institutional Contact Channels',
        subtitle: isPt
          ? 'Endereços institucionais, parcerias e canal de segurança corporativa.'
          : 'Corporate channels, partner alliances, and security disclosures.',
        badge: '/contact',
        keywords: ['contato', 'contact', 'canais', 'email', 'institucional', 'sede', 'suporte'],
        icon: Send,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.contact),
        shortcut: 'P K'
      },
      {
        id: 'page-privacy',
        category: 'page',
        categoryLabel: isPt ? 'Página Legal' : 'Legal Page',
        title: isPt ? 'Política de Privacidade & LGPD' : 'Privacy Policy & LGPD',
        subtitle: isPt
          ? 'Diretrizes de privacidade e tratamento de dados descritas para o contexto aplicável.'
          : 'Privacy and data-handling guidance described for the applicable context.',
        badge: '/privacy',
        keywords: ['privacidade', 'privacy', 'lgpd', 'gdpr', 'dados', 'data', 'termos', 'seguranca'],
        icon: Shield,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.privacy),
        shortcut: 'P P'
      },
      {
        id: 'page-terms',
        category: 'page',
        categoryLabel: isPt ? 'Página Legal' : 'Legal Page',
        title: isPt ? 'Termos de Serviço Institucionais' : 'Institutional Terms of Service',
        subtitle: isPt
          ? 'Condições de uso da plataforma, licenças de tecnologia e diretrizes de governança.'
          : 'Terms of platform usage, software licensing, and operational governance.',
        badge: '/terms',
        keywords: ['termos', 'terms', 'servico', 'service', 'contrato', 'legal', 'licenca'],
        icon: FileCode,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.terms),
        shortcut: 'P T'
      },
      {
        id: 'page-sla',
        category: 'page',
        categoryLabel: isPt ? 'Página Legal' : 'Legal Page',
        title: isPt ? 'Acordo de Nível de Serviço (SLA Enterprise)' : 'Enterprise Service Level Agreement (SLA)',
        subtitle: isPt
          ? 'Metas operacionais, suporte e níveis de serviço definidos no contrato aplicável.'
          : 'Operational targets, support, and service levels defined in the applicable agreement.',
        badge: '/sla',
        keywords: ['sla', 'disponibilidade', 'uptime', 'suporte', 'contrato', 'latencia'],
        icon: FileText,
        action: () => handleNavPage(STATIC_PAGE_ROUTES.sla),
        shortcut: 'P S'
      },

      // === System Actions ===
      {
        id: 'act-language',
        category: 'action',
        categoryLabel: isPt ? 'Ação do Sistema' : 'System Action',
        title: isPt
          ? `Alternar Idioma para English (EN)`
          : `Switch Language to Português (PT)`,
        subtitle: isPt
          ? 'Muda instantaneamente todo o conteúdo do site para inglês.'
          : 'Instantly switches all site content and specifications to Portuguese.',
        badge: language === 'en' ? 'PT-BR' : 'EN-US',
        keywords: ['idioma', 'language', 'portugues', 'english', 'traducao', 'switch', 'lang'],
        icon: Globe,
        action: handleLangToggle,
        shortcut: 'Tab'
      },
      {
        id: 'act-scroll-top',
        category: 'action',
        categoryLabel: isPt ? 'Ação do Sistema' : 'System Action',
        title: isPt ? 'Voltar ao Topo da Página' : 'Scroll to Top of Page',
        subtitle: isPt
          ? 'Retorna suavemente para o cabeçalho inicial da página.'
          : 'Smoothly returns to the initial hero banner of the page.',
        badge: 'Top',
        keywords: ['topo', 'top', 'inicio', 'home', 'scroll', 'voltar', 'subir'],
        icon: ArrowUp,
        action: handleScrollTop,
        shortcut: 'Home'
      }
    ];
  }, [isPt, language, location.pathname]);

  // Filtering Logic
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      // Category filter
      if (activeTab !== 'all' && item.category !== activeTab) {
        return false;
      }

      // Query filter
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const subtitleMatch = item.subtitle.toLowerCase().includes(q);
      const badgeMatch = (item.badge || '').toLowerCase().includes(q);
      const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(q));

      return titleMatch || subtitleMatch || badgeMatch || keywordMatch;
    });
  }, [items, query, activeTab]);

  // Grouped results for clear category layout
  const groupedResults = useMemo(() => {
    const groups: { [key in ItemCategory]?: CommandItem[] } = {};
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category]!.push(item);
    });
    return groups;
  }, [filteredItems]);

  // Keyboard navigation across flat filtered items
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredItems[selectedIndex];
      if (target) {
        target.action();
      }
    }
  };

  // Keep active item in view
  useEffect(() => {
    const el = itemRefs.current[selectedIndex];
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const categoryLabels = {
    all: isPt ? 'Todos' : 'All',
    section: isPt ? 'Seções' : 'Sections',
    page: isPt ? 'Páginas' : 'Pages',
    action: isPt ? 'Ações' : 'Actions',
  };

  const categoryHeaders: Record<ItemCategory, string> = {
    section: isPt ? 'Seções da Página Principal (Quick Jump)' : 'Main Page Sections (Quick Jump)',
    page: isPt ? 'Páginas & Documentação' : 'Pages & Documentation',
    action: isPt ? 'Ações do Sistema' : 'System Actions'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] md:pt-[15vh] px-4 bg-navy-950/75 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, y: -16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-full max-w-2xl bg-navy-925 border border-slate-700/80 rounded-md shadow-2xl overflow-hidden relative flex flex-col max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Header: Search Input & Shortcuts */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-navy-900/60 gap-3">
              <Search className="w-4 h-4 text-gold-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isPt
                    ? "Buscar seções, páginas ou comandos... (ex: 'arquitetura', 'sla', 'evidência')"
                    : "Search sections, pages or commands... (e.g. 'architecture', 'sla', 'evidence')"
                }
                className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500 font-sans text-sm h-7"
                autoComplete="off"
                spellCheck={false}
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors"
                  title={isPt ? "Limpar busca" : "Clear search"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-0.5 bg-slate-800/90 border border-slate-700 text-[10px] rounded-xs text-slate-400 font-mono uppercase tracking-wider hover:bg-slate-700 hover:text-slate-200 transition-colors shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Tabs */}
            <div className="px-4 py-2 border-b border-slate-800/80 bg-navy-950/40 flex items-center justify-between gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                {(['all', 'section', 'page', 'action'] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-navy-800 text-gold-400 border border-gold-500/40 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {categoryLabels[tab]}
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono text-slate-500 shrink-0 hidden sm:inline-block">
                {filteredItems.length} {isPt ? 'itens' : 'items'}
              </span>
            </div>

            {/* List Results */}
            <div
              ref={listContainerRef}
              className="overflow-y-auto p-2.5 space-y-4 flex-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 px-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">
                    {isPt ? 'Nenhuma seção ou comando encontrado' : 'No sections or commands found'}
                  </p>
                  <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">
                    {isPt
                      ? 'Tente buscar por termos como "paradoxo", "pipeline", "sla", "contato" ou "idioma".'
                      : 'Try searching for terms like "paradox", "pipeline", "sla", "contact", or "language".'}
                  </p>
                </div>
              ) : (
                (['section', 'page', 'action'] as ItemCategory[]).map((cat) => {
                  const catItems = groupedResults[cat];
                  if (!catItems || catItems.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 font-mono flex items-center justify-between">
                        <span>{categoryHeaders[cat]}</span>
                        <span className="text-[9px] opacity-60">({catItems.length})</span>
                      </div>

                      {catItems.map((item) => {
                        const globalIndex = filteredItems.findIndex((fi) => fi.id === item.id);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.id}
                            ref={(el) => {
                              itemRefs.current[globalIndex] = el;
                            }}
                            type="button"
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-sm transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer border ${
                              isSelected
                                ? 'bg-navy-800/90 border-slate-600 shadow-sm text-white ring-1 ring-gold-500/30'
                                : 'border-transparent text-slate-300 hover:bg-navy-900/50 hover:text-white'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <div
                                className={`p-2 rounded-xs mt-0.5 shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-navy-900 text-gold-400 border border-gold-500/40'
                                    : 'bg-slate-900/80 text-slate-400 group-hover:text-slate-200 border border-slate-800'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>

                              <div className="min-w-0 flex-1 pr-2">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs md:text-sm font-medium font-sans truncate text-slate-100 group-hover:text-white">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-2xs bg-slate-900 border border-slate-700/80 text-slate-400 shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 font-light leading-snug line-clamp-1 group-hover:text-slate-300">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isSelected && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gold-400 bg-navy-900/90 px-1.5 py-0.5 rounded-2xs border border-gold-500/30">
                                  <span>{isPt ? 'Abrir' : 'Open'}</span>
                                  <CornerDownLeft className="w-3 h-3" />
                                </span>
                              )}
                              <ArrowRight
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                  isSelected
                                    ? 'text-gold-400 translate-x-0 opacity-100'
                                    : 'text-slate-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Console Bar */}
            <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-400 font-semibold uppercase tracking-wider">
                  {isPt ? 'Console REX Guard' : 'REX Guard Console'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-500">
                  {isPt ? 'Índice de Navegação Ativo' : 'Navigation Index Active'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="hidden md:inline">
                  <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded-2xs text-[9px] text-slate-300">↑↓</kbd>{' '}
                  {isPt ? 'navegar' : 'navigate'}
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded-2xs text-[9px] text-slate-300">↵</kbd>{' '}
                  {isPt ? 'selecionar' : 'select'}
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded-2xs text-[9px] text-slate-300">esc</kbd>{' '}
                  {isPt ? 'fechar' : 'close'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
