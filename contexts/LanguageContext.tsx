import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'pt';

interface Glossary {
  [key: string]: string;
}

interface NavTranslations {
  paradox: string;
  enclave: string;
  architecture: string;
  roi: string;
  marketplace: string;
  privateOffer: string;
}

interface HeroTranslations {
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  ctaVideo: string;
  scroll: string;
}

interface VideoTranslations {
  title: string;
  generateBtn: string;
  generating: string;
  waiting: string;
  error: string;
  disclaimer: string;
}

interface ParadoxTranslations {
  eyebrow: string;
  titleMain: string;
  titleItalic: string;
  p1: string;
  p2: string;
  retention: string;
  erasure: string;
  quote: string;
}

interface TechStackTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  challenge: {
    title: string;
    desc: string;
  };
  solution: {
    title: string;
    desc: string;
  };
  quote: string;
  features: {
    title: string;
    desc: string;
  }[];
}

interface WhitepaperTranslationMeta {
  label: string;
  value: string;
}

interface WhitepaperTranslations {
  badge: string;
  title: string;
  subtitle: string;
  highlights: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  detailsLabel: string;
  meta: WhitepaperTranslationMeta[];
}

interface ArchitectureProduct {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

interface ArchitectureTranslations {
  eyebrow: string;
  title: string;
  products: ArchitectureProduct[];
}

interface RoiTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  incident: {
    label: string;
    desc: string;
  };
  timeline: {
    legacy: string;
    foundlab: string;
    label: string;
  };
  metrics: {
    saved: string;
    savedLabel: string;
    reduction: string;
    reductionLabel: string;
  };
}

interface MarketplaceCardImage {
  base: string;
  alt: string;
}

interface MarketplaceCard {
  title: string;
  desc: string;
  image: MarketplaceCardImage;
}

interface MarketplaceTranslations {
  badge: string;
  title: string;
  subtitle: string;
  alchemy: {
    input: string;
    process: string;
    output: string;
  };
  cards: MarketplaceCard[];
  cta: string;
}

interface PrivateOfferTranslations {
  title: string;
  desc: string;
  emailPlaceholder: string;
  submitBtn: string;
  validating: {
    title: string;
    desc: string;
  };
  success: {
    title: string;
    desc: string;
    checkEmail: string;
  };
  disclaimer: string;
}

interface FooterTranslations {
  desc: string;
  headers: {
    platform: string;
    company: string;
    legal: string;
  };
  links: {
    arch: string;
    proto: string;
    market: string;
    about: string;
    careers: string;
    contact: string;
    privacy: string;
    terms: string;
    sla: string;
  };
  rights: string;
  locations: string;
}

interface PageContent {
  title: string;
  description: string;
  body: string[];
}

interface PagesTranslations {
  about: PageContent;
  careers: PageContent;
  contact: PageContent;
  privacy: PageContent;
  terms: PageContent;
  sla: PageContent;
}

interface TerminalTranslations {
  eyebrow: string;
  title: {
    line1: { pre: string; highlight: string; post: string };
    line2: { pre: string; highlight: string; post: string };
  };
  description: {
    pre: string;
    strong: string;
    post: string;
  };
  bullets: string[];
  logSequence: string[];
  statusBar: {
    status: string;
    memory: string;
    nim: string;
  };
}

interface ContactFormTranslations {
  badge: string;
  title: string;
  subtitle: string;
  channels: { label: string; value: string }[];
  responseTime: string;
  fields: { name: string; email: string; company: string; message: string };
  placeholders: { name: string; email: string; company: string; message: string };
  submit: string;
  submitting: string;
  error: string;
  success: { title: string; desc: string; another: string };
}

interface SocialProofTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  testimonials: { quote: string; author: string; role: string; org: string }[];
  badges: string[];
}

interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  video: VideoTranslations;
  glossary: Glossary;
  paradox: ParadoxTranslations;
  techStack: TechStackTranslations;
  whitepaper: WhitepaperTranslations;
  architecture: ArchitectureTranslations;
  roi: RoiTranslations;
  marketplace: MarketplaceTranslations;
  privateOffer: PrivateOfferTranslations;
  pages: PagesTranslations;
  terminal: TerminalTranslations;
  footer: FooterTranslations;
  socialProof: SocialProofTranslations;
  contactForm: ContactFormTranslations;
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      paradox: "The Paradox",
      enclave: "Sovereign Enclave",
      architecture: "Architecture",
      roi: "Case Study",
      marketplace: "Marketplace",
      privateOffer: "Private Offer"
    },
    hero: {
      badge: "Layer 0: Programmable Trust",
      title1: "Auditable Trust",
      title2: "Infrastructure.",
      subtitle: "We don't build apps. We engineer the Programmable Trust Layer. Transforming manual compliance into physics-based guarantees.",
      cta1: "Initialize Layer 0",
      cta2: "Protocol Manifesto",
      ctaVideo: "View Simulation",
      scroll: "Decrypt"
    },
    video: {
      title: "Inside the FoundLab Sovereign Stack",
      generateBtn: "Render AI Overview (Veo)",
      generating: "Synthesizing Sovereign Enclave Sequence...",
      waiting: "Calibrating Zero-Persistence lattice...",
      error: "Sequence interrupted. Please try again.",
      disclaimer: "Generated live with Google Veo. No assets are pre-rendered."
    },
    glossary: {
      "BACEN": "Central Bank of Brazil. Resolution 4.893 mandates storage, encryption, and recoverability for banking data.",
      "LGPD": "Brazilian General Data Protection Law. Creates liability for keeping personal data longer than strictly necessary.",
      "ANPD": "Brazil's National Data Protection Authority. Begins punitive enforcement in 2025 with fines up to R$50M per incident.",
      "RegTech": "Legacy compliance software focused on workflows instead of physics-grade guarantees.",
      "Toxic Data Assets": "Records banks must retain for regulators yet are penalized for keeping under privacy statutes."
    },
    paradox: {
      eyebrow: "The Existential Crisis",
      titleMain: "The Retention",
      titleItalic: "Paradox.",
      p1: "The Sector demands 'Retain All' (BACEN/SOX). The Law demands 'Forget All' (LGPD/GDPR). This conflict creates the Retention Paradox.",
      p2: "FoundLab resolves this via Cryptographic Decoupling. We destroy the key (Logical Erasure) while preserving the cipher (Physical Retention). A mathematical truce.",
      retention: "Audit: Retain",
      erasure: "Privacy: Erase",
      quote: "\"We don't sell compute, we sell Auditable Decisions. The irrefutable proof that a specific process occurred.\""
    },
    techStack: {
      eyebrow: "Powered by NVIDIA NIMs",
      title: "The Truth Machine.",
      subtitle: "Traditional RegTech runs as an application on top of legacy rails. FoundLab is the new rail. A programmable trust layer that turns compliance into code.",
      challenge: {
        title: "The Challenge",
        desc: "Banks must run multi-billion parameter models in sub-20ms without copying client telemetry into a public API. Compliance, sovereignty, and GPU performance rarely coexist."
      },
      solution: {
        title: "The Solution",
        desc: "NVIDIA Inference Microservices (NIMs) supply bare-metal acceleration with sovereign custody. They power every Zero-Persistence enclave."
      },
      quote: "The 'Trust by Physics' doctrine scales because NVIDIA lets us place GPUs inside regulated perimeters. It is the inevitable substrate of finance.",
      features: [
        { title: "NVIDIA NIMs", desc: "Sovereign inference fabric with deterministic latency inside your VPC." },
        { title: "Google Cloud Run", desc: "Ephemeral containers with enforced Zero-Persistence kill switches at deploy time." },
        { title: "VPC Service Controls", desc: "Layered egress boundaries that make data exfiltration physically impractical." }
      ]
    },
    whitepaper: {
      badge: "Executive Research",
      title: "Zero-Persistence Assurance Whitepaper",
      subtitle: "A 46-page dossier detailing how FoundLab reconciles regulator retention mandates with LGPD/GDPR erasure requirements.",
      highlights: [
        "Maps BACEN 4.893, SOX, and LGPD/GDPR clauses to Zero-Persistence controls.",
        "Dissects Protocol Veritas, CMEK burn patterns, and NVIDIA NIM enclave topology.",
        "Includes Tier-1 Bank incident case study, ROI data, and implementation checklist."
      ],
      ctaPrimary: "Download Abstract",
      ctaSecondary: "Request Full Copy",
      detailsLabel: "Key Details",
      meta: [
        { label: "Length", value: "46 pages" },
        { label: "Revision", value: "Q4 2025" },
        { label: "Audience", value: "CIO · CRO · CISO" }
      ]
    },
    architecture: {
      eyebrow: "Six modules. One architecture.",
      title: "FoundLab's infrastructure is designed on the premise of Zero Trust. It operates 100% within your Google Cloud project, guaranteeing total sovereignty over your data with no vendor lock-in. The ecosystem is sustained by six fundamental modules:",
      products: [
        {
          title: "Edge Security",
          subtitle: "Cloud Load Balancing & Cloud Armor",
          description: "Global Anycast routing with TLS termination and edge threat mitigation. Traffic is filtered before any processing occurs.",
          tag: "Edge & Security"
        },
        {
          title: "Zero-Trust Proxy",
          subtitle: "Cloud Run",
          description: "The interception engine. A stateless, RAM-only environment that isolates every request, generates cryptographic hashes in memory, and guarantees zero disk writes.",
          tag: "Stateless Interception"
        },
        {
          title: "Signing Authority",
          subtitle: "Cloud KMS",
          description: "Mathematical certification. Generates an ECDSA P-256 signature bound to the exact moment of decision, without the private key ever leaving the hardware security module (HSM).",
          tag: "Cryptography & HSM"
        },
        {
          title: "Immutable Ledger",
          subtitle: "BigQuery WORM",
          description: "The \"Quantum Notary\". An append-only database that exclusively stores mathematical evidence, making it physically impossible to tamper with the record or reconstruct the original data.",
          tag: "Immutable Storage"
        },
        {
          title: "Secret Store",
          subtitle: "Secret Manager",
          description: "Centralized and isolated management of keys and environment variables, featuring an integrated kill-switch for immediate system-wide revocation.",
          tag: "Key Management"
        },
        {
          title: "AI Core & Observability",
          subtitle: "Vertex AI & Cloud Monitoring",
          description: "Fluid streaming integration with Gemini models, monitored in real-time by DORA metrics and latency alerts to guarantee maximum performance without compromising compliance.",
          tag: "AI & Observability"
        }
      ]
    },
    roi: {
      eyebrow: "Proof in Production",
      title: "The 16-Minute Resolution.",
      subtitle: "Inside a Tier-1 Global Investment Bank we mitigated a Shadow IT breach exposing $20M+ in liabilities. Zero-Persistence collapsed 21 hours of manual playbooks into minutes.",
      incident: {
        label: "Incident Detected",
        desc: "Unauthorized client data upload into a consumer AI assistant."
      },
      timeline: {
        legacy: "21 Hours (Manual Playbooks)",
        foundlab: "16 Minutes (Zero-Persistence Runbook)",
        label: "Response Time"
      },
      metrics: {
        saved: "$ 20M+",
        savedLabel: "Liability Averted",
        reduction: "98.7%",
        reductionLabel: "Faster Containment"
      }
    },
    marketplace: {
      badge: "Hidden Budget Playbook",
      title: "Zero Marginal Cost.",
      subtitle: "We leverage Financial Arbitrage. Unlock your dormant Cloud Commitments (CUDs) to fund Sovereign Infrastructure. It's not OpEx. It's asset recovery.",
      alchemy: {
        input: "Liability (Unused CUDs)",
        process: "Arbitrage Execution",
        output: "Asset (Layer 0 Trust)"
      },
      cards: [
        {
          title: "100% CUD Drawdown",
          desc: "Every $1 spent on FoundLab retires $1 of your active Google Cloud commitment.",
          image: {
            base: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f",
            alt: "Close-up of financial charts with stacked coins representing cloud commitment offsets."
          }
        },
        {
          title: "Procurement Bypass",
          desc: "Skip the 18-month vendor onboarding. Google Cloud is already the vendor of record.",
          image: {
            base: "local:googlepartner",
            alt: "Google Cloud Partner badge confirming the procurement fast-track."
          }
        },
        {
          title: "OpEx to CapEx",
          desc: "Turn operational security spend into capitalized infrastructure.",
          image: {
            base: "https://images.unsplash.com/photo-1454165205744-3b78555e5572",
            alt: "Executive reviewing a capital planning dashboard highlighting the OpEx to CapEx shift."
          }
        }
      ],
      cta: "Initiate Private Offer"
    },
    privateOffer: {
      title: "Initiate Handshake",
      desc: "Enter your institutional email to generate a secure access token.",
      emailPlaceholder: "name@institution.com",
      submitBtn: "Request Token",
      validating: {
        title: "Verifying Domain Authority...",
        desc: "Checking against Tier-1 whitelist"
      },
      success: {
        title: "Handshake Initiated",
        desc: "Request securely queued for compliance review.",
        checkEmail: "A specialist will contact you via institutional channel."
      },
      disclaimer: "Participation in the CUD (Committed Use Discount) Drawdown program is subject to specific Google Cloud Marketplace eligibility requirements. FoundLab Inc. does not guarantee 100% abatement for all contract types. Conversion of OpEx to CapEx via toxic asset recovery requires independent financial audit validation."
    },
    pages: {
      about: {
        title: "About FoundLab",
        description: "We are the sovereign engineering core for regulated finance.",
        body: [
          "FoundLab isn't a consultancy or a SaaS vendor. We are a deep-tech laboratory composed of former regulatory lawyers, risk architects, and critical infrastructure engineers.",
          "We exist to solve one problem: How to innovate at the speed of AI without breaking the physics of banking secrecy. We don't sell software; we sell the mathematical certainty that your data never left your perimeter."
        ]
      },
      careers: {
        title: "Join the Sovereign Engineering Core",
        description: "Obsessive builders only. No politics. Just precision.",
        body: [
          "We recruit engineers who understand that 'latency' and 'custody' are the same problem. If you can optimize CUDA kernels while debating LGPD liability clauses, you belong here.",
          "We don't offer 'perks'. We offer the chance to build the shield that protects the global financial system. Send your GitHub or paper to careers@foundlab.com.br."
        ]
      },
      contact: {
        title: "Initiate Handshake",
        description: "Direct channels for institutional partners.",
        body: [
          "Commercial & Private Offers: commercial@foundlab.com.br",
          "Regulatory Affairs: legal@foundlab.com.br",
          "Emergency Response (P1): soc@foundlab.com.br"
        ]
      },
      privacy: {
        title: "Privacy Policy",
        description: "Our policy is simple: We don't want your data.",
        body: [
          "FoundLab operates on a Zero-Trust, Zero-Persistence model. We do not ingest, store, or train on client data. All processing occurs within your sovereign VPC.",
          "Any telemetry collected is strictly for system health (uptime, latency) and contains no PII or financial secrets. We are architecturally designed to not retain what we never held."
        ]
      },
      terms: {
        title: "Terms of Service",
        description: "The rules of engagement for sovereign infrastructure.",
        body: [
          "Services are provided under a Master Service Agreement (MSA) executed via Google Cloud Marketplace Private Offer.",
          "You own the enclave. You own the keys. You own the liability for what you build. We own the guarantee that the physics of the system hold true."
        ]
      },
      sla: {
        title: "Service Level Agreement",
        description: "99.95% Uptime. 15-Minute Response. No Excuses.",
        body: [
          "Our SLA is backed by financial penalties, not credits. We guarantee sub-50ms cold-starts for inference and 99.95% availability for control plane API.",
          "Critical incidents (P1) trigger an immediate swarm response from our engineering core, not a support ticket queue."
        ]
      }
    },
    terminal: {
      eyebrow: "Guardian AI Console",
      title: {
        line1: { pre: "Expose the", highlight: "Invisible", post: "." },
        line2: { pre: "Interrogate the", highlight: "Code", post: "." }
      },
      description: {
        pre: "We don't ship black boxes. The",
        strong: "Real-time Rationale Extraction (REX)",
        post: "engine logs every interdiction in plain English inside your perimeter."
      },
      bullets: [
        "Zero-Data Exfiltration (VPC Locked)",
        "Sub-20ms Interdiction Latency",
        "Cryptographic Evidence Ledger"
      ],
      logSequence: [
        "> INITIATING GUARDIAN AI PROTOCOL...",
        "> ESTABLISHING SECURE HANDSHAKE...",
        "> CONNECTION SECURE",
        "> LOADING MODEL: FRAUD-DEFENSE-L...",
        "> ALLOCATION: GPU 0 - 100% DEDICATED",
        "> STREAMING TRANSACTION BATCH...",
        "> ANALYZING... [LATENCY: 12ms]",
        "> ...",
        "> ALERT: ANOMALY DETECTED",
        "> REASON: VELOCITY_CHECK_FAIL",
        "> RISK SCORE: 99.8/100 [CRITICAL]",
        "> ACTION: INTERDICTION_IMMEDIATE",
        "> EXECUTING BURN_PROTOCOL...",
        "> SESSION REVOKED.",
        "> GENERATING RATIONALE... DONE.",
        "> LOGGING EVIDENCE...",
        "> SUCCESS. THREAT NEUTRALIZED.",
        "> AWAITING NEXT BATCH..."
      ],
      statusBar: {
        status: "Status: ONLINE",
        memory: "Mem: 12GB / 80GB (RAM DISK)",
        nim: "NIM: ACTIVE"
      }
    },
    footer: {
      desc: "Layer 0 Deep Tech redefining financial trust with inverted sovereignty and physics-grade security.",
      headers: {
        platform: "Platform",
        company: "Company",
        legal: "Legal"
      },
      links: {
        arch: "Architecture",
        proto: "Protocol Veritas",
        market: "Marketplace",
        about: "About Us",
        careers: "Careers",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        sla: "SLA"
      },
      rights: "FoundLab Inc. All rights reserved.",
      locations: "New York / Sao Paulo"
    },
    socialProof: {
      eyebrow: "Trusted By Leaders",
      title: "Built for the Most Regulated Sectors.",
      subtitle: "Enterprise-grade trust infrastructure deployed across Tier-1 institutions, validated by independent auditors and powered by sovereign compute.",
      stats: [
        { value: "99.95%", label: "Uptime SLA" },
        { value: "<16min", label: "Incident Response" },
        { value: "$20M+", label: "Liability Averted" },
        { value: "Zero", label: "Data Exfiltrations" }
      ],
      testimonials: [
        {
          quote: "FoundLab compressed what would have been months of manual forensic work into minutes. The Zero-Persistence protocol gave us the confidence to deploy AI at scale within our regulatory perimeter.",
          author: "Chief Risk Officer",
          role: "Global Investment Banking Division",
          org: "Tier-1 Global Bank"
        },
        {
          quote: "The CUD drawdown model was a revelation. We funded sovereign infrastructure without a single new budget line. FoundLab turned dormant cloud commitments into a competitive advantage.",
          author: "VP of Cloud Strategy",
          role: "Technology Infrastructure",
          org: "Fortune 500 Financial Services"
        }
      ],
      badges: [
        "Google Cloud Partner",
        "NVIDIA NIM Certified",
        "SOC 2 Type II",
        "LGPD Compliant"
      ]
    },
    contactForm: {
      badge: "Direct Channel",
      title: "Initiate Handshake.",
      subtitle: "Institutional partners and enterprise inquiries. Our engineering core responds within 24 hours.",
      channels: [
        { label: "Commercial & Private Offers", value: "commercial@foundlab.com.br" },
        { label: "Regulatory Affairs", value: "legal@foundlab.com.br" },
        { label: "Emergency Response (P1)", value: "soc@foundlab.com.br" }
      ],
      responseTime: "Avg. Response Time: < 24 hours",
      fields: {
        name: "Full Name",
        email: "Institutional Email",
        company: "Organization",
        message: "Message"
      },
      placeholders: {
        name: "John Doe",
        email: "name@institution.com",
        company: "Acme Corporation",
        message: "Describe your compliance challenge or infrastructure requirement..."
      },
      submit: "Send Message",
      submitting: "Transmitting...",
      error: "Failed to send. Please try again or email us directly.",
      success: {
        title: "Message Transmitted",
        desc: "Your inquiry has been securely queued. A specialist from our engineering core will respond within 24 hours.",
        another: "Send Another Message"
      }
    }
  },
  pt: {
    nav: {
      paradox: "O Paradoxo",
      enclave: "Enclave Soberano",
      architecture: "Arquitetura",
      roi: "Estudo de Caso",
      marketplace: "Marketplace",
      privateOffer: "Oferta Privada"
    },
    hero: {
      badge: "Layer 0: Confiança Programável",
      title1: "Auditable Trust",
      title2: "Infrastructure.",
      subtitle: "Não criamos apps. Arquitetamos a Camada de Confiança Programável. Transformando compliance manual em garantias baseadas na física.",
      cta1: "Inicializar Layer 0",
      cta2: "Ler Manifesto",
      ctaVideo: "Ver Simulação",
      scroll: "Decriptar"
    },
    video: {
      title: "Dentro da Stack Soberana da FoundLab",
      generateBtn: "Renderizar Visão com IA (Veo)",
      generating: "Sintetizando sequência do enclave soberano...",
      waiting: "Calibrando a malha de Zero-Persistência...",
      error: "Sequência interrompida. Tente novamente.",
      disclaimer: "Gerado ao vivo com Google Veo. Nenhum ativo é pré-renderizado."
    },
    glossary: {
      "BACEN": "Banco Central do Brasil. A Resolução 4.893 impõe requisitos de armazenamento, criptografia e recuperabilidade para dados bancários.",
      "LGPD": "Lei Geral de Proteção de Dados. Cria responsabilidade civil por manter dados pessoais além do estritamente necessário.",
      "ANPD": "Autoridade Nacional de Proteção de Dados. Inicia a fase punitiva em 2025 com multas de até R$50 milhões por incidente.",
      "RegTech": "Software legado de compliance focado em fluxos, não em garantias físicas.",
      "Toxic Data Assets": "Registros que bancos são obrigados a manter para reguladores, mas penalizados por reter segundo leis de privacidade."
    },
    paradox: {
      eyebrow: "A Crise Existencial",
      titleMain: "O Paradoxo",
      titleItalic: "da Retenção.",
      p1: "O Setor exige 'Reter Tudo' (BACEN/SOX). A Lei exige 'Esquecer Tudo' (LGPD). Este conflito é o Paradoxo da Retenção.",
      p2: "A FoundLab resolve isso via Desacoplamento Criptográfico. Destruímos a chave (Apagamento Lógico) mantendo a cifra (Retenção Física). Uma trégua matemática.",
      retention: "Auditoria: Reter",
      erasure: "Privacidade: Apagar",
      quote: "\"Não vendemos computação, vendemos Decisões Auditáveis. A prova irrefutável de que um processo ocorreu.\""
    },
    techStack: {
      eyebrow: "Impulsionado por NVIDIA NIMs",
      title: "A Máquina da Verdade.",
      subtitle: "Interdição de fraude, AML, risco intradia e orquestração de consentimento exigem latência determinística com controle soberano. É isso que entregamos.",
      challenge: {
        title: "O Desafio",
        desc: "Bancos precisam rodar modelos com bilhões de parâmetros em menos de 20 ms sem copiar telemetria do cliente para uma API pública. Compliance, soberania e performance de GPU raramente coexistem."
      },
      solution: {
        title: "A Solução",
        desc: "Os NVIDIA Inference Microservices (NIMs) fornecem aceleração bare-metal sob custódia soberana. Eles energizam cada enclave Zero-Persistência."
      },
      quote: "O dogma 'trust by physics' da FoundLab escala porque a NVIDIA permite posicionar GPUs dentro de perímetros regulados. É o substrato inevitável das finanças.",
      features: [
        { title: "NVIDIA NIMs", desc: "Malha de inferência soberana com latência determinística dentro da sua VPC." },
        { title: "Google Cloud Run", desc: "Contêineres efêmeros com kill switch de Zero-Persistência em cada deploy." },
        { title: "VPC Service Controls", desc: "Camadas de bloqueio de egress que tornam exfiltração fisicamente impraticável." }
      ]
    },
    whitepaper: {
      badge: "Pesquisa Executiva",
      title: "Whitepaper Zero-Persistência Assurance",
      subtitle: "Dossiê de 46 páginas detalhando como a FoundLab concilia mandatos de retenção do BACEN/SOX com o direito ao esquecimento da LGPD/GDPR.",
      highlights: [
        "Mapeia BACEN 4.893, SOX e LGPD/GDPR para controles de Zero-Persistência.",
        "Explica o Protocolo Veritas, a queima de CMEK e a topologia dos enclaves NVIDIA NIM.",
        "Traz o case de Banco Tier-1, métricas de ROI e um checklist de implementação."
      ],
      ctaPrimary: "Baixar Resumo",
      ctaSecondary: "Solicitar Versão Completa",
      detailsLabel: "Detalhes",
      meta: [
        { label: "Extensão", value: "46 páginas" },
        { label: "Revisão", value: "Q4 2025" },
        { label: "Audiência", value: "CIO · CRO · CISO" }
      ]
    },
    architecture: {
      eyebrow: "Six modules. One architecture.",
      title: "A infraestrutura da FoundLab foi desenhada sob a premissa de Zero Trust. Ela opera 100% dentro do seu projeto Google Cloud, garantindo soberania total sobre seus dados sem vendor lock-in. O ecossistema é sustentado por seis módulos fundamentais:",
      products: [
        {
          title: "Edge Security",
          subtitle: "Cloud Load Balancing & Cloud Armor",
          description: "Roteamento global Anycast com terminação TLS e mitigação de ameaças na borda. O tráfego é filtrado antes de qualquer processamento.",
          tag: "Borda & Segurança"
        },
        {
          title: "Zero-Trust Proxy",
          subtitle: "Cloud Run",
          description: "O motor de interceptação. Um ambiente stateless e RAM-only que isola cada requisição, gera os hashes criptográficos em memória e garante zero escrita em disco.",
          tag: "Interceptação Stateless"
        },
        {
          title: "Signing Authority",
          subtitle: "Cloud KMS",
          description: "A certificação matemática. Gera uma assinatura ECDSA P-256 vinculada ao momento exato da decisão, sem que a chave privada jamais saia do cofre de hardware (HSM).",
          tag: "Criptografia & HSM"
        },
        {
          title: "Immutable Ledger",
          subtitle: "BigQuery WORM",
          description: "O \"Cartório Quântico\". Um banco de dados append-only que armazena exclusivamente as evidências matemáticas, tornando fisicamente impossível adulterar o registro ou reconstruir o dado original.",
          tag: "Armazenamento Imutável"
        },
        {
          title: "Secret Store",
          subtitle: "Secret Manager",
          description: "Gestão centralizada e isolada de chaves e variáveis de ambiente, com kill-switch integrado para revogação imediata em todo o sistema.",
          tag: "Gestão de Chaves"
        },
        {
          title: "AI Core & Observability",
          subtitle: "Vertex AI & Cloud Monitoring",
          description: "Integração fluida via streaming com modelos Gemini, monitorada em tempo real por métricas DORA e alertas de latência para garantir máxima performance sem comprometer a conformidade.",
          tag: "IA & Monitoramento"
        }
      ]
    },
    roi: {
      eyebrow: "Prova em Produção",
      title: "A Resolução de 16 Minutos.",
      subtitle: "Dentro de um Banco de Investimento Tier-1 mitigamos um vazamento de Shadow IT que expunha milhões em passivos. Zero-Persistência condensou 21 horas de runbooks manuais em minutos.",
      incident: {
        label: "Incidente Detectado",
        desc: "Upload não autorizado de dados de clientes em um assistente de IA público."
      },
      timeline: {
        legacy: "21 Horas (Playbooks Manuais)",
        foundlab: "16 Minutos (Runbook Zero-Persistência)",
        label: "Tempo de Resposta"
      },
      metrics: {
        saved: "R$ 100M+",
        savedLabel: "Passivo Evitado",
        reduction: "98.7%",
        reductionLabel: "Contenção Mais Rápida"
      }
    },
    marketplace: {
      badge: "Hidden Budget Playbook",
      title: "Custo Marginal Zero.",
      subtitle: "Arbitragem Financeira como *feature*. Desbloqueie seus Compromissos de Nuvem (CUDs) ociosos para financiar Infraestrutura Soberana. Não é despesa nova. É recuperação de ativo.",
      alchemy: {
        input: "Passivo (CUDs Ociosos)",
        process: "Execução de Arbitragem",
        output: "Ativo (Trust Layer 0)"
      },
      cards: [
        {
          title: "Abatimento 1:1",
          desc: "Cada R$1 gasto na FoundLab abate R$1 do seu compromisso ativo de Google Cloud.",
          image: {
            base: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f",
            alt: "Gráfico financeiro com moedas empilhadas representando o abatimento de compromissos de nuvem."
          }
        },
        {
          title: "Bypass de Procurement",
          desc: "Pule os 18 meses de cadastro. O fornecedor já é o Google Cloud.",
          image: {
            base: "local:googlepartner",
            alt: "Selo Google Cloud Partner confirmando o fast-track de procurement."
          }
        },
        {
          title: "OpEx para CapEx",
          desc: "Transforme o gasto operacional de segurança em infraestrutura capitalizada.",
          image: {
            base: "https://images.unsplash.com/photo-1454165205744-3b78555e5572",
            alt: "Executivo analisando um dashboard de planejamento de capital que destaca a migração de OpEx para CapEx."
          }
        }
      ],
      cta: "Iniciar Oferta Privada"
    },
    privateOffer: {
      title: "Iniciar Handshake",
      desc: "Insira seu email institucional para gerar um token de acesso seguro.",
      emailPlaceholder: "nome@instituicao.com",
      submitBtn: "Solicitar Token",
      validating: {
        title: "Verificando Autoridade de Domínio...",
        desc: "Checando whitelist Tier-1"
      },
      success: {
        title: "Handshake Iniciado",
        desc: "Solicitação enfileirada com segurança para revisão de compliance.",
        checkEmail: "Um especialista entrará em contato via canal institucional."
      },
      disclaimer: "A participação no programa de abatimento via CUD (Committed Use Discount) está sujeita aos requisitos de elegibilidade do Google Cloud Marketplace. A FoundLab Inc. não garante 100% de abatimento para todos os tipos de contrato. A conversão de OpEx em CapEx via recuperação de ativos tóxicos requer validação de auditoria financeira independente."
    },
    pages: {
      about: {
        title: "Sobre a FoundLab",
        description: "Somos o núcleo de engenharia soberana para finanças reguladas.",
        body: [
          "A FoundLab não é uma consultoria nem um vendor de SaaS comum. Somos um laboratório deep-tech composto por ex-advogados regulatórios, arquitetos de risco e engenheiros de infraestrutura crítica.",
          "Existimos para resolver um problema: Como inovar na velocidade da IA sem quebrar a física do sigilo bancário. Não vendemos software; vendemos a certeza matemática de que seus dados nunca deixaram seu perímetro."
        ]
      },
      careers: {
        title: "Junte-se ao Núcleo de Engenharia",
        description: "Apenas construtores obsessivos. Sem política. Apenas precisão.",
        body: [
          "Recrutamos engenheiros que entendem que 'latência' e 'custódia' são o mesmo problema. Se você otimiza kernels CUDA enquanto debate cláusulas da LGPD, seu lugar é aqui.",
          "Não oferecemos 'benefícios fofos'. Oferecemos a chance de construir o escudo que protege o sistema financeiro global. Envie seu GitHub ou paper para careers@foundlab.com.br."
        ]
      },
      contact: {
        title: "Iniciar Handshake",
        description: "Canais diretos para parceiros institucionais.",
        body: [
          "Ofertas Privadas & Comercial: commercial@foundlab.com.br",
          "Assuntos Regulatórios: legal@foundlab.com.br",
          "Resposta a Incidentes (P1): soc@foundlab.com.br"
        ]
      },
      privacy: {
        title: "Política de Privacidade",
        description: "Nossa política é simples: Não queremos seus dados.",
        body: [
          "A FoundLab opera em um modelo Zero-Trust e Zero-Persistência. Não ingerimos, armazenamos ou treinamos com dados de clientes. Todo o processamento ocorre dentro da sua VPC soberana.",
          "Qualquer telemetria coletada é estritamente para saúde do sistema (uptime, latência) e não contém PII ou segredos financeiros. Somos arquiteturalmente desenhados para não reter o que nunca tivemos."
        ]
      },
      terms: {
        title: "Termos de Serviço",
        description: "As regras de engajamento para infraestrutura soberana.",
        body: [
          "Os serviços são prestados sob um Master Service Agreement (MSA) executado via Oferta Privada no Google Cloud Marketplace.",
          "Você é dono do enclave. Você é dono das chaves. Você é dono da responsabilidade pelo que constrói. Nós somos donos da garantia de que a física do sistema se mantém verdadeira."
        ]
      },
      sla: {
        title: "Acordo de Nível de Serviço",
        description: "99.95% Uptime. Resposta em 15 Minutos. Sem Desculpas.",
        body: [
          "Nosso SLA é garantido por penalidades financeiras, não créditos. Garantimos cold-starts de inferência abaixo de 50ms e 99.95% de disponibilidade para o control plane.",
          "Incidentes críticos (P1) acionam uma resposta imediata do nosso núcleo de engenharia, não uma fila de suporte."
        ]
      }
    },
    terminal: {
      eyebrow: "Console Guardian AI",
      title: {
        line1: { pre: "Revele o", highlight: "Invisível", post: "." },
        line2: { pre: "Interrogue o", highlight: "Código", post: "." }
      },
      description: {
        pre: "Não entregamos caixas-pretas. O",
        strong: "motor de Extração de Racional em Tempo Real (REX)",
        post: "registra cada interdição em português claro dentro do seu perímetro."
      },
      bullets: [
        "Zero-Data Exfiltration (VPC Bloqueada)",
        "Latência de Interdição sub-20ms",
        "Ledger de Evidências Criptográficas"
      ],
      logSequence: [
        "> INICIANDO PROTOCOLO GUARDIAN AI...",
        "> ESTABELECENDO HANDSHAKE SEGURO...",
        "> CONEXÃO SEGURA",
        "> CARREGANDO MODELO: FRAUD-DEFENSE-L...",
        "> ALOCAÇÃO: GPU 0 - 100% DEDICADA",
        "> TRANSMITINDO LOTE DE TRANSAÇÕES...",
        "> ANALISANDO... [LATÊNCIA: 12ms]",
        "> ...",
        "> ALERTA: ANOMALIA DETECTADA",
        "> MOTIVO: VELOCITY_CHECK_FAIL",
        "> SCORE DE RISCO: 99.8/100 [CRÍTICO]",
        "> AÇÃO: INTERDICTION_IMMEDIATE",
        "> EXECUTANDO BURN_PROTOCOL...",
        "> SESSÃO REVOGADA.",
        "> GERANDO RACIONAL... CONCLUÍDO.",
        "> REGISTRANDO EVIDÊNCIA...",
        "> SUCESSO. AMEAÇA NEUTRALIZADA.",
        "> AGUARDANDO PRÓXIMO LOTE..."
      ],
      statusBar: {
        status: "Status: ONLINE",
        memory: "Mem: 12GB / 80GB (RAM DISK)",
        nim: "NIM: ATIVO"
      }
    },
    footer: {
      desc: "Deep Tech de Layer 0. Redefinindo confiança financeira com soberania invertida e segurança regida pela física.",
      headers: {
        platform: "Plataforma",
        company: "Empresa",
        legal: "Legal"
      },
      links: {
        arch: "Arquitetura",
        proto: "Protocolo Veritas",
        market: "Marketplace",
        about: "Sobre",
        careers: "Carreiras",
        contact: "Contato",
        privacy: "Privacidade",
        terms: "Terms of Service",
        sla: "SLA"
      },
      rights: "FoundLab Inc. Todos os direitos reservados.",
      locations: "Nova York / São Paulo"
    },
    socialProof: {
      eyebrow: "Confiança Comprovada",
      title: "Construído para os Setores Mais Regulados.",
      subtitle: "Infraestrutura de confiança enterprise-grade implantada em instituições Tier-1, validada por auditores independentes e alimentada por computação soberana.",
      stats: [
        { value: "99.95%", label: "SLA de Uptime" },
        { value: "<16min", label: "Resposta a Incidentes" },
        { value: "R$100M+", label: "Passivo Evitado" },
        { value: "Zero", label: "Exfiltrações de Dados" }
      ],
      testimonials: [
        {
          quote: "A FoundLab comprimiu o que seriam meses de trabalho forense manual em minutos. O protocolo Zero-Persistência nos deu confiança para implantar IA em escala dentro do nosso perímetro regulatório.",
          author: "Chief Risk Officer",
          role: "Divisão de Banco de Investimento Global",
          org: "Banco Global Tier-1"
        },
        {
          quote: "O modelo de abatimento via CUD foi uma revelação. Financiamos infraestrutura soberana sem uma única linha orçamentária nova. A FoundLab transformou compromissos de nuvem ociosos em vantagem competitiva.",
          author: "VP de Estratégia Cloud",
          role: "Infraestrutura Tecnológica",
          org: "Fortune 500 - Serviços Financeiros"
        }
      ],
      badges: [
        "Google Cloud Partner",
        "NVIDIA NIM Certificado",
        "SOC 2 Type II",
        "LGPD Compliance"
      ]
    },
    contactForm: {
      badge: "Canal Direto",
      title: "Iniciar Handshake.",
      subtitle: "Para parceiros institucionais e consultas enterprise. Nosso nucleo de engenharia responde em ate 24 horas.",
      channels: [
        { label: "Comercial & Ofertas Privadas", value: "commercial@foundlab.com.br" },
        { label: "Assuntos Regulatorios", value: "legal@foundlab.com.br" },
        { label: "Resposta a Incidentes (P1)", value: "soc@foundlab.com.br" }
      ],
      responseTime: "Tempo medio de resposta: < 24 horas",
      fields: {
        name: "Nome Completo",
        email: "Email Institucional",
        company: "Organizacao",
        message: "Mensagem"
      },
      placeholders: {
        name: "Joao Silva",
        email: "nome@instituicao.com",
        company: "Empresa S.A.",
        message: "Descreva seu desafio de compliance ou requisito de infraestrutura..."
      },
      submit: "Enviar Mensagem",
      submitting: "Transmitindo...",
      error: "Falha ao enviar. Tente novamente ou envie um email diretamente.",
      success: {
        title: "Mensagem Transmitida",
        desc: "Sua consulta foi enfileirada com seguranca. Um especialista do nosso nucleo de engenharia respondera em ate 24 horas.",
        another: "Enviar Outra Mensagem"
      }
    }
  }

};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
