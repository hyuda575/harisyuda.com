/* ==========================================================================
   Haris Yuda - SENIOR WEB UI/UX DESIGNER PORTFOLIO
   Interactive Engine & Dynamic Controllers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME ENGINE (DARK / LIGHT DUAL MODE)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  // Read saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio_theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }

  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTER
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-open');
    const isOpen = navLinksContainer.classList.contains('mobile-open');
    mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close mobile nav on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('mobile-open');
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* --------------------------------------------------------------------------
     3. PROJECT FILTER CONTROLLER
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. CASE STUDY MODAL CONTROLLER & DATABASE
     -------------------------------------------------------------------------- */
  const caseStudyDatabase = {
    novafin: {
      title: "NovaFin — Next-Gen Banking & Wealth Management",
      heroImg: "./assets/images/project_novafin.png",
      problem: "NovaFin's legacy mobile app suffered from fragmented navigation, slow transfer flows, and a 35% drop-off rate during user onboarding.",
      research: "Conducted 24 qualitative user interviews and analyzed 1,500+ session recordings. Identified that 72% of users struggled to locate account statements and budget tools.",
      solution: "Redesigned the core dashboard around a modular card-based design system with 1-tap fast transfers, smart expense categorization, and custom dark mode charts.",
      wireframes: "./assets/images/wireframe_preview.png",
      impact: [
        "+140% Daily Active User (DAU) Engagement within 90 days",
        "-35% Drop-off rate during digital identity verification",
        "4.8/5 Rating across App Store & Google Play (15,000+ reviews)"
      ]
    },
    aurahealth: {
      title: "AuraHealth — AI Mindfulness & Wellness Platform",
      heroImg: "./assets/images/project_aurahealth.png",
      problem: "Users felt overwhelmed by standard meditation apps that lacked personalized emotional context and accessible color contrast.",
      research: "Surveyed 300+ mindfulness practitioners and tested color spectrums with visually impaired users to establish a tranquil, high-contrast palette.",
      solution: "Created an empathetic mood-logging UI with adaptive voice-guided sessions, biometric sync, and soothing haptic micro-interactions.",
      wireframes: "./assets/images/wireframe_preview.png",
      impact: [
        "98% 30-Day User Retention rate",
        "Featured on Apple App Store 'App of the Day'",
        "100% WCAG 2.1 AAA Accessibility Score"
      ]
    },
    pulse: {
      title: "Pulse Analytics — Enterprise B2B SaaS Platform",
      heroImg: "./assets/images/project_pulse.png",
      problem: "Enterprise financial analysts were losing 4+ hours daily navigating cluttered, non-responsive data tables.",
      research: "Conducted contextual inquiries with lead financial analysts across 8 enterprise partners to map key data workflows.",
      solution: "Engineered a customizable drag-and-drop widget layout, dark slate financial contrast, and instant SQL query visualization widgets.",
      wireframes: "./assets/images/wireframe_preview.png",
      impact: [
        "+210% Analyst workflow execution speed",
        "$4.2M in net new ARR signed in Q1 following rollout",
        "Adopted by 50+ Fortune 500 financial teams"
      ]
    },
    ecosphere: {
      title: "EcoSphere — Sustainable E-Commerce Marketplace",
      heroImg: "./assets/images/project_ecosphere.png",
      problem: "Shoppers interested in eco-friendly products lacked transparent carbon footprint metrics at checkout.",
      research: "A/B tested carbon transparency badges vs. traditional eco-labels to determine impact on purchase confidence.",
      solution: "Designed a green-UX e-commerce checkout flow featuring real-time carbon offset calculations, eco-badges, and 1-click checkout.",
      wireframes: "./assets/images/wireframe_preview.png",
      impact: [
        "+45% Conversion rate increase on sustainable product lines",
        "Offset 12,000+ tons of CO2 within first 6 months",
        "Won 2025 International Sustainability UX Award"
      ]
    }
  };

  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectContent = document.getElementById('modalProjectContent');
  const closeCaseStudyModal = document.getElementById('closeCaseStudyModal');
  const viewBtns = document.querySelectorAll('.view-case-study');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = caseStudyDatabase[key];
      if (!data) return;

      modalProjectTitle.textContent = data.title;
      modalProjectContent.innerHTML = `
        <img src="${data.heroImg}" alt="${data.title}" class="case-study-hero-img">
        
        <div class="cs-section">
          <h4><i class="fa-solid fa-circle-exclamation"></i> Problem Statement</h4>
          <p>${data.problem}</p>
        </div>

        <div class="cs-section">
          <h4><i class="fa-solid fa-users-viewfinder"></i> User Research & Insights</h4>
          <p>${data.research}</p>
        </div>

        <div class="cs-section">
          <h4><i class="fa-solid fa-compass-drafting"></i> Wireframing & Design Solution</h4>
          <p>${data.solution}</p>
          <img src="${data.wireframes}" alt="UX Wireframe and Flow Diagram" style="width: 100%; border-radius: 12px; margin-top: 1rem; border: 1px solid var(--border-subtle);">
        </div>

        <div class="cs-section">
          <h4><i class="fa-solid fa-chart-line"></i> Business Impact & Key Metrics</h4>
          <ul class="deliverables-list">
            ${data.impact.map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('')}
          </ul>
        </div>
      `;

      caseStudyModal.showModal();
    });
  });

  closeCaseStudyModal.addEventListener('click', () => caseStudyModal.close());
  caseStudyModal.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) caseStudyModal.close();
  });

  /* --------------------------------------------------------------------------
     5. RESUME MODAL CONTROLLER
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeResumeModal = document.getElementById('closeResumeModal');

  openResumeBtn.addEventListener('click', () => resumeModal.showModal());
  closeResumeModal.addEventListener('click', () => resumeModal.close());
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) resumeModal.close();
  });

  /* --------------------------------------------------------------------------
     6. INTERACTIVE DESIGN PROCESS STEPPER
     -------------------------------------------------------------------------- */
  const processSteps = [
    {
      title: "01. Research & Discovery",
      desc: "Uncovering core user friction, defining user personas, and analyzing competitor landscapes to lay a solid foundation.",
      deliverables: [
        "User Interviews & Qualitative Surveys",
        "Empathy Mapping & User Personas",
        "Competitive Audits & Metric Benchmarking"
      ],
      tools: "Miro, Notion, Maze, Hotjar, UserTesting.com",
      badges: ["User Interviews", "Journey Mapping", "Heuristic Audit"]
    },
    {
      title: "02. Wireframing & Information Architecture",
      desc: "Mapping out user flows, navigation structures, and low-fidelity wireframes to validate layout concepts early.",
      deliverables: [
        "Information Architecture & Sitemap",
        "Low-Fidelity Screen Sketches & Wireframes",
        "Interactive User Flow Diagrams"
      ],
      tools: "Figma, Whimsical, Balsamiq, FigJam",
      badges: ["User Flows", "Low-Fi Wireframes", "Sitemaps"]
    },
    {
      title: "03. Visual Design & Prototyping",
      desc: "Crafting high-fidelity UI screens, building component design systems, and adding rich micro-interactions.",
      deliverables: [
        "Figma Design Systems & UI Tokens",
        "High-Fidelity Screen Designs (Dark/Light)",
        "Interactive Clickable Prototypes"
      ],
      tools: "Figma, Adobe XD, Framer, Principle",
      badges: ["Design Systems", "High-Fi UI", "Micro-Animations"]
    },
    {
      title: "04. Usability Testing & Iteration",
      desc: "Testing interactive prototypes with real users to measure task completion rate and refine usability friction.",
      deliverables: [
        "Unmoderated Usability Testing Reports",
        "Task Success Rate & SUS Scoring",
        "Design Refinements & Iteration Logs"
      ],
      tools: "Maze, UserTesting.com, Loom, Google Analytics",
      badges: ["A/B Testing", "Usability Audit", "SUS Benchmark"]
    },
    {
      title: "05. Handoff & Developer Delivery",
      desc: "Preparing pixel-perfect design specifications, redlines, and accessible HTML/CSS tokens for engineering teams.",
      deliverables: [
        "Developer Specification Handoff Docs",
        "Exported SVG Assets & CSS Design Tokens",
        "QA Visual Audit & Handoff Support"
      ],
      tools: "Zeplin, Storybook, GitHub, Figma Handoff",
      badges: ["CSS Tokens", "Developer Handoff", "QA Audit"]
    }
  ];

  const stepNodes = document.querySelectorAll('.step-node');
  const processTitle = document.getElementById('processTitle');
  const processDesc = document.getElementById('processDesc');
  const processDeliverables = document.getElementById('processDeliverables');
  const processToolsText = document.getElementById('processToolsText');
  const processBadges = document.getElementById('processBadges');

  stepNodes.forEach(node => {
    node.addEventListener('click', () => {
      stepNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const index = parseInt(node.getAttribute('data-step'));
      const stepData = processSteps[index];

      if (!stepData) return;

      processTitle.textContent = stepData.title;
      processDesc.textContent = stepData.desc;
      processDeliverables.innerHTML = stepData.deliverables
        .map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`)
        .join('');
      processToolsText.textContent = stepData.tools;
      processBadges.innerHTML = stepData.badges
        .map(b => `<span class="tool-badge">${b}</span>`)
        .join('');
    });
  });

  /* --------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & BUDGET SELECTOR
     -------------------------------------------------------------------------- */
  const budgetPills = document.querySelectorAll('.budget-pill');
  let selectedBudget = '$5k - $10k';

  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedBudget = pill.getAttribute('data-budget');
    });
  });

  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simulate form submission
      successModal.showModal();
      contactForm.reset();

      // Reset budget pills
      budgetPills.forEach(p => p.classList.remove('active'));
      budgetPills[0].classList.add('active');
    });
  }

  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', () => successModal.close());
  }

  /* --------------------------------------------------------------------------
     8. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
