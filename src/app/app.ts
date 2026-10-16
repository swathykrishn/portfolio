import { Component, OnInit, OnDestroy, signal, HostListener, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web-apps' | 'ui-systems' | 'creative-ai';
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
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design-motion';
  description: string;
  tags: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
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

  // Theme state
  activeTheme = signal<'cyan' | 'violet' | 'emerald' | 'amber'>('cyan');
  
  // Navigation & UI state
  activeSection = signal<string>('hero');
  selectedCategory = signal<string>('all');
  selectedProject = signal<Project | null>(null);
  copiedEmail = signal<boolean>(false);
  isTerminalOpen = signal<boolean>(false);
  selectedSkill = signal<SkillItem | null>(null);
  activeSkillTab = signal<'frontend' | 'backend' | 'design-motion'>('frontend');

  // Contact form state
  contactName = signal<string>('');
  contactEmail = signal<string>('');
  contactType = signal<string>('Freelance Project');
  contactMessage = signal<string>('');
  contactSubmitted = signal<boolean>(false);

  // Rotating headline roles
  readonly roles = [
    'Creative Technologist',
    'Senior Full-Stack Engineer',
    'Design System Architect',
    'Interactive 3D & Motion Specialist'
  ];
  currentRoleIndex = signal<number>(0);
  private roleInterval: any;

  // Selected works list
  readonly projects = signal<Project[]>([
    {
      id: 'aether',
      title: 'Aether Audio',
      tagline: 'Spatial audio synthesizer & generative WebGL soundscape platform',
      category: 'creative-ai',
      year: '2025',
      featured: true,
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      description: 'A browser-based spatial sound synthesizer powered by Web Audio API & WebGL shaders, simulating acoustic room impulse responses in real time.',
      longDescription: 'Aether blends generative ambient algorithmic synthesis with physical acoustics. Built with Angular, WebGL GLSL shaders, and custom Web Audio graph nodes, it provides an ultra-responsive 60FPS visual sound matrix directly in modern browsers without external plugins.',
      stats: [
        { label: 'Latency', value: '< 12ms' },
        { label: 'Render Loop', value: '120 FPS' },
        { label: 'Active Sessions', value: '45k+' }
      ],
      tags: ['Angular', 'WebGL', 'Web Audio API', 'TypeScript', 'GLSL Shaders'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'Custom Web Audio AudioWorklet processing ring buffer with zero garbage collection spikes.',
        'High-density vertex shader mesh with per-frequency displacement.',
        'Deterministic preset serialization using compressed URL hashes.'
      ]
    },
    {
      id: 'chronos',
      title: 'Chronos Telemetry',
      tagline: 'Distributed high-frequency event stream & latency visualization engine',
      category: 'web-apps',
      year: '2024',
      featured: true,
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      description: 'Ultra-low latency telemetry dashboard handling 100,000+ streaming events per second with WebSockets and OffscreenCanvas rendering.',
      longDescription: 'Engineered for distributed infrastructure monitoring. Chronos renders millions of data points smoothly without dropping frames by utilizing worker threads for data aggregation and canvas rendering pipelines.',
      stats: [
        { label: 'Event Throughput', value: '120k/s' },
        { label: 'Memory Footprint', value: '38 MB' },
        { label: 'P99 Latency', value: '1.4ms' }
      ],
      tags: ['TypeScript', 'OffscreenCanvas', 'WebSockets', 'RxJS', 'TailwindCSS'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'WebWorker batching with SharedArrayBuffer to stream telemetry directly to canvas.',
        'Reactive state pipeline using RxJS Subject decoupling ingest from render loop.',
        'Configurable alert thresholds and heatmaps with zero UI thread blocking.'
      ]
    },
    {
      id: 'nova-tokens',
      title: 'Nova Design Engine',
      tagline: 'Zero-runtime tokens compiler & micro-interaction layout framework',
      category: 'ui-systems',
      year: '2024',
      featured: true,
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      description: 'A modern design token orchestration tool converting Figma variables into typed CSS variables, Tailwind palettes, and accessible component contracts.',
      longDescription: 'Nova bridges the gap between Figma design systems and production codebases. Used by multi-disciplinary design and engineering teams to guarantee visual fidelity, automatic contrast auditing, and seamless dark/light token switching.',
      stats: [
        { label: 'Contrast Check', value: '100% WCAG' },
        { label: 'Build Overhead', value: '0.0ms' },
        { label: 'Components', value: '60+' }
      ],
      tags: ['Design Systems', 'TypeScript', 'AST Parsing', 'Tailwind', 'Accessibility'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'Static AST token analysis generating strongly typed TypeScript theme interfaces.',
        'Real-time WCAG AAA color contrast computation using APCA algorithms.',
        'Zero-runtime overhead via pure CSS custom property generation.'
      ]
    },
    {
      id: 'khoros-vector',
      title: 'Khoros Neural Explorer',
      tagline: 'Interactive 3D semantic vector space embedding visualization',
      category: 'creative-ai',
      year: '2023',
      featured: false,
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      description: 'Visualizing 1536-dimensional OpenAI vector embeddings projected onto 3D interactive manifolds with t-SNE and UMAP algorithms.',
      longDescription: 'Khoros provides machine learning researchers and developers a direct intuitive view into document similarity clusters. Users can slice clusters, inspect semantic neighbors, and perform real-time text query projections.',
      stats: [
        { label: 'Embeddings Mapped', value: '250,000' },
        { label: 'Projection Time', value: '450ms' },
        { label: 'Dimensions', value: '1536D → 3D' }
      ],
      tags: ['Three.js', 'Vector Search', 'WebGPU', 'TypeScript', 'Data Viz'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'WebGPU compute pipeline accelerated dimensionality reduction.',
        'Octree spatial indexing for instant raycast tooltip inspection across 250k nodes.',
        'Dynamic cluster labeling using TF-IDF term extraction.'
      ]
    },
    {
      id: 'lumina-flow',
      title: 'Lumina Studio',
      tagline: 'Tactile ambient lighting control system with WebBluetooth',
      category: 'web-apps',
      year: '2023',
      featured: false,
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      description: 'Physical computing interface synchronizing digital browser palettes with RGB smart lighting clusters using WebBluetooth low energy protocol.',
      longDescription: 'Combines tactile gestural web UI with hardware controllers. Lumina features smooth spring-based physics controls, circadian rhythm schedules, and screen-mirroring mood modes.',
      stats: [
        { label: 'Sync Delay', value: '< 20ms' },
        { label: 'Protocols', value: 'BLE 5.2' },
        { label: 'Satisfaction', value: '99%' }
      ],
      tags: ['WebBluetooth', 'Spring Physics', 'Angular', 'Hardware UI'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'Robust GATT service reconnection state machine with exponential backoff.',
        'Spring physics engine with RK4 numerical integration for butter-smooth touch dials.'
      ]
    },
    {
      id: 'vortex-protocol',
      title: 'Vortex Protocol',
      tagline: 'Minimalist liquidity aggregator & gas-optimized trade interface',
      category: 'ui-systems',
      year: '2023',
      featured: false,
      gradient: 'from-cyan-500/20 via-emerald-500/10 to-transparent',
      description: 'Ultra-stripped, high-density order book interface focused on instantaneous keyboard shortcuts and zero-latency transaction simulation.',
      longDescription: 'Designed for high-frequency traders who demand zero bloat. Vortex provides hotkey execution, custom slippage guards, and instant visual verification before signing.',
      stats: [
        { label: 'Volume Traded', value: '$85M+' },
        { label: 'Bundle Size', value: '18 KB' },
        { label: 'Input Latency', value: '< 4ms' }
      ],
      tags: ['TypeScript', 'Design Systems', 'Micro-Frontends', 'FinTech'],
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      architectureDetails: [
        'Complete keyboard navigation flow with Vim-like shortcuts.',
        'Zero external CSS library dependencies for minimal bundle weight.'
      ]
    }
  ]);

  // Filtered projects
  filteredProjects = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.projects();
    return this.projects().filter(p => p.category === cat);
  });

  // Skills collection
  readonly skills = signal<SkillItem[]>([
    {
      name: 'Angular 21 & Signals',
      level: 95,
      category: 'frontend',
      description: 'Zoneless architecture, fine-grained signal reactivity, modern deferrable views, SSR & hydration.',
      tags: ['Zoneless', 'Signal API', 'SSR', 'Router']
    },
    {
      name: 'TypeScript & Architecture',
      level: 98,
      category: 'frontend',
      description: 'Type-level metaprogramming, resilient domain modeling, strict null safety, and clean software architecture.',
      tags: ['Generics', 'AST', 'Clean Architecture']
    },
    {
      name: 'WebGL & Creative Canvas',
      level: 88,
      category: 'frontend',
      description: 'Custom GLSL fragment shaders, Three.js spatial scenes, 60fps canvas particle dynamics, and audio viz.',
      tags: ['GLSL', 'Three.js', 'Canvas API', 'Math']
    },
    {
      name: 'Tailwind CSS v4 & Styling',
      level: 95,
      category: 'frontend',
      description: 'Modern CSS custom properties, fluid typographic clamps, responsive layouts, and glassmorphic micro-textures.',
      tags: ['Tailwind v4', 'Design Tokens', 'Fluid Typography']
    },
    {
      name: 'Node.js & Bun Runtimes',
      level: 90,
      category: 'backend',
      description: 'High-concurrency HTTP/WebSocket microservices, streaming pipelines, and serverless compute.',
      tags: ['Node.js', 'Bun', 'WebSockets', 'Express']
    },
    {
      name: 'PostgreSQL & Redis',
      level: 86,
      category: 'backend',
      description: 'Relational database schema modeling, indexing strategies, cache inval strategies, and vector embeddings (pgvector).',
      tags: ['PostgreSQL', 'Redis', 'pgvector', 'Prisma']
    },
    {
      name: 'Docker & Cloud Deployment',
      level: 85,
      category: 'backend',
      description: 'Multi-stage Docker builds, CI/CD automated pipelines, edge deployment on Cloudflare/Vercel/AWS.',
      tags: ['Docker', 'Cloudflare', 'CI/CD', 'Edge']
    },
    {
      name: 'Micro-Interactions & Motion',
      level: 94,
      category: 'design-motion',
      description: 'Choreographed page transitions, spring physics, magnetic buttons, and gesture-driven animations.',
      tags: ['Spring Physics', 'FLIP Animation', 'Haptics']
    },
    {
      name: 'Design Systems & Figma',
      level: 92,
      category: 'design-motion',
      description: 'Variable modes, auto-layout tokens, atomic component libraries, and automated contrast verification.',
      tags: ['Figma', 'WCAG AAA', 'Design Tokens']
    }
  ]);

  filteredSkills = computed(() => {
    return this.skills().filter(s => s.category === this.activeSkillTab());
  });

  // Experiences
  readonly experiences: ExperienceItem[] = [
    {
      role: 'Staff UI Architect & Creative Technologist',
      company: 'Aura Interactive Labs',
      location: 'Berlin / Remote',
      period: '2024 — Present',
      highlight: 'Leading frontend architecture for next-generation generative spatial web apps.',
      bullets: [
        'Architected zoneless signal-driven Angular micro-frontends serving 250k+ daily users with sub-second LCP.',
        'Engineered in-house GPU shader visualizer reducing memory overhead by 52% across browser runtimes.',
        'Mentored team of 8 engineers in design token compilation, performance audits, and modern CSS.'
      ],
      tags: ['Angular', 'TypeScript', 'WebAudio', 'GLSL', 'Performance']
    },
    {
      role: 'Senior Frontend Engineer',
      company: 'Veloce Systems',
      location: 'London / Remote',
      period: '2022 — 2024',
      highlight: 'Engineered high-throughput financial telemetry interfaces and reusable design system.',
      bullets: [
        'Built real-time telemetry analytics platform with WebSocket streams supporting 100k events/sec.',
        'Created company-wide design system of 50+ accessible components with 100% test coverage.',
        'Spearheaded transition from legacy state stores to fine-grained signal reactive pipelines.'
      ],
      tags: ['TypeScript', 'RxJS', 'Canvas', 'Tailwind', 'Micro-frontends']
    },
    {
      role: 'Creative Developer & UI Craftsman',
      company: 'Studio Monochrome',
      location: 'Amsterdam',
      period: '2020 — 2022',
      highlight: 'Crafted award-winning interactive portfolios, editorial websites, and 3D web experiences.',
      bullets: [
        'Delivered 18 bespoke client websites winning multiple Awwwards Site of the Day and FWA recognitions.',
        'Implemented custom WebGL particle simulations, scroll-linked animations, and tactile micro-interactions.',
        'Optimized cross-browser performance achieving consistent 99+ Lighthouse scores.'
      ],
      tags: ['Creative Coding', 'Three.js', 'Motion', 'WebGL', 'SEO']
    }
  ];

  // Testimonials / Recommendations
  readonly testimonials = [
    {
      quote: "Alex has that exceptionally rare dual superpower: pixel-perfect visual artistry coupled with hardcore systems engineering. The UI he builds feels impossibly alive.",
      author: "Elena Rostova",
      title: "Head of Product, Aura Labs"
    },
    {
      quote: "Working with Alex was a breath of fresh air. He took our complex telemetry streams and turned them into a blistering, fluid dashboard that our clients adore.",
      author: "Marcus Chen",
      title: "VP of Engineering, Veloce"
    },
    {
      quote: "One of the most detail-oriented creative developers I've ever collaborated with. Every subtle animation and transition has purpose and weight.",
      author: "Sarah Lindqvist",
      title: "Design Director, Studio Monochrome"
    }
  ];

  ngOnInit() {
    if (this.isBrowser) {
      this.startRoleTicker();
      this.initCanvasIfEnabled();
    }
  }

  ngOnDestroy() {
    if (this.roleInterval) {
      clearInterval(this.roleInterval);
    }
  }

  // Mouse move listener for ambient spotlight
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isBrowser) return;
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }

  // Scroll listener to update active section
  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;
    const sections = ['hero', 'about', 'work', 'skills', 'experience', 'contact'];
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

  setTheme(theme: 'cyan' | 'violet' | 'emerald' | 'amber') {
    this.activeTheme.set(theme);
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
    }
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

  copyEmail() {
    const email = 'alex.vance@studio-craft.io';
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

  // Generative Canvas Initialization
  private initCanvasIfEnabled() {
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

      // Ambient dynamic nodes
      const nodeCount = Math.min(width < 768 ? 25 : 55, 60);
      const nodes: { x: number; y: number; vx: number; vy: number; radius: number; baseAlpha: number }[] = [];

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.2
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

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          a.x += a.vx;
          a.y += a.vy;

          if (a.x < 0 || a.x > width) a.vx *= -1;
          if (a.y < 0 || a.y > height) a.vy *= -1;

          // Mouse subtle attraction
          const dxMouse = mouseX - a.x;
          const dyMouse = mouseY - a.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 180) {
            a.x += (dxMouse / distMouse) * 0.6;
            a.y += (dyMouse / distMouse) * 0.6;
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${a.baseAlpha})`;
          ctx.fill();

          // Connect nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const alpha = (1 - dist / 130) * 0.15;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(160, 200, 255, ${alpha})`;
              ctx.lineWidth = 0.6;
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
