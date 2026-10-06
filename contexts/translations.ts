export type Language = 'en' | 'pt';

export interface Glossary {
  [key: string]: string;
}

export interface NavTranslations {
  product: string;
  paradox: string;
  howItWorks: string;
  architecture: string;
  evidence: string;
  enterprise: string;
  evaluation: string;
}

export interface HeroTranslations {
  badge: string;
  title1: string;
  title2: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  ctaVideo: string;
  scroll: string;
}

export interface VideoTranslations {
  title: string;
  generateBtn: string;
  generating: string;
  waiting: string;
  error: string;
  disclaimer: string;
}

export interface ParadoxTranslations {
  eyebrow: string;
  titleMain: string;
  titleItalic: string;
  p1: string;
  p2: string;
  retention: string;
  erasure: string;
  quote: string;
}

export interface TechStackTranslations {
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

export interface WhitepaperTranslationMeta {
  label: string;
  value: string;
}

export interface WhitepaperTranslations {
  badge: string;
  title: string;
  subtitle: string;
  highlights: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  detailsLabel: string;
  meta: WhitepaperTranslationMeta[];
}

export interface ArchitectureProduct {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface ArchitectureTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  products: ArchitectureProduct[];
}

export interface RoiTranslations {
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

export interface MarketplaceCardImage {
  base: string;
  alt: string;
}

export interface MarketplaceCard {
  title: string;
  desc: string;
  image: MarketplaceCardImage;
}

export interface MarketplaceTranslations {
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

export interface PrivateOfferTranslations {
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

export interface FooterTranslations {
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

export interface PageContent {
  title: string;
  description: string;
  body: string[];
}

export interface PagesTranslations {
  about: PageContent;
  careers: PageContent;
  contact: PageContent;
  privacy: PageContent;
  terms: PageContent;
  sla: PageContent;
}

export interface TerminalTranslations {
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

export interface ContactFormTranslations {
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

export interface SocialProofTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  testimonials: { quote: string; author: string; role: string; org: string }[];
  badges: string[];
}

export interface Translations {
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

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
  "product": "REX Guard",
  "paradox": "Authority Gap",
  "howItWorks": "How It Works",
  "architecture": "Architecture",
  "evidence": "Evidence",
  "enterprise": "Enterprise",
  "evaluation": "Evaluate REX Guard"
},
    hero: {
  "badge": "Auditable Trust Infrastructure",
  "title1": "AI can propose.",
  "title2": "Authority must be verified.",
  "subtitle": "REX Guard is Auditable Trust Infrastructure for consequential AI actions. It verifies authority, enforces deterministic policy, and produces cryptographically verifiable evidence before execution.",
  "cta1": "Evaluate REX Guard",
  "cta2": "View Architecture",
  "ctaVideo": "View Simulation",
  "scroll": "Understand the problem"
},
    video: {
      title: "Inside the FoundLab Sovereign Stack",
      generateBtn: "Render AI Overview (Veo)",
      generating: "Preparing infrastructure visualization...",
      waiting: "Calibrating protected execution boundary...",
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
  "eyebrow": "The authority gap",
  "titleMain": "Generating an action",
  "titleItalic": "is not authorizing it.",
  "p1": "Probabilistic systems propose increasingly consequential actions. Institutional authority remains explicit, scoped, revocable and attributable — not a property of the model.",
  "p2": "Authenticating a user, workload, network or model is not enough. At the execution boundary, authorization must be checked for that action, purpose and context, at that moment.",
  "retention": "Probabilistic proposal",
  "erasure": "Institutional authority",
  "quote": "Is this actor authorized to perform this action, for this purpose, in this context, now?"
},
    techStack: {
  "eyebrow": "Integration context",
  "title": "Models propose. REX Guard verifies.",
  "subtitle": "Model infrastructure does not grant authority. REX Guard enforces the execution boundary independently of the model that originated the intent.",
  "challenge": {
    "title": "Intent source",
    "desc": "Gemini via Vertex AI and NVIDIA NIM services can form the inference layer. Their outputs remain proposals."
  },
  "solution": {
    "title": "Execution boundary",
    "desc": "The institution defines who may act, for what purpose and within which scope. The protected connector receives only authorized actions."
  },
  "quote": "The model proposes. The institution retains authority.",
  "features": [
    {
      "title": "NVIDIA NIM",
      "desc": "Inference infrastructure"
    },
    {
      "title": "Google Cloud Run",
      "desc": "Execution substrate"
    },
    {
      "title": "VPC Service Controls",
      "desc": "Perimeter controls"
    }
  ]
},
    whitepaper: {
  "badge": "Research archive",
  "title": "Historical Privacy Research",
  "subtitle": "Historical research on privacy and retention. It preserves terminology and assumptions from its publication; it does not define the current category or REX Guard specification.",
  "highlights": [
    "Explores data minimization and separation of content from evidence.",
    "Zero-Persistence is an architecture and privacy topic, not the central product thesis.",
    "For runtime authority and protected actions, refer to the current REX Guard architecture."
  ],
  "ctaPrimary": "Read historical research",
  "ctaSecondary": "View REX Guard",
  "detailsLabel": "Document context",
  "meta": [
    {
      "label": "Type",
      "value": "Historical research"
    },
    {
      "label": "Topic",
      "value": "Privacy"
    },
    {
      "label": "Current product",
      "value": "REX Guard"
    }
  ]
},
    architecture: {
  "eyebrow": "REX Guard architecture",
  "title": "Control at the execution boundary.",
  "subtitle": "Between AI-generated intent and the enterprise system, REX Guard verifies authority and enforces deterministic policy. These conceptual modules separate proposal, authorization, execution and evidence; the cloud provider is substrate, not the product.",
  "products": [
    {
      "title": "Identity & Authority",
      "subtitle": "Caller · tenant · context",
      "description": "Verifies caller identity and institutional authority context at runtime. Authentication does not replace authorization.",
      "tag": "Authority"
    },
    {
      "title": "Purpose & Action Binding",
      "subtitle": "Scope · time · revocation",
      "description": "Binds authorization to the institution-defined purpose, action and scope, accounting for temporal validity and revocation.",
      "tag": "Context binding"
    },
    {
      "title": "Deterministic Policy Engine",
      "subtitle": "Rules-as-Code · fail closed",
      "description": "Evaluates explicit rules. If required authority cannot be proven, the protected action does not execute.",
      "tag": "Policy enforcement"
    },
    {
      "title": "Protected Execution",
      "subtitle": "Connector · adapter · replay",
      "description": "The adapter verifies authorization before reaching the downstream system. Execution-context binding supports rejection of improper reuse.",
      "tag": "Execution boundary"
    },
    {
      "title": "DecisionID & Receipt",
      "subtitle": "Cryptographic evidence",
      "description": "Identifies the authorization outcome and associates it with a signed receipt. Verification proves properties of the record, not the substantive correctness of a decision.",
      "tag": "Auditable evidence"
    },
    {
      "title": "Reconciliation & Observability",
      "subtitle": "Outbox · execution state",
      "description": "Correlates authorization, execution attempt and observed outcome. Outbox and reconciliation address pending delivery without equating authorization with completion.",
      "tag": "Traceability"
    }
  ]
},
    roi: {
      eyebrow: "Proof in Production",
      title: "The 16-Minute Resolution.",
      subtitle: "A historical incident pattern illustrating why AI proposals need explicit authority, deterministic policy and verifiable execution evidence.",
      incident: {
        label: "Incident Detected",
        desc: "Unauthorized client data upload into a consumer AI assistant."
      },
      timeline: {
        legacy: "21 Hours (Manual Playbooks)",
        foundlab: "REX Guard evaluation (illustrative)",
        label: "Response Time"
      },
      metrics: {
        saved: "DecisionID",
        savedLabel: "Liability Averted",
        reduction: "Fail closed",
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
        output: "REX Guard evaluation"
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
        description: "We build Auditable Trust Infrastructure for consequential AI actions.",
        body: [
          "FoundLab develops REX Guard: infrastructure that verifies authority and enforces deterministic policy at the enterprise execution boundary.",
          "AI may interpret, recommend and propose actions. Institutional authority remains outside the model. REX Guard connects protected execution with identifiable, cryptographically verifiable evidence."
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
          "FoundLab documents the product boundary and data handling in the applicable agreement. REX Guard is designed to keep authority evaluation separate from model output; deployment-specific retention and processing terms must be verified for each environment.",
          "Any telemetry collected is strictly for system health (uptime, latency) and contains no PII or financial secrets. We are architecturally designed to not retain what we never held."
        ]
      },
      terms: {
        title: "Terms of Service",
        description: "The rules of engagement for sovereign infrastructure.",
        body: [
          "Services are provided under a Master Service Agreement (MSA) executed via Google Cloud Marketplace Private Offer.",
          "The institution defines authority and remains responsible for its deployment. REX Guard verifies the configured boundary and records the authorization outcome; deployment terms are defined in the applicable agreement."
        ]
      },
      sla: {
        title: "Service Level Agreement",
        description: "Service terms and operational targets are defined in the applicable agreement.",
        body: [
          "Operational targets, support windows and remedies are defined in the applicable agreement; no universal latency or availability claim is made here.",
          "Critical incidents (P1) trigger an immediate swarm response from our engineering core, not a support ticket queue."
        ]
      }
    },
    terminal: {
  "eyebrow": "REX Guard · illustrative demo",
  "title": {
    "line1": {
      "pre": "Verify",
      "highlight": "authority",
      "post": "."
    },
    "line2": {
      "pre": "Inspect",
      "highlight": "evidence",
      "post": "."
    }
  },
  "description": {
    "pre": "In this illustrative flow,",
    "strong": "REX Guard",
    "post": "evaluates authorization before execution. DecisionID and a signed receipt identify the outcome; they do not represent storage of complete model inputs and outputs."
  },
  "bullets": [
    "Authorization bound to purpose and context",
    "Denied actions do not reach the protected system",
    "A signature verifies the record, not the truth of the decision"
  ],
  "logSequence": [
    "> DEMO — not a live execution",
    "> INTENT: payment.release | caller=agent-07 | tenant=bank-demo",
    "> PURPOSE: approved_invoice | scope=invoice-042",
    "> AUTHORITY: identity, scope and validity evaluated",
    "> POLICY: invoice-release/v3 | outcome=ALLOW",
    "> DecisionID=demo-allow-001 | illustrative signed receipt",
    "> PROTECTED EXECUTION: forwarded to adapter",
    "> RECONCILIATION: outcome linked to DecisionID",
    "> REPLAY: grant already consumed | outcome=DENY",
    "> NEW INTENT: unauthorized purpose | outcome=DENY",
    "> DecisionID=demo-deny-002 | illustrative denial receipt",
    "> FAIL CLOSED: protected system not invoked"
  ],
  "statusBar": {
    "status": "Mode: demonstration",
    "memory": "Policy: fail closed",
    "nim": "REX Guard"
  }
},
    footer: {
      desc: "FoundLab builds Auditable Trust Infrastructure (ATI). REX Guard verifies runtime authority, protects consequential actions and produces auditable evidence.",
      headers: {
        platform: "Platform",
        company: "Company",
        legal: "Legal"
      },
      links: {
        arch: "Architecture",
        proto: "REX Guard",
        market: "Enterprise",
        about: "About Us",
        careers: "Careers",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        sla: "SLA"
      },
      rights: "FoundLab. All rights reserved.",
      locations: "Auditable Trust Infrastructure"
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
      title: "Evaluate REX Guard.",
      subtitle: "Request a technical evaluation. Tell us which consequential actions, authority sources and enterprise systems need an execution boundary.",
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
        message: "Describe the action, caller, purpose and downstream system..."
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
  "product": "REX Guard",
  "paradox": "Autoridade",
  "howItWorks": "Como funciona",
  "architecture": "Arquitetura",
  "evidence": "Evidências",
  "enterprise": "Enterprise",
  "evaluation": "Avaliar REX Guard"
},
    hero: {
  "badge": "Auditable Trust Infrastructure",
  "title1": "A IA pode propor.",
  "title2": "A autoridade precisa ser verificada.",
  "subtitle": "REX Guard é uma Infraestrutura de Confiança Auditável para ações de IA com consequência real. Verifica autoridade, aplica políticas determinísticas e produz evidência criptograficamente verificável antes da execução.",
  "cta1": "Avaliar REX Guard",
  "cta2": "Ver Arquitetura",
  "ctaVideo": "Ver Simulação",
  "scroll": "Entenda o problema"
},
    video: {
      title: "Dentro da Stack Soberana da FoundLab",
      generateBtn: "Renderizar Visão com IA (Veo)",
      generating: "Preparando visualização de infraestrutura...",
      waiting: "Calibrando a fronteira de execução protegida...",
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
  "eyebrow": "A lacuna de autoridade",
  "titleMain": "Gerar uma ação",
  "titleItalic": "não é autorizá-la.",
  "p1": "Sistemas probabilísticos propõem ações cada vez mais relevantes. A autoridade institucional continua sendo explícita, delimitada, revogável e atribuível — não uma propriedade do modelo.",
  "p2": "Autenticar um usuário, workload, rede ou modelo não basta. Na fronteira de execução, é preciso verificar a autorização para aquela ação, finalidade e contexto, naquele momento.",
  "retention": "Proposta probabilística",
  "erasure": "Autoridade institucional",
  "quote": "Este ator está autorizado a executar esta ação, para esta finalidade, neste contexto, agora?"
},
    techStack: {
  "eyebrow": "Contexto de integração",
  "title": "Modelos propõem. REX Guard verifica.",
  "subtitle": "A infraestrutura de modelos não concede autoridade. REX Guard aplica a fronteira de execução independentemente do modelo que originou a intenção.",
  "challenge": {
    "title": "Origem da intenção",
    "desc": "Gemini via Vertex AI e serviços NVIDIA NIM podem compor a camada de inferência. Suas saídas continuam sendo propostas."
  },
  "solution": {
    "title": "Fronteira de execução",
    "desc": "A instituição define quem pode agir, com qual finalidade e em qual escopo. O conector protegido recebe apenas ações autorizadas."
  },
  "quote": "O modelo propõe. A instituição mantém a autoridade.",
  "features": [
    {
      "title": "NVIDIA NIM",
      "desc": "Infraestrutura de inferência"
    },
    {
      "title": "Google Cloud Run",
      "desc": "Substrato de execução"
    },
    {
      "title": "VPC Service Controls",
      "desc": "Controles de perímetro"
    }
  ]
},
    whitepaper: {
  "badge": "Arquivo de pesquisa",
  "title": "Pesquisa histórica sobre privacidade",
  "subtitle": "Documento histórico sobre privacidade e retenção. Preserva terminologia e hipóteses da época; não define a categoria atual nem a especificação do REX Guard.",
  "highlights": [
    "Explora minimização de dados e separação entre conteúdo e evidência.",
    "Zero-Persistência é um tema de arquitetura e privacidade, não a tese central do produto.",
    "Para avaliar autoridade em runtime e ações protegidas, consulte a arquitetura atual do REX Guard."
  ],
  "ctaPrimary": "Ler pesquisa histórica",
  "ctaSecondary": "Ver REX Guard",
  "detailsLabel": "Contexto do documento",
  "meta": [
    {
      "label": "Tipo",
      "value": "Pesquisa histórica"
    },
    {
      "label": "Tema",
      "value": "Privacidade"
    },
    {
      "label": "Produto atual",
      "value": "REX Guard"
    }
  ]
},
    architecture: {
  "eyebrow": "Arquitetura do REX Guard",
  "title": "Controle na fronteira de execução.",
  "subtitle": "Entre a intenção gerada por IA e o sistema corporativo, REX Guard verifica autoridade e aplica política determinística. Estes módulos conceituais separam proposta, autorização, execução e evidência; o provedor de nuvem é substrato, não o produto.",
  "products": [
    {
      "title": "Identidade e autoridade",
      "subtitle": "Solicitante · tenant · contexto",
      "description": "Verifica a identidade do solicitante e o contexto de autoridade institucional em tempo de execução. Autenticação não substitui autorização.",
      "tag": "Autoridade"
    },
    {
      "title": "Finalidade e ação",
      "subtitle": "Escopo · tempo · revogação",
      "description": "Vincula a autorização à finalidade, à ação e ao escopo definidos pela instituição, considerando validade temporal e revogação.",
      "tag": "Vínculo de contexto"
    },
    {
      "title": "Política determinística",
      "subtitle": "Rules-as-Code · fail closed",
      "description": "Avalia regras explícitas. Se a autoridade exigida não puder ser comprovada, a ação protegida não é executada.",
      "tag": "Aplicação de política"
    },
    {
      "title": "Execução protegida",
      "subtitle": "Conector · adaptador · replay",
      "description": "O adaptador verifica a autorização antes de alcançar o sistema de destino. O vínculo ao contexto de execução permite rejeitar reutilizações indevidas.",
      "tag": "Fronteira de execução"
    },
    {
      "title": "DecisionID e recibo",
      "subtitle": "Evidência criptográfica",
      "description": "Identifica o resultado da autorização e o associa a um recibo assinado. A verificação comprova propriedades do registro, não a correção substantiva da decisão.",
      "tag": "Evidência auditável"
    },
    {
      "title": "Reconciliação e observabilidade",
      "subtitle": "Outbox · estado de execução",
      "description": "Correlaciona autorização, tentativa de execução e resultado observado. Outbox e reconciliação tratam entregas pendentes sem confundir autorização com conclusão.",
      "tag": "Rastreabilidade"
    }
  ]
},
    roi: {
      eyebrow: "Prova em Produção",
      title: "A Resolução de 16 Minutos.",
      subtitle: "Um padrão histórico de incidente que ilustra por que propostas de IA precisam de autoridade explícita, política determinística e evidência verificável de execução.",
      incident: {
        label: "Incidente Detectado",
        desc: "Upload não autorizado de dados de clientes em um assistente de IA público."
      },
      timeline: {
        legacy: "21 Horas (Playbooks Manuais)",
        foundlab: "Avaliação REX Guard (ilustrativa)",
        label: "Tempo de Resposta"
      },
      metrics: {
        saved: "DecisionID",
        savedLabel: "Passivo Evitado",
        reduction: "Fail closed",
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
        output: "Avaliação do REX Guard"
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
        description: "Desenvolvemos Infraestrutura de Confiança Auditável para ações de IA com consequência real.",
        body: [
          "A FoundLab desenvolve o REX Guard: infraestrutura que verifica autoridade e aplica políticas determinísticas na fronteira de execução corporativa.",
          "A IA pode interpretar, recomendar e propor ações. A autoridade institucional permanece fora do modelo. REX Guard conecta execução protegida a evidência identificável e criptograficamente verificável."
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
          "A FoundLab documenta os limites do produto e o tratamento de dados no contrato aplicável. O REX Guard separa a avaliação de autoridade da saída do modelo; retenção e processamento devem ser verificados para cada ambiente.",
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
        description: "Termos de serviço e metas operacionais são definidos no contrato aplicável.",
        body: [
          "Metas operacionais, janelas de suporte e remédios são definidos no contrato aplicável; nenhuma afirmação universal de latência ou disponibilidade é feita aqui.",
          "Incidentes críticos (P1) acionam uma resposta imediata do nosso núcleo de engenharia, não uma fila de suporte."
        ]
      }
    },
    terminal: {
  "eyebrow": "REX Guard · demonstração ilustrativa",
  "title": {
    "line1": {
      "pre": "Verifique a",
      "highlight": "autoridade",
      "post": "."
    },
    "line2": {
      "pre": "Inspecione a",
      "highlight": "evidência",
      "post": "."
    }
  },
  "description": {
    "pre": "Neste fluxo ilustrativo, o",
    "strong": "REX Guard",
    "post": "avalia a autorização antes da execução. DecisionID e recibo assinado identificam o resultado; não representam armazenamento integral de entradas e saídas do modelo."
  },
  "bullets": [
    "Autorização vinculada à finalidade e ao contexto",
    "Ação negada não alcança o sistema protegido",
    "Assinatura verifica o registro, não a verdade da decisão"
  ],
  "logSequence": [
    "> DEMONSTRAÇÃO — não é uma execução real",
    "> INTENÇÃO: payment.release | caller=agent-07 | tenant=bank-demo",
    "> FINALIDADE: approved_invoice | scope=invoice-042",
    "> AUTORIDADE: identidade, escopo e validade avaliados",
    "> POLÍTICA: invoice-release/v3 | resultado=ALLOW",
    "> DecisionID=demo-allow-001 | recibo assinado ilustrativo",
    "> EXECUÇÃO PROTEGIDA: encaminhada ao adaptador",
    "> RECONCILIAÇÃO: resultado associado ao DecisionID",
    "> REPLAY: autorização já consumida | resultado=DENY",
    "> NOVA INTENÇÃO: finalidade não autorizada | resultado=DENY",
    "> DecisionID=demo-deny-002 | recibo de negação ilustrativo",
    "> FAIL CLOSED: sistema protegido não acionado"
  ],
  "statusBar": {
    "status": "Modo: demonstração",
    "memory": "Política: fail closed",
    "nim": "REX Guard"
  }
},
    footer: {
      desc: "A FoundLab desenvolve Infraestrutura de Confiança Auditável (Auditable Trust Infrastructure, ATI). REX Guard verifica autoridade em runtime, protege ações e produz evidência auditável.",
      headers: {
        platform: "Plataforma",
        company: "Empresa",
        legal: "Legal"
      },
      links: {
        arch: "Arquitetura",
        proto: "REX Guard",
        market: "Enterprise",
        about: "Sobre",
        careers: "Carreiras",
        contact: "Contato",
        privacy: "Privacidade",
        terms: "Terms of Service",
        sla: "SLA"
      },
      rights: "FoundLab. Todos os direitos reservados.",
      locations: "Auditable Trust Infrastructure"
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
      title: "Avaliar REX Guard.",
      subtitle: "Solicite uma avaliação técnica. Conte quais ações, fontes de autoridade e sistemas corporativos precisam de uma fronteira de execução.",
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
        message: "Descreva a ação, o solicitante, a finalidade e o sistema de destino..."
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
