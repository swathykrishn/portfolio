import { Component, OnInit, OnDestroy, signal, HostListener, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'enterprise-health' | 'fullstack-dotnet' | 'mobile-cloud';
  client: string;
  year: string;
  description: string;
  longDescription: string;
  stats: { label: string; value: string }[];
  tags: string[];
  gradient: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  architectureDetails: string[];
  image: string;
  categoryTag?: string;
  categoryType?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'frontend' | 'backend-db' | 'cloud-tools' | 'ai-modern';
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isPromotion?: boolean;
  previousRole?: string;
  highlight: string;
  bullets: string[];
  tags: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  // Theme state: Creative Aurora themes
  activeTheme = signal<'aurora' | 'violet' | 'emerald' | 'amber'>('aurora');
  
  // Mild Sugar Hero Room Interactive Turn-Around State
  isHeroTurnedAround = signal<boolean>(false);
  
  // Navigation & UI state
  activeSection = signal<string>('hero');
  selectedCategory = signal<string>('all');
  selectedProject = signal<Project | null>(null);
  copiedEmail = signal<boolean>(false);
  copiedPhone = signal<boolean>(false);
  isTerminalOpen = signal<boolean>(false);
  selectedSkill = signal<SkillItem | null>(null);
  activeSkillTab = signal<'frontend' | 'backend-db' | 'cloud-tools' | 'ai-modern'>('frontend');

  // Code preview switcher for Hero section
  activeCodeSnippet = signal<'angular' | 'dotnet' | 'sql'>('angular');

  // Interactive CLI drawer state
  terminalInput = signal<string>('');
  terminalHistory = signal<{ command: string; output: string }[]>([
    { command: 'whoami', output: 'Swathy Krishna — Senior Full Stack Developer (.NET & Angular) based in Malta.' },
    { command: 'promotion', output: '★ 2025: Promoted to Full Stack Developer @ Cursor Limited, Malta.' },
    { command: 'specialization', output: 'High-reliability enterprise government systems for the Malta Ministry of Health.' },
    { command: 'type "help"', output: 'Available: help, skills, projects, contact, awards, clear' }
  ]);

  // Contact form state
  contactName = signal<string>('');
  contactEmail = signal<string>('');
  contactType = signal<string>('Senior Full Stack Developer Role');
  contactMessage = signal<string>('');
  contactSubmitted = signal<boolean>(false);

  // Candidate Details
  readonly candidate = {
    name: 'Swathy Krishna',
    title: 'Full Stack Developer',
    specialization: 'Angular • .NET Core • Azure DevOps • SQL Server',
    location: 'Birkirkara, Malta',
    phone: '+356 77925861',
    email: 'krishnaswathy9396@gmail.com',
    linkedin: 'https://www.linkedin.com/in/swathyk9396/',
    experienceYears: '5+ Years',
    summary: 'Results-driven IT professional with 5+ years of experience engineering high-impact full-stack and frontend systems. Specializing in government-grade applications for the Malta Ministry of Health using Angular and .NET. Promoted from System Implementation Specialist (2023) to Full Stack Developer (2025) at Cursor Limited, Malta.'
  };

  // Rotating roles ticker for Full Stack post
  readonly roles = [
    'Full Stack Developer',
    'Angular & .NET Core Specialist',
    'Government Systems Architect',
    'Azure Cloud & SQL Server Engineer',
    'UI/UX & Mobile Solutions Builder'
  ];
  currentRoleIndex = signal<number>(0);
  private roleInterval: any;

  // Selected Projects showcasing government, healthcare, and statutory registry systems
  readonly projects = signal<Project[]>([
    {
      id: 'malta-cemeteries',
      title: 'Cemeteries & Burial 2.0',
      tagline: 'National burial permit generation, plot management & cemetery maintenance system',
      client: 'Malta Ministry of Health (Cursor Limited)',
      category: 'enterprise-health',
      year: '2023 — Present',
      featured: true,
      image: 'work-cemeteries.png',
      categoryTag: 'Government',
      categoryType: 'Burial & Registry',
      gradient: 'from-blue-500/30 via-indigo-600/20 to-slate-900/40',
      description: 'Mission-critical national system modernizing cemetery plot management, burial records, statutory certificates, and public health administration across the Maltese islands.',
      longDescription: 'Started from inception by meeting directly with cemetery superintendents and Malta Ministry of Health officials to analyze intricate legacy paper records and municipal workflows. Authored exhaustive implementation documents, database schemas, and statutory process blueprints that secured formal scope approval. Engineered the full-stack solution using Angular and ASP.NET Core with SQL Server for spatial plot tracking, grave registry searches, transfer deeds, and public health statutory compliance, working in tight alignment with the engineering team through production rollout and user training.',
      stats: [
        { label: 'Platform Scope', value: 'National' },
        { label: 'Core Modules', value: 'Burial & Graves' },
        { label: 'Architecture', value: 'Angular + .NET' }
      ],
      tags: ['Angular', '.NET Core', 'Microsoft SQL Server', 'Azure DevOps', 'TypeScript', 'Implementation Scoping'],
      architectureDetails: [
        'Initiated project with client stakeholder interviews, formulating comprehensive implementation documents and workflow blueprints.',
        'Engineered relational SQL Server schema for historical cemetery graves, plot deeds, and lineage tracking.',
        'Developed responsive Angular interface with interactive plot queries and audit-logged registrar workflows.',
        'Conducted end-user training sessions for municipal and health ministry registry staff, ensuring smooth adoption.'
      ]
    },
    {
      id: 'organ-donation',
      title: 'Organ Donation — Registering Your Wish',
      tagline: 'National organ donor register & hospital transplant coordination platform (servizz.gov.mt)',
      client: 'Malta Ministry of Health (Cursor Limited)',
      category: 'enterprise-health',
      year: '2024 — Present',
      featured: true,
      image: 'work-organdonation.png',
      categoryTag: 'Healthcare',
      categoryType: 'National Register',
      gradient: 'from-emerald-500/30 via-teal-600/20 to-slate-900/40',
      description: 'High-security national healthcare registry managing citizen organ donor consent, clinical compatibility checks, and real-time coordination for hospital transplant teams.',
      longDescription: 'Spearheaded project kickoff by meeting with hospital transplant coordinators, clinical directors, and Ministry of Health stakeholders. Formulated high-security implementation documents covering strict GDPR compliance, cryptographic verification, and medical authorization pathways. Collaborated with the technical team to architect and deliver the full-stack system in Angular, ASP.NET Core, and Microsoft SQL Server, delivering instantaneous, tamper-evident donor lookups during critical emergency procedures.',
      stats: [
        { label: 'Lookup Speed', value: '< 20ms' },
        { label: 'Availability', value: '99.99%' },
        { label: 'Compliance', value: 'Strict GDPR' }
      ],
      tags: ['Angular', '.NET Core', 'C#', 'SQL Server', 'Security & Audit', 'Azure DevOps'],
      architectureDetails: [
        'Authored end-to-end implementation architecture aligning with national organ donation statutory requirements.',
        'Implemented secure role-based access control with real-time audit logs for clinical emergency lookups.',
        'Created reactive Angular donor verification dashboards with instant citizen ID query engine.',
        'Coordinated with technical team to validate zero-downtime deployment on national health cloud.'
      ]
    },
    {
      id: 'imas',
      title: 'IMAS — In-Patients Medicines Approval System',
      tagline: 'National clinical medicines approval, consultant review & patient requests platform',
      client: 'Malta Ministry of Health (Cursor Limited)',
      category: 'enterprise-health',
      year: '2024 — 2025',
      featured: true,
      image: 'work-imas.png',
      categoryTag: 'Clinical',
      categoryType: 'Medicines Approval',
      gradient: 'from-teal-500/30 via-emerald-600/20 to-cyan-950/40',
      description: 'Unified government healthcare platform digitizing medical board assessments, multi-specialist clinical evaluations, disability scoring, and welfare entitlements.',
      longDescription: 'Began the project by conducting extensive requirement gathering meetings with medical boards, presiding physicians, and health administrators. Prepared detailed system implementation documents and clinical evaluation matrices that streamlined the assessment lifecycle. Collaborated closely with developers and QA to build and deliver full-stack modules in ASP.NET Core and Angular with Microsoft SQL Server, enabling multi-specialist medical case evaluation, digital document attachment, and automated assessment scoring.',
      stats: [
        { label: 'Processing Speed', value: '+60% Faster' },
        { label: 'Scope', value: 'Multi-Board' },
        { label: 'Stack', value: '.NET Core & Angular' }
      ],
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'Medical Workflows', 'TypeScript', 'Azure Boards'],
      architectureDetails: [
        'Drafted structured implementation documentation mapping intricate clinical assessment criteria and board reviews.',
        'Built dynamic medical form engines and scoring algorithms using reactive Angular pipelines.',
        'Integrated secure document storage and digital signature workflows for official board decisions.',
        'Led agile sprint boards on Azure DevOps to ensure on-schedule milestone delivery.'
      ]
    },
    {
      id: 'healthcare-licensing',
      title: 'HCSL Portal — Healthcare Standard Licensing',
      tagline: 'Statutory premises licensing, practitioner permits & regulatory inspections portal',
      client: 'Malta Ministry of Health (Cursor Limited)',
      category: 'enterprise-health',
      year: '2023 — 2024',
      featured: true,
      image: 'work-hcsl.png',
      categoryTag: 'Licensing',
      categoryType: 'Standards & Audit',
      gradient: 'from-green-500/30 via-emerald-600/20 to-slate-900/40',
      description: 'Enterprise licensing and regulatory oversight platform governing private clinics, pharmacies, hospital wards, and practicing medical professional certifications across Malta.',
      longDescription: 'Started the engagement by meeting regulatory licensing boards to analyze accreditation criteria and statutory inspection protocols. Produced complete implementation documentation defining license lifecycles, on-site inspection checklists, fee processing, and renewal cadences. Partnered with the development team to engineer robust full-stack modules in .NET Core and Angular, reducing processing backlogs and delivering a transparent, audit-ready licensing platform.',
      stats: [
        { label: 'Turnaround Time', value: '-50% Time' },
        { label: 'Premises Scope', value: 'National' },
        { label: 'Auditing', value: '100% Traceable' }
      ],
      tags: ['Angular', '.NET Core', 'C#', 'SQL Server', 'Licensing & Compliance', 'Monday.com'],
      architectureDetails: [
        'Facilitated client alignment workshops, authoring technical implementation and regulatory compliance documents.',
        'Architected SQL Server database with multi-tier approval states, license renewals, and penalty tracking.',
        'Built clean, intuitive Angular applicant and inspector portals with dynamic form validation.',
        'Trained ministry licensing officers and deployed ongoing post-launch technical enhancements.'
      ]
    },
    {
      id: 'cremation-register',
      title: 'National Cremation Register & Permitting System',
      tagline: 'Statutory cremation registry, medical certificate verification & authority permit system',
      client: 'Malta Ministry of Health (Cursor Limited)',
      category: 'enterprise-health',
      year: '2024 — 2025',
      featured: true,
      image: 'work-cremation.jpg',
      categoryTag: 'Statutory',
      categoryType: 'Permits & Records',
      gradient: 'from-violet-500/30 via-indigo-600/20 to-slate-900/40',
      description: 'Dedicated statutory recording platform implementing Malta\'s national cremation legislation, regulating medical certificate authorizations, family consent, and facility permits.',
      longDescription: 'Coordinated initial requirements gathering with government legal advisors and health authorities to translate national cremation statutory acts into technical specifications. Authored rigorous implementation documentation establishing sequential verification stages required prior to permit issuance. Engineered resilient RESTful APIs in C# .NET with an accessible Angular frontend and SQL Server database, working with the team to guarantee airtight legal compliance and tamper-proof records.',
      stats: [
        { label: 'Compliance', value: '100% Statutory' },
        { label: 'Verification', value: 'Multi-Stage' },
        { label: 'Audit Trail', value: 'Immutable' }
      ],
      tags: ['Angular', '.NET Core', 'SQL Server', 'Legal Compliance', 'RESTful APIs', 'Azure DevOps'],
      architectureDetails: [
        'Created formal implementation specifications matching Malta\'s national cremation act legal frameworks.',
        'Engineered multi-party authorization gates preventing certificate issuance without required sign-offs.',
        'Constructed high-clarity registrar interfaces in Angular for quick data input and verification.',
        'Partnered with technical team through sprint cycles to ensure timely delivery and client sign-off.'
      ]
    }
  ]);

  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.projects();
    return this.projects().filter(p => p.category === cat);
  });

  // Flagship Selected Works (Curated Enterprise Systems)
  selectedWorks = computed(() => this.projects().filter(p => p.featured));

  // Related Works (Secondary Systems, UI Libraries & Analytics)
  relatedWorks = computed(() => this.projects().filter(p => !p.featured));

  // Pushing Boundaries Pillars (Engineering Philosophy & Benchmarks)
  readonly boundaryPillars = [
    {
      number: '01',
      title: 'Sub-Second Database Telemetry',
      metric: '45% Faster',
      metricLabel: 'Query Latency Reduction',
      tagline: 'Enterprise T-SQL performance tuning for national healthcare records.',
      description: 'Pushing beyond typical ORM defaults by architecting custom clustered indexes, execution plan profiling, and partitioned tables in Microsoft SQL Server to serve millions of sensitive patient events instantaneously.',
      technologies: ['MS SQL Server', 'T-SQL Optimization', 'Index Tuning', 'ETL Pipelines']
    },
    {
      number: '02',
      title: 'Zero-Downtime System Resilience',
      metric: '99.98%',
      metricLabel: 'Production Availability',
      tagline: 'Fault-tolerant distributed microservices engineered with Polly.',
      description: 'Ensuring critical medical workflows never drop a transaction during network degradation through circuit-breaker policies, exponential backoff retries, and automated Azure DevOps release gates.',
      technologies: ['.NET Core 9', 'Polly Resilience', 'REST APIs', 'Azure DevOps']
    },
    {
      number: '03',
      title: 'AI-Augmented Engineering Speed',
      metric: '+35%',
      metricLabel: 'Feature Delivery Velocity',
      tagline: 'Integrating next-gen developer intelligence into daily enterprise SDLC.',
      description: 'Maximizing delivery velocity and test coverage using Cursor, GitHub Copilot, and LLM-assisted scaffolding for Angular reactive components, automated regression harnesses, and C# controller boilerplate.',
      technologies: ['Cursor', 'GitHub Copilot', 'Prompt Engineering', 'CI/CD Automation']
    },
    {
      number: '04',
      title: 'Human-Centered Clinical Accessibility',
      metric: 'WCAG 2.1 AA',
      metricLabel: 'Accessibility Standard',
      tagline: 'Intuitive UX engineered for doctors, nurses, and administrative staff.',
      description: 'Bridging technical complexity with intuitive interfaces that eliminate cognitive friction for healthcare staff. Tested with live hospital stakeholders during rollout in Malta.',
      technologies: ['Angular 21', 'Reactive Forms', 'Design Systems', 'Figma Prototyping']
    }
  ];

  // Comprehensive Skills Matrix from PDF
  readonly skills = signal<SkillItem[]>([
    // Frontend
    {
      name: 'Angular & TypeScript',
      level: 96,
      category: 'frontend',
      description: 'Expertise across Angular standalone components, signals, reactive forms, routing, RxJS, and dependency injection in enterprise production.',
      tags: ['Angular 14-21', 'TypeScript', 'RxJS', 'Signals', 'HTML5/CSS3']
    },
    {
      name: 'React, Ember.js & Web UI',
      level: 88,
      category: 'frontend',
      description: 'Component lifecycles, state management, reusable widgets, responsive design, Bootstrap, and Tailwind CSS.',
      tags: ['React', 'Ember.js', 'Bootstrap', 'JavaScript', 'Tailwind']
    },
    {
      name: 'Mobile Development (Flutter & Dart)',
      level: 90,
      category: 'frontend',
      description: 'Cross-platform mobile apps for Android & iOS using Flutter, Dart, runtime debugging in Android Studio and VS Code.',
      tags: ['Flutter', 'Dart', 'Android Studio', 'Mobile Architecture']
    },
    
    // Backend & Database
    {
      name: '.NET Core & C# Backend',
      level: 94,
      category: 'backend-db',
      description: 'Building secure, scalable RESTful APIs, ASP.NET Web API, business logic microservices, and Clean Architecture for government applications.',
      tags: ['.NET Core', 'ASP.NET', 'C#', 'REST APIs', 'Microservices']
    },
    {
      name: 'Microsoft SQL Server & Databases',
      level: 92,
      category: 'backend-db',
      description: 'Relational database schema modeling, complex T-SQL queries, stored procedures, indexing, performance tuning, and data integrity.',
      tags: ['MS SQL Server', 'T-SQL', 'Query Optimization', 'Relational DB']
    },
    {
      name: 'PHP, Python & C/C++ (Basics)',
      level: 82,
      category: 'backend-db',
      description: 'Versatile programming capabilities for backend scripting, ETL automation, and system integration.',
      tags: ['PHP', 'Python', 'Scripting', 'C/C++ Basics']
    },

    // Cloud, DevOps & Tools
    {
      name: 'Azure DevOps & CI/CD',
      level: 90,
      category: 'cloud-tools',
      description: 'Build and release pipelines, artifact versioning, Azure Repos, and Git workflows for automated deployment.',
      tags: ['Azure DevOps', 'GitHub', 'Bitbucket', 'CI/CD Pipelines']
    },
    {
      name: 'Agile & Project Management',
      level: 95,
      category: 'cloud-tools',
      description: 'Sprint planning, user story decomposition, client requirement gathering, and delivery tracking across Jira, Azure Boards, and Monday.com.',
      tags: ['Jira', 'Azure Boards', 'Monday.com', 'Agile/Scrum']
    },
    {
      name: 'PowerApps, Power BI & SharePoint',
      level: 86,
      category: 'cloud-tools',
      description: 'Low-code rapid application prototyping, executive data visualization, and enterprise knowledge portals.',
      tags: ['Power BI', 'PowerApps', 'SharePoint', 'Dashboards']
    },

    // AI & Modern UI/UX
    {
      name: 'AI-Augmented Engineering',
      level: 95,
      category: 'ai-modern',
      description: 'Deep daily mastery of AI developer tools: Cursor, GitHub Copilot, ChatGPT, Claude, Gemini, Tabnine, and Notion AI to 3x delivery speed.',
      tags: ['Cursor', 'GitHub Copilot', 'Gemini', 'Claude', 'ChatGPT']
    },
    {
      name: 'UI/UX Design & Prototyping',
      level: 88,
      category: 'ai-modern',
      description: 'Translating business workflows into intuitive user experiences using Figma, Stitch, Draw.io, Edraw.ai, and Canva.',
      tags: ['Figma', 'Draw.io', 'Edraw.ai', 'Design Systems', 'User Journeys']
    }
  ]);

  filteredSkills = computed(() => {
    return this.skills().filter(s => s.category === this.activeSkillTab());
  });

  // Work Experience Chronology reflecting user's exact promotion in 2025 at Cursor Limited
  readonly experiences: ExperienceItem[] = [
    {
      role: 'Full Stack Developer',
      company: 'Cursor Limited',
      location: 'Malta',
      period: '2025 — Present (Current)',
      isPromotion: true,
      previousRole: 'Promoted from System Implementation Specialist',
      highlight: 'Leading full-stack engineering of government-grade applications for the Malta Ministry of Health using Angular and .NET.',
      bullets: [
        'Architecting and implementing scalable enterprise web applications for the Malta Ministry of Health, uniting high-performance Angular frontends with resilient .NET Core backend microservices.',
        'Designing secure REST APIs, database schemas, and optimized queries in Microsoft SQL Server handling millions of national healthcare records.',
        'Overseeing full project lifecycles from stakeholder requirement elicitation to sprint execution, automated testing, and Azure DevOps CI/CD deployments.',
        'Mentoring junior engineers and driving best practices in clean architecture, type safety, and code review standards.'
      ],
      tags: ['Angular', '.NET Core', 'C#', 'SQL Server', 'Azure DevOps', 'Agile', 'Government Systems']
    },
    {
      role: 'System Implementation Specialist',
      company: 'Cursor Limited',
      location: 'Malta',
      period: 'August 2023 — 2025',
      isPromotion: false,
      highlight: 'Awarded "Best Team Member" (March 2024) for successfully implementing and securing project scope approval.',
      bullets: [
        'Developed and implemented enterprise healthcare applications for the Malta Ministry of Health with a primary focus on Angular frontend while maintaining deep backend integration.',
        'Actively engaged in the complete software lifecycle: requirements analysis, scope definition, milestone roadmapping, and timely deliveries.',
        'Conducted client training sessions and post-deployment operational support, ensuring smooth adoption and user satisfaction across government departments.',
        'Collaborated closely with cross-functional technical teams to debug, refine, and optimize production workflows.'
      ],
      tags: ['Angular', '.NET', 'Requirements Scoping', 'Client Training', 'SQL', 'Ministry of Health']
    },
    {
      role: 'Customer Service Representative',
      company: 'Retail Marketing Limited',
      location: 'Malta',
      period: 'July 2022 — August 2023',
      isPromotion: false,
      highlight: 'Managed and resolved multi-channel customer escalations and improved cross-team support workflows.',
      bullets: [
        'Managed customer inquiries, complaints, and escalations across face-to-face, phone, and email channels, adhering strictly to service level agreements.',
        'Collaborated with internal departments to resolve complex issues, document operating procedures, and improve support efficiency.'
      ],
      tags: ['Client Communication', 'Escalation Resolution', 'Team Collaboration', 'Documentation']
    },
    {
      role: 'Junior Software Engineer',
      company: 'Cocobyte Software Solutions',
      location: 'India',
      period: 'August 2020 — May 2022',
      isPromotion: false,
      highlight: 'Awarded "Tech Contribution of the Month" (February 2020). Mentored new joiners in mobile engineering.',
      bullets: [
        'Developed and maintained scalable cross-platform mobile applications using Flutter and Dart.',
        'Utilized Visual Studio and Android Studio for runtime debugging, performance profiling, and bug resolution.',
        'Collaborated with technical leads to gather requirements, write clean modular code, support QA testing, and deliver on-time releases.',
        'Mentored and onboarded new joiners, accelerating ramp-up times across the engineering cohort.'
      ],
      tags: ['Flutter', 'Dart', 'Android Studio', 'Mobile Apps', 'Mentorship', 'Git']
    },
    {
      role: 'Associate Software Engineer',
      company: 'mStack Innovation Labs',
      location: 'India',
      period: 'October 2019 — April 2020',
      isPromotion: false,
      highlight: 'Recognized as Quick Learner completing multiple certifications in Bootstrap and Ember.js during training.',
      bullets: [
        'Designed and developed reusable UI components and widgets using Ember.js, Bootstrap, and modern JavaScript.',
        'Managed daily task assignments, sprint tracking via Jira, and version control deployments via GitHub.',
        'Prioritized individual workloads to ensure timely, high-quality delivery across sprints.'
      ],
      tags: ['Ember.js', 'Bootstrap', 'JavaScript', 'Jira', 'GitHub']
    }
  ];

  // Key Achievements
  readonly achievements = [
    {
      title: 'Promoted to Full Stack Developer (2025)',
      description: 'Recognized for exemplary delivery of health systems at Cursor Limited, Malta, progressing to full-stack engineering lead.',
      badge: 'Promotion'
    },
    {
      title: 'Best Team Member Award (March 2024)',
      description: 'Awarded at Cursor Limited for successfully implementing and securing project scope approval for the Malta Ministry of Health.',
      badge: 'Honor'
    },
    {
      title: 'Tech Contribution of the Month (February 2020)',
      description: 'Awarded at Cocobyte Software Solutions for outstanding mobile engineering performance and technical execution.',
      badge: 'Honor'
    },
    {
      title: 'Engineering Mentorship & Leadership',
      description: 'Successfully mentored multiple new joiners in frontend and mobile architectures, fostering team cohesion.',
      badge: 'Leadership'
    }
  ];

  // Education & Credentials
  readonly education = [
    {
      degree: 'Bachelor of Technology: Computer Science',
      institution: 'MQF Level 6 Accredited',
      period: 'July 2014 — April 2018',
      description: 'Comprehensive core in Computer Science, Data Structures, Algorithms, Software Engineering, and Database Management Systems.'
    },
    {
      degree: 'Data Science Summer Course',
      institution: 'University of Malta',
      period: 'Certified',
      description: 'Specialized statistical modeling, data visualization, and analytical processing methodologies.'
    },
    {
      degree: 'Technical Certifications',
      institution: 'Python & PHP/MySQL Certified',
      period: 'Certified',
      description: 'Validated backend competencies in Python scripting and relational PHP/MySQL systems.'
    }
  ];

  ngOnInit() {
    if (this.isBrowser) {
      this.startRoleTicker();
      this.initCosmicCanvas();
    }
  }

  ngOnDestroy() {
    if (this.roleInterval) {
      clearInterval(this.roleInterval);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser) return;
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;
    const sections = ['hero', 'manifesto', 'process', 'selected-works', 'pushing-boundaries', 'contact'];
    const scrollPos = window.scrollY + 200;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  startRoleTicker() {
    this.roleInterval = setInterval(() => {
      this.currentRoleIndex.update(idx => (idx + 1) % this.roles.length);
    }, 3200);
  }

  setTheme(theme: 'aurora' | 'violet' | 'emerald' | 'amber') {
    this.activeTheme.set(theme);
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  toggleHeroTurnAround() {
    this.isHeroTurnedAround.update(v => !v);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  openProjectModal(project: Project) {
    this.selectedProject.set(project);
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProjectModal() {
    this.selectedProject.set(null);
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  inspectSkill(skill: SkillItem) {
    this.selectedSkill.set(skill);
  }

  closeSkillInspection() {
    this.selectedSkill.set(null);
  }

  toggleTerminal() {
    this.isTerminalOpen.update(v => !v);
  }

  runTerminalCommand(rawCmd: string) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output = '';
    if (cmd === 'help') {
      output = 'Commands: whoami, skills, projects, experience, contact, hire, theme [aurora|violet|emerald|amber], clear';
    } else if (cmd === 'whoami' || cmd === 'bio') {
      output = `${this.candidate.name} — ${this.candidate.title} based in ${this.candidate.location}. ${this.candidate.experienceYears} experience specializing in Angular, .NET Core, SQL Server & Azure DevOps.`;
    } else if (cmd === 'promotion' || cmd === 'promotions') {
      output = '★ 2025: Promoted to Full Stack Developer at Cursor Limited, Malta after successful government project scoping and delivery.';
    } else if (cmd === 'skills') {
      output = 'Core: Angular 14-21, TypeScript, .NET Core, C#, MS SQL Server, Azure DevOps, Flutter, REST APIs, Power BI, AI Developer Tooling (Cursor, Copilot).';
    } else if (cmd === 'projects') {
      output = '1. Malta Cemeteries & Burials Management System | 2. National Organ Donation Registry | 3. IMAS (Integrated Medical Assessment System) | 4. Healthcare Licensing System | 5. National Cremation Register.';
    } else if (cmd === 'experience') {
      output = '• 2025-Present: Full Stack Developer @ Cursor Limited, Malta\n• 2023-2025: System Implementation Specialist @ Cursor Limited\n• 2020-2022: Junior Software Engineer @ Cocobyte Software Solutions';
    } else if (cmd === 'contact' || cmd === 'hire') {
      output = `Email: ${this.candidate.email} | Phone: ${this.candidate.phone} | LinkedIn: ${this.candidate.linkedin}`;
    } else if (cmd === 'awards') {
      output = '★ Best Team Member (March 2024, Cursor Ltd) | ★ Tech Contribution of the Month (Feb 2020, Cocobyte)';
    } else if (cmd.startsWith('theme ')) {
      const themeName = cmd.split(' ')[1] as any;
      if (['aurora', 'violet', 'emerald', 'amber'].includes(themeName)) {
        this.setTheme(themeName);
        output = `Theme switched to "${themeName}".`;
      } else {
        output = 'Invalid theme. Choose: aurora, violet, emerald, amber';
      }
    } else if (cmd === 'clear') {
      this.terminalHistory.set([]);
      this.terminalInput.set('');
      return;
    } else {
      output = `Command not recognized: "${rawCmd}". Type "help" to see available commands.`;
    }

    this.terminalHistory.update(h => [...h, { command: rawCmd, output }]);
    this.terminalInput.set('');
  }

  onTerminalSubmit(e: Event) {
    e.preventDefault();
    const val = this.terminalInput();
    if (val) {
      this.runTerminalCommand(val);
    }
  }

  copyEmail() {
    const email = this.candidate.email;
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        this.copiedEmail.set(true);
        setTimeout(() => this.copiedEmail.set(false), 2400);
      }).catch(() => {
        this.copiedEmail.set(true);
        setTimeout(() => this.copiedEmail.set(false), 2400);
      });
    } else {
      this.copiedEmail.set(true);
      setTimeout(() => this.copiedEmail.set(false), 2400);
    }
  }

  copyPhone() {
    const phone = this.candidate.phone;
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard.writeText(phone).then(() => {
        this.copiedPhone.set(true);
        setTimeout(() => this.copiedPhone.set(false), 2400);
      });
    }
  }

  submitContact(e: Event) {
    e.preventDefault();
    if (!this.contactEmail() || !this.contactName()) return;
    this.contactSubmitted.set(true);
  }

  resetContactForm() {
    this.contactName.set('');
    this.contactEmail.set('');
    this.contactMessage.set('');
    this.contactSubmitted.set(false);
  }

  scrollTo(sectionId: string) {
    if (!this.isBrowser) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Creative Aurora Dynamic Canvas
  private initCosmicCanvas() {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const canvas = document.getElementById('ambient-canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      // Shimmering constellation nodes
      const nodeCount = Math.min(width < 768 ? 30 : 65, 75);
      const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
      const colors = ['rgba(56, 189, 248, 0.7)', 'rgba(99, 102, 241, 0.7)', 'rgba(168, 85, 247, 0.7)', 'rgba(52, 211, 153, 0.6)'];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.8 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      let mouseX = -1000;
      let mouseY = -1000;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      const render = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;

          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;

          // Gentle mouse reaction
          const dxMouse = mouseX - a.x;
          const dyMouse = mouseY - a.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 200) {
            a.x += (dxMouse / distMouse) * 0.7;
            a.y += (dyMouse / distMouse) * 0.7;
          }

          // Draw shimmering node
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
          ctx.fillStyle = a.color;
          ctx.fill();

          // Connect adjacent nodes with radiant lines
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.22;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(render);
      };

      render();
    }, 100);
  }
}
