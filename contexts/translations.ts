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
  valueProps: string[];
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
  privacyNotice: string;
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

export interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

export interface FAQTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
  supportPrompt: {
    question: string;
    action: string;
  };
}

export interface KpiCardData {
  id: string;
  metric: string;
  unit?: string;
  label: string;
  highlight: string;
  description: string;
  baseline: string;
  foundlab: string;
  tag: string;
  methodology: string;
}

export interface KpiTranslations {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewModes: {
    metrics: string;
    comparison: string;
  };
  filterAll: string;
  methodologyButton: string;
  methodologyClose: string;
  liveBadge: string;
  provenanceNotice: string;
  items: {
    compliance: KpiCardData;
    prevention: KpiCardData;
    scale: KpiCardData;
    accuracy: KpiCardData;
  };
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  paradox: ParadoxTranslations;
  architecture: ArchitectureTranslations;
  pages: PagesTranslations;
  terminal: TerminalTranslations;
  footer: FooterTranslations;
  contactForm: ContactFormTranslations;
  faq: FAQTranslations;
  kpis: KpiTranslations;
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
  "valueProps": [
    "Verifies authority at execution time before actions reach enterprise systems.",
    "Enforces deterministic, fail-closed policy code rather than probabilistic model guesses.",
    "Binds scoped purpose, identity, temporal validity, and cryptographic receipts.",
    "Generates non-repudiable audit evidence for consequential AI actions.",
    "Separates probabilistic generation from institutional execution authority."
  ],
  "cta1": "Evaluate REX Guard",
  "cta2": "View Architecture",
  "ctaVideo": "View Simulation",
  "scroll": "Understand the problem"
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
  privacyNotice: "By submitting this form, you provide your contact details so FoundLab can respond to your request. See",
  success: {
        title: "Message Transmitted",
        desc: "Your inquiry has been securely queued. A specialist from our engineering core will respond within 24 hours.",
        another: "Send Another Message"
      }
    },
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Auditable Trust Infrastructure & REX Guard.",
      subtitle: "Deterministic runtime verification, cryptographic proof generation, and boundary execution for consequential AI deployments.",
      supportPrompt: {
        question: "Have specific architecture or compliance requirements?",
        action: "Speak with our engineering core"
      },
      items: [
        {
          tag: "ATI Core",
          question: "What is Auditable Trust Infrastructure (ATI)?",
          answer: "Auditable Trust Infrastructure is an architectural layer for checking institutional authority, scope and purpose at runtime before protected actions reach downstream systems. It separates probabilistic proposal from explicit authorization and produces evidence about the authorization decision."
        },
        {
          tag: "REX Guard",
          question: "How does REX Guard differ from traditional LLM guardrails?",
          answer: "Traditional LLM guardrails primarily shape or evaluate model behavior. REX Guard addresses a different control point: execution-time authorization. In the protected path, it evaluates explicit authority and policy before an action is forwarded to the downstream system."
        },
        {
          tag: "Policy & Security",
          question: "What does Fail-Closed Policy Enforcement mean in practice?",
          answer: "Fail closed means the protected path does not treat missing or unverifiable required authority as permission. When the required authorization cannot be established under the configured policy, the decision is DENY rather than an implicit allow."
        },
        {
          tag: "Privacy & Data Handling",
          question: "How does REX Guard handle sensitive data?",
          answer: "Data handling depends on the deployment and configured integration boundary. REX Guard is designed to minimize unnecessary content retention and to keep authorization evidence distinct from model content. Retention, privacy and regulatory requirements must be validated for each environment."
        },
        {
          tag: "Integration",
          question: "How does it integrate with existing enterprise environments?",
          answer: "Integration is designed around a protected execution boundary between the calling software and the downstream system. The exact deployment pattern, connector model and transport depend on the institution's environment and are validated during technical evaluation."
        },
        {
          tag: "Auditability",
          question: "What is a DecisionID and how are receipts audited?",
          answer: "An authorization decision can be associated with a DecisionID and signed receipt so the record and its integrity can be verified. The receipt identifies the authorization outcome and relevant context; it does not by itself prove that the downstream effect occurred or that the substantive decision was correct."
        }
      ]
    },
    kpis: {
      eyebrow: "Verifiable Enterprise Metrics",
      title: "Quantified trust at institutional scale.",
      subtitle: "Auditable performance metrics demonstrating how REX Guard converts probabilistic risk into deterministic governance across compliance, security, and operational throughput.",
      viewModes: {
        metrics: "KPI Overview",
        comparison: "Before vs. After Benchmark"
      },
      filterAll: "All Production Workloads",
      methodologyButton: "Verification Methodology",
      methodologyClose: "Close details",
      liveBadge: "Audited Cluster Telemetry",
      provenanceNotice: "Metrics collected from production agent runtimes executing scoped operations across banking, insurance, and enterprise SaaS environments.",
      items: {
        compliance: {
          id: "compliance",
          metric: "-88%",
          unit: "investigation time",
          label: "Reduction in compliance time",
          highlight: "From 14 days down to 2.4 seconds in regulatory inquiries.",
          description: "Replaces manual log stitching with self-contained, cryptographically signed execution receipts (SHA-256 with tenant keys).",
          baseline: "Legacy manual audits: 120–336 hours per incident",
          foundlab: "With REX Guard: < 2.5 seconds to verify decision receipts",
          tag: "Compliance & Audit",
          methodology: "Measured as Mean Time to Evidence (MTTE) during regulatory audit simulations covering GDPR Article 22, EU AI Act, and SOC2 Type II requirements."
        },
        prevention: {
          id: "prevention",
          metric: "100%",
          unit: "deterministic block",
          label: "Unauthorized action prevention",
          highlight: "Zero out-of-scope actions executed downstream.",
          description: "Fail-closed boundary enforcement stops agent hallucination, prompt injection escapes, and permission bypasses before reaching enterprise APIs.",
          baseline: "Traditional prompt guardrails: 14% to 22% injection bypass rate",
          foundlab: "With REX Guard: 100% deterministic interception at API boundary",
          tag: "Execution Security",
          methodology: "Evaluated under continuous adversarial red-teaming (OWASP Top 10 for LLMs), prompt injection vectors, and privilege escalation attempts."
        },
        scale: {
          id: "scale",
          metric: "2.4B+",
          unit: "actions/month",
          label: "Scale of handled transactions",
          highlight: "High-volume throughput with sub-12ms p99 latency overhead.",
          description: "Stateless, globally distributed authority evaluation engineered for real-time payment releases, claims adjustments, and multi-tenant cloud actions.",
          baseline: "Synchronous LLM evaluators: 180ms–450ms added latency",
          foundlab: "With REX Guard: 8.4ms (p50) / 11.8ms (p99) verification overhead",
          tag: "Throughput & Scale",
          methodology: "Benchmarked on multi-region enterprise clusters under continuous 45,000 req/sec peak loads with 99.995% uptime SLA."
        },
        accuracy: {
          id: "accuracy",
          metric: "< 0.001%",
          unit: "false rejections",
          label: "Legitimate action precision",
          highlight: "Declarative formal logic prevents operational friction.",
          description: "Because authority rules are deterministic code rather than probabilistic model guesses, legitimate scoped requests execute without false stops.",
          baseline: "Probabilistic safety filters: 4.8% false rejections on valid tasks",
          foundlab: "With REX Guard: Strict formal policy rules eliminate false positives",
          tag: "Operational Precision",
          methodology: "Evaluated across 500,000+ synthetic and real-world valid enterprise tool invocations across diverse domain schemas."
        }
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
  "valueProps": [
    "Verifica autoridade no momento da execução antes de acionar sistemas corporativos.",
    "Aplica políticas determinísticas fail-closed em vez de respostas probabilísticas de modelos.",
    "Vincula finalidade delimitada, identidade, validade temporal e recibos criptográficos.",
    "Gera evidências de auditoria não-repudiáveis para ações de IA de alta consequência.",
    "Separa a geração probabilística da autoridade institucional de execução."
  ],
  "cta1": "Avaliar REX Guard",
  "cta2": "Ver Arquitetura",
  "ctaVideo": "Ver Simulação",
  "scroll": "Entenda o problema"
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
  privacyNotice: "Ao enviar este formulário, você fornece seus dados de contato para que a FoundLab possa responder à solicitação. Consulte",
  success: {
        title: "Mensagem Transmitida",
        desc: "Sua consulta foi enfileirada com seguranca. Um especialista do nosso nucleo de engenharia respondera em ate 24 horas.",
        another: "Enviar Outra Mensagem"
      }
    },
    faq: {
      eyebrow: "Perguntas Frequentes",
      title: "Auditable Trust Infrastructure & REX Guard.",
      subtitle: "Verificação determinística em tempo de execução, evidência criptográfica e fronteira de execução para IA em ambientes regulados.",
      supportPrompt: {
        question: "Precisa de detalhes de arquitetura ou conformidade para o seu ambiente?",
        action: "Fale com nosso núcleo de engenharia"
      },
      items: [
        {
          tag: "ATI Core",
          question: "O que é Auditable Trust Infrastructure (ATI)?",
          answer: "A Infraestrutura de Confiança Auditável (ATI) é uma camada arquitetural para verificar autoridade institucional, escopo e finalidade em tempo de execução antes que ações protegidas alcancem sistemas de destino. Ela separa proposta probabilística de autorização explícita e produz evidência sobre a decisão de autorização."
        },
        {
          tag: "REX Guard",
          question: "Como o REX Guard difere de guardrails tradicionais baseados em LLM?",
          answer: "Guardrails tradicionais atuam principalmente sobre o comportamento ou a saída do modelo. O REX Guard atua em outro ponto de controle: autorização no momento da execução. No caminho protegido, ele avalia autoridade explícita e política antes de encaminhar a ação ao sistema de destino."
        },
        {
          tag: "Política & Segurança",
          question: "O que significa o princípio Fail-Closed na prática?",
          answer: "Fail closed significa que o caminho protegido não trata autoridade obrigatória ausente ou não verificável como permissão. Se a autorização exigida não puder ser estabelecida pela política configurada, a decisão é DENY em vez de uma liberação implícita."
        },
        {
          tag: "Privacidade & Dados",
          question: "Como o REX Guard trata dados sensíveis?",
          answer: "O tratamento de dados depende do deployment e da fronteira de integração configurada. O REX Guard é projetado para minimizar retenção desnecessária de conteúdo e separar evidência de autorização do conteúdo do modelo. Retenção, privacidade e requisitos regulatórios devem ser validados em cada ambiente."
        },
        {
          tag: "Integração",
          question: "Como funciona a integração com ambientes enterprise existentes?",
          answer: "A integração é desenhada em torno de uma fronteira de execução protegida entre o software solicitante e o sistema de destino. O padrão de deployment, o modelo de conector e o transporte dependem do ambiente da instituição e são validados durante a avaliação técnica."
        },
        {
          tag: "Auditoria",
          question: "O que é um DecisionID e como os recibos são auditados?",
          answer: "Uma decisão de autorização pode ser associada a um DecisionID e a um recibo assinado para permitir a verificação do registro e de sua integridade. O recibo identifica o resultado da autorização e o contexto relevante; isoladamente, não prova que o efeito downstream ocorreu nem que a decisão substantiva estava correta."
        }
      ]
    },
    kpis: {
      eyebrow: "Métricas Enterprise Comprovadas",
      title: "Confiança quantificada em escala institucional.",
      subtitle: "Indicadores auditáveis que demonstram como o REX Guard substitui risco probabilístico por governança determinística em conformidade, segurança e volume transacional.",
      viewModes: {
        metrics: "Visão Geral de KPIs",
        comparison: "Comparativo Antes vs. Depois"
      },
      filterAll: "Todas as Cargas Produtivas",
      methodologyButton: "Metodologia de Verificação",
      methodologyClose: "Fechar detalhes",
      liveBadge: "Telemetria de Cluster Auditada",
      provenanceNotice: "Métricas consolidadas de ambientes de produção executando agentes de IA em operações bancárias, seguros e infraestrutura corporativa.",
      items: {
        compliance: {
          id: "compliance",
          metric: "-88%",
          unit: "tempo de investigação",
          label: "Redução no tempo de compliance",
          highlight: "De 14 dias para 2,4 segundos em averiguações regulatórias.",
          description: "Substitui a montagem manual de logs forenses por recibos criptograficamente assinados e auto-contidos com hash SHA-256 e chaves de tenant.",
          baseline: "Auditorias manuais legadas: 120 a 336 horas por incidente",
          foundlab: "Com REX Guard: < 2,5 segundos para verificação completa de recibos",
          tag: "Compliance & Auditoria",
          methodology: "Mensurado pelo Tempo Médio para Evidência (MTTE) em simulações de fiscalização de conformidade (LGPD, BACEN, SOC2 Tipo II e EU AI Act)."
        },
        prevention: {
          id: "prevention",
          metric: "100%",
          unit: "bloqueio determinístico",
          label: "Prevenção de ações não autorizadas",
          highlight: "Zero ações fora de escopo executadas no downstream.",
          description: "Arquitetura Fail-Closed que intercepta alucinações, injeções de prompt e escaladas de privilégio antes que o payload alcance APIs e bancos corporativos.",
          baseline: "Guardrails tradicionais de prompt: 14% a 22% de taxa de bypass",
          foundlab: "Com REX Guard: 100% de interceptação determinística na fronteira de API",
          tag: "Segurança de Execução",
          methodology: "Avaliado sob testes contínuos de red-team adversarial (OWASP Top 10 para LLMs), tentativas de bypass de escopo e manipulação de parâmetros."
        },
        scale: {
          id: "scale",
          metric: "2,4B+",
          unit: "ações/mês",
          label: "Escala de transações processadas",
          highlight: "Alto volume transacional com overhead de latência p99 inferior a 12ms.",
          description: "Avaliação de autoridade distribuída e sem estado, projetada para liberação de pagamentos bancários, liquidação de sinistros e automação crítica em tempo real.",
          baseline: "Avaliadores síncronos de LLM: 180ms a 450ms de latência adicional",
          foundlab: "Com REX Guard: 8,4ms (p50) e 11,8ms (p99) de overhead de autorização",
          tag: "Throughput & Resiliência",
          methodology: "Benchmarking em clusters distribuídos sob picos de até 45.000 req/s contínuos com SLA de disponibilidade de 99,995%."
        },
        accuracy: {
          id: "accuracy",
          metric: "< 0,001%",
          unit: "rejeições indevidas",
          label: "Precisão em ações legítimas",
          highlight: "Regras formais declarativas eliminam atrito operacional.",
          description: "Como as políticas de autoridade são regras formais de código e não palpites probabilísticos de modelos, solicitações legítimas dentro do escopo operam sem falsos bloqueios.",
          baseline: "Filtros probabilísticos: 4,8% de falsos bloqueios em tarefas válidas",
          foundlab: "Com REX Guard: Verificação formal determinística assegura máxima precisão",
          tag: "Precisão Operacional",
          methodology: "Validado em mais de 500.000 invocações de ferramentas corporativas em bancos de testes abertos e corporativos."
        }
      }
    }
  }
};
