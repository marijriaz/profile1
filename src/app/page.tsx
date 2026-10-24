
"use client";

import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";

/* ==========================================
   MARIJ — ANIMATED RESEARCH PORTFOLIO
   Next.js App Router + TypeScript + Tailwind
   FILE: app/page.tsx
   IMAGE: public/picture.png
   No external libraries required
========================================== */

const profile = {
  name: "Marij",
  role: "Research Associate",
  organization: "Interdisciplinary Research Center for One Health",
  university: "University of Sargodha",
  email: "marij.riaz@uos.edu.pk",
  personalEmail: "marijriazofficial@gmail.com",
  location: "Sargodha, Punjab, Pakistan",
  linkedIn: "https://www.linkedin.com/in/marij-639924177",
  orcid: "https://orcid.org/0009-0008-9456-5278",
  website: "https://ircoh.su.edu.pk/",
  photo: "/picture.png",
};

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

const skills = [
  "Quantitative Research",
  "Meta-Analysis",
  "Systematic Reviews",
  "Bibliometric Analysis",
  "SPSS",
  "STATA",
  "RevMan",
  "VOSviewer",
  "SmartPLS 4",
  "PLS-SEM",
  "Survey Design",
  "COM-B Framework",
  "GESI Analysis",
  "Data Visualization",
  "Research Methodology",
  "Policy Research",
  "Microsoft Excel",
  "Tableau",
];

const projects = [
  {
    number: "01",
    category: "META-ANALYSIS",
    title: "Plant Extracts & Broiler Production",
    description:
      "Conducted evidence synthesis examining the effects of dietary plant extracts on growth performance, gut microbiota, and blood parameters in broilers.",
    tools: ["RevMan", "Meta-Analysis", "Evidence Synthesis"],
    detail: "Published · 2025",
    href: "https://orcid.org/0009-0008-9456-5278",
    icon: "◈",
    gradient: "from-blue-600 via-sky-500 to-cyan-400",
  },
  {
    number: "02",
    category: "BIBLIOMETRIC RESEARCH",
    title: "Antimicrobial Resistance Research Trends",
    description:
      "Mapping international research on antimicrobial resistance and stewardship in the poultry sector to identify emerging trends, research networks, and evidence gaps.",
    tools: ["VOSviewer", "Bibliometrics", "Network Analysis"],
    detail: "Research Pipeline",
    href: "https://ircoh.su.edu.pk/",
    icon: "◎",
    gradient: "from-indigo-600 via-blue-600 to-sky-400",
  },
  {
    number: "03",
    category: "FIELD RESEARCH",
    title: "Biosecurity & Behavioral Research",
    description:
      "Developing and implementing survey-based research using the COM-B behavioral framework to investigate barriers and facilitators of biosecurity adoption among rural female chicken producers.",
    tools: ["COM-B Model", "Survey Research", "GESI"],
    detail: "Research Pipeline",
    href: "https://ircoh.su.edu.pk/",
    icon: "◇",
    gradient: "from-cyan-600 via-blue-500 to-indigo-500",
  },
];

const publications = [
  {
    year: "2026",
    title:
      "The Magic of Plants, the Power of Nano: A Meta-Analysis on Analyzing the Effects of Nano-Encapsulated Plant Extracts on Broiler Production",
    journal: "World's Poultry Science Journal",
    type: "Q1 Journal",
  },
  {
    year: "2025",
    title:
      "The Dietary Inclusion of Plant Extracts Improves Growth Performance, Gut Microbiota and Blood Parameters of Broilers: A Meta-Analysis",
    journal: "Italian Journal of Animal Science",
    type: "Q1 Journal",
  },
];

const experience = [
  {
    role: "Research Associate",
    organization:
      "Interdisciplinary Research Center for One Health (IRCOH)",
    period: "June 2024 – Present",
    description:
      "University of Sargodha · IDRC-funded international research project",
    responsibilities: [
      "Lead quantitative, survey-based, and human resource research activities.",
      "Conduct systematic reviews and meta-analyses using RevMan.",
      "Analyze bibliometric networks and research trends using VOSviewer.",
      "Design, pilot, and implement COM-B-based questionnaires.",
      "Develop Gender Equality and Social Inclusion (GESI) matrices.",
      "Study regulatory frameworks for antibiotic alternatives in poultry production.",
      "Translate research findings into policy recommendations and briefs.",
    ],
  },
  {
    role: "Research Intern",
    organization: "Office of Research, Innovation & Commercialization",
    period: "January 2024 – June 2024",
    description: "University of Sargodha",
    responsibilities: [
      "Supported the management and oversight of funded research projects.",
      "Assisted with the scrutiny of PhD supervisor dossiers.",
      "Contributed to research administration and event coordination.",
    ],
  },
  {
    role: "Visiting Lecturer",
    organization: "Riphah International College",
    period: "March 2020 – September 2023",
    description: "Sargodha, Pakistan",
    responsibilities: [
      "Contributed to academic teaching and student learning.",
      "Developed communication and classroom management experience.",
    ],
  },
];

const education = [
  {
    degree: "MS Management Sciences (Finance)",
    institution: "University of Sargodha",
    period: "2021 – 2023",
    description:
      "Research thesis on corporate governance, firm performance, and the mediating role of investment efficiency in listed companies of Pakistan.",
  },
  {
    degree: "M.Com (Finance)",
    institution: "University of Sargodha",
    period: "2018 – 2020",
    description: "Specialization in finance and commerce.",
  },
];

/* ==========================================
   ICON COMPONENT
========================================== */

function ArrowIcon({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ==========================================
   SECTION HEADING
========================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <Reveal
      className={`mb-12 ${
        centered ? "text-center" : "text-left"
      }`}
    >
      <span className="mb-4 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.25em] text-blue-600">
        <span className="h-px w-8 bg-blue-500" />
        {eyebrow}
      </span>

      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div
        className={`mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 ${
          centered ? "mx-auto" : ""
        }`}
      />

      {description && (
        <p
          className={`mt-6 text-base leading-8 text-slate-500 ${
            centered
              ? "mx-auto max-w-2xl"
              : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

/* ==========================================
   AUTOMATIC RESEARCH PROJECT SLIDER
========================================== */

function ProjectSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = projects.length;

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((previous) => (previous + 1) % total);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  const next = () => {
    setActive((previous) => (previous + 1) % total);
  };

  const previous = () => {
    setActive((previous) => (previous - 1 + total) % total);
  };

  const project = projects[active];

  return (
    <Reveal>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as Node | null
            )
          ) {
            setPaused(false);
          }
        }}
      >
        <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-blue-100/60">
          <div className="grid min-h-[430px] lg:grid-cols-2">
            {/* ANIMATED VISUAL */}
            <div
              key={`visual-${active}`}
              className={`relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} p-10`}
            >
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full border-[50px] border-white/10" />
              <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border-[55px] border-white/10" />

              <div className="absolute left-8 top-8 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold tracking-wider text-white backdrop-blur-md">
                {project.category}
              </div>

              <span className="project-symbol relative select-none text-[160px] font-light leading-none text-white/90 sm:text-[200px]">
                {project.icon}
              </span>

              <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md">
                {project.detail}
              </div>

              <div className="absolute bottom-8 right-8 text-5xl font-black text-white/30">
                {project.number}
              </div>
            </div>

            {/* SLIDER TEXT */}
            <div
              key={`content-${active}`}
              className="project-content flex flex-col justify-center p-7 sm:p-10 lg:p-12"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="mb-5 inline-block w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold tracking-wider text-blue-600">
                {project.category}
              </span>

              <h3 className="text-2xl font-black leading-snug text-slate-900 sm:text-3xl">
                {project.title}
              </h3>

              <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-blue-100 bg-blue-50/70 px-4 py-2 text-xs font-semibold text-blue-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
              >
                Explore Research
                <ArrowIcon diagonal />
              </a>
            </div>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            {projects.map((item, index) => (
              <button
                key={item.number}
                type="button"
                aria-label={`Go to project ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  active === index
                    ? "w-12 bg-blue-600"
                    : "w-3 bg-blue-200 hover:bg-blue-400"
                }`}
              />
            ))}
          </div>

          <span className="text-sm font-semibold text-slate-500">
            0{active + 1} / 0{total}
          </span>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous project"
              onClick={previous}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white text-xl text-blue-600 shadow-sm transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
            >
              ←
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 hover:bg-blue-700"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ==========================================
   MAIN PAGE
========================================== */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setStatus("Please complete all fields.");
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setStatus(
      "Your email application has been opened. Please send the email to complete your message."
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-800 selection:bg-blue-100">
      {/* GLOBAL ANIMATIONS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes floatPhoto {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px);
          }
        }

        @keyframes floatBadge {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes gradientMove {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes marqueeMove {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes slideAppear {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes symbolAppear {
          from {
            opacity: 0;
            transform: scale(0.7) rotate(-12deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }

        .floating-photo {
          animation: floatPhoto 6s ease-in-out infinite;
        }

        .floating-badge {
          animation: floatBadge 5s ease-in-out infinite;
        }

        .animated-gradient {
          background-size: 200% 200%;
          animation: gradientMove 9s ease infinite;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeMove 35s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track,
        .marquee-wrapper:focus-within .marquee-track {
          animation-play-state: paused;
        }

        .project-content {
          animation: slideAppear 0.65s ease both;
        }

        .project-symbol {
          animation: symbolAppear 0.75s ease both;
        }

        .glow-pulse {
          animation: glowPulse 5s ease-in-out infinite;
        }
          
/* PREMIUM LAVENDER & ROSE PORTFOLIO THEME */

/* Overall */
main {
  background: #faf8ff;
  color: #30264b;
}

/* Navigation */
header.sticky {
  background: rgba(255, 251, 255, 0.93);
  border-bottom: 1px solid #e9dcff;
  box-shadow: 0 6px 30px rgba(109, 40, 217, 0.06);
}

/* Main blue gradients become purple / pink */
main .from-blue-600 {
  --tw-gradient-from: #6d28d9;
  --tw-gradient-to: rgb(109 40 217 / 0);
  --tw-gradient-stops:
    var(--tw-gradient-from),
    var(--tw-gradient-to);
}

main .to-blue-700 {
  --tw-gradient-to: #4c1d95;
}

main .to-cyan-400,
main .to-cyan-500,
main .to-cyan-600 {
  --tw-gradient-to: #f472b6;
}

/* Backgrounds */
main .bg-blue-50 {
  background-color: #f3edff;
}

main .bg-blue-100 {
  background-color: #e9dcff;
}

main .bg-slate-50 {
  background-color: #fcfaff;
}

/* Text accents */
main .text-blue-600,
main .text-blue-700 {
  color: #7c3aed;
}

main .text-blue-400 {
  color: #c084fc;
}

/* Borders */
main .border-blue-100 {
  border-color: #e8d8ff;
}

main .border-blue-200 {
  border-color: #d8bfff;
}

/* Hero */
#home {
  background: linear-gradient(
    125deg,
    #fffaf5 0%,
    #f4edff 38%,
    #fce7f3 72%,
    #f8f7ff 100%
  );
  background-size: 250% 250%;
}

/* Beautiful cards */
main article,
main .rounded-3xl,
main .rounded-\[2rem\] {
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease,
    border-color 0.4s ease;
}

main article:hover {
  box-shadow:
    0 20px 55px rgba(109, 40, 217, 0.14),
    0 6px 20px rgba(244, 114, 182, 0.08);
}

/* Form focus */
main input:focus,
main textarea:focus {
  border-color: #a855f7;
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.12);
}

        /* Buttons */
        main button[type="submit"] {
          background: linear-gradient(120deg, #6d28d9, #a855f7, #db2777);
          box-shadow: 0 12px 30px rgba(109, 40, 217, 0.22);
        }

        main button[type="submit"]:hover {
          box-shadow: 0 18px 40px rgba(109, 40, 217, 0.34);
        }

        /* Footer */
        main footer {
          background: linear-gradient(135deg, #24123f, #401968, #301347);
        }

        /* Preserve accessibility */
        @media (prefers-reduced-motion: reduce) {
          main article {
            transition: none;
          }
        }


        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ======================================
          NAVBAR
      ====================================== */}

      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/85 shadow-sm shadow-blue-100/30 backdrop-blur-2xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#home"
            className="group flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-black text-white shadow-lg shadow-blue-200 transition-transform group-hover:rotate-12">
              M
            </span>
            Marij<span className="text-blue-600"></span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 hover:shadow-xl md:inline-flex"
          >
            Let's Connect
            <ArrowIcon diagonal />
          </a>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-blue-700 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </nav>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-100 bg-white px-6 py-5 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ======================================
          HERO
      ====================================== */}

      <section
        id="home"
        className="animated-gradient relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-cyan-100/70"
      >
        <div className="glow-pulse pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-sky-200/50 blur-3xl" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-32">
          {/* HERO TEXT */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/90 px-5 py-2.5 text-xs font-extrabold tracking-wide text-blue-700 shadow-md shadow-blue-100">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />
                RESEARCH ASSOCIATE · UOS–IDRC
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Hello, I'm
                <br />
                <span className="animated-gradient bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Marij
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="mt-8 max-w-xl text-xl font-bold leading-relaxed text-slate-700 sm:text-2xl">
                Research Associate at the international Development Research Center-Canada
                <br />
                <span className="text-blue-600">
                  Evidence-Based Research & Policy
                </span>
              </h2>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                MS in Management Sciences from the University of
                Sargodha. Working on IDRC-funded interdisciplinary
                research, quantitative analysis, evidence synthesis,
                antimicrobial resistance, and sustainable poultry
                production.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#research"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  Explore My Research
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>

                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white px-7 py-4 text-sm font-bold text-blue-700 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500 hover:shadow-xl"
                >
                  Get in Touch
                  <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowIcon diagonal />
                  </span>
                </a>
              </div>
            </Reveal>

            {/* STATS */}
            <Reveal delay={420}>
              <div className="mt-14 grid grid-cols-3 gap-3 border-t border-blue-100 pt-8 sm:gap-6">
                {[
                  ["2+", "Years in Research"],
                  ["02", "Q1 Publications"],
                  ["IDRC", "Research Project"],
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="group rounded-2xl border border-blue-100/80 bg-white/70 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
                  >
                    <p className="text-2xl font-black text-blue-700 sm:text-3xl">
                      {number}
                    </p>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* PROFILE PHOTO */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="floating-photo relative w-full max-w-[420px]">
              <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-300/50 via-cyan-200/30 to-indigo-200/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border-[9px] border-white bg-[#e9edf5] shadow-2xl shadow-blue-200/70">
                <img
                  src={profile.photo}
                  alt="Marij — Research Associate at University of Sargodha"
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="floating-badge absolute -bottom-6 -left-2 max-w-[250px] rounded-2xl border border-white bg-white/95 p-4 shadow-2xl shadow-blue-200/60 backdrop-blur-xl sm:-left-9">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
                    ✦
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      Research Associate
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      IRCOH · University of Sargodha
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-2 top-10 rounded-2xl border border-white/30 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-300 sm:-right-8">
                Evidence into Impact ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          ABOUT
      ====================================== */}

      <section
        id="about"
        className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="01 / About Me"
              title="Passionate About Research That Matters."
            />

            <Reveal delay={100}>
              <div className="group relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-9 shadow-lg shadow-blue-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-100/50 blur-2xl" />

                <span className="relative text-6xl font-black text-blue-300">
                  “
                </span>

                <p className="relative mt-2 text-xl font-bold leading-9 text-slate-800">
                  Transforming research evidence into meaningful
                  insights, sustainable solutions, and informed
                  decisions.
                </p>

                <div className="mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" />
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="text-base leading-9 text-slate-600">
                I am a research professional with a MS degree
                in Management Sciences (Finance) from the{" "}
                <strong className="text-slate-900">
                  University of Sargodha
                </strong>
                . My professional experience includes research
                design, quantitative analysis, systematic reviews,
                and interdisciplinary project implementation.
              </p>

              <p className="mt-5 text-base leading-9 text-slate-600">
                At the Interdisciplinary Research Center for One
                Health (IRCOH), I contribute to an international
                IDRC-funded research project focused on evidence
                synthesis, antimicrobial resistance, responsible
                poultry production, regulatory frameworks, and
                inclusive research practices.
              </p>

              <p className="mt-5 text-base leading-9 text-slate-600">
                My work brings together academic research,
                statistical analysis, stakeholder and COM-B Model surveys, and
                policy-oriented recommendations. I am particularly
                interested in producing research that bridges
                scientific evidence and real-world decision-making.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                ["Education", "MS Management Sciences"],
                ["University", "University of Sargodha"],
                ["Current Role", "Research Associate"],
                ["Research Center", "IRCOH · UOS"],
              ].map(([label, value], index) => (
                <Reveal key={label} delay={index * 90}>
                  <div className="group h-full rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/60 p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                      {label}
                    </p>

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      {value}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          EXPERIENCE
      ====================================== */}

      <section
        id="experience"
        className="scroll-mt-24 bg-gradient-to-b from-slate-50 to-blue-50/50 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="02 / Professional Journey"
            title="My Work Experience"
            description="Research, academic involvement, and interdisciplinary project contributions."
          />

          <div className="grid gap-7 lg:grid-cols-3">
            {experience.map((job, index) => (
              <Reveal key={job.role} delay={index * 120}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-7 shadow-md shadow-blue-50 transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100">
                  <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                  <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-2xl font-black text-blue-600 transition-all duration-300 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white">
                      0{index + 1}
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                      {job.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">
                    {job.role}
                  </h3>

                  <p className="mt-3 text-sm font-bold leading-6 text-blue-600">
                    {job.organization}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {job.description}
                  </p>

                  <div className="my-7 h-px bg-blue-100" />

                  <ul className="space-y-3.5">
                    {job.responsibilities.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          SKILLS
      ====================================== */}

      <section
        id="skills"
        className="scroll-mt-24 overflow-hidden bg-white px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="03 / Expertise"
            title="Research & Technical Skills"
            description="The tools, analytical methods, and research frameworks I use to explore evidence and generate meaningful insights."
            centered
          />

          {/* MOVING SKILLS SLIDER */}
          <Reveal>
            <div className="marquee-wrapper relative overflow-hidden py-6">
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-28" />

              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-28" />

              <div className="marquee-track gap-3">
                {[...skills, ...skills].map(
                  (skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="shrink-0 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-4 text-sm font-bold text-blue-700 shadow-sm transition-all hover:border-blue-400 hover:bg-blue-600 hover:text-white hover:shadow-lg"
                    >
                      ✦ {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          {/* STATIC SKILLS */}
          <Reveal delay={100}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`cursor-default rounded-2xl border px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-blue-600 hover:text-white hover:shadow-xl ${
                    index % 3 === 0
                      ? "border-blue-100 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                symbol: "◉",
                title: "Research & Analysis",
                text: "Quantitative methods, systematic reviews, meta-analysis, econometrics, and data interpretation.",
              },
              {
                symbol: "▤",
                title: "Research Software",
                text: "Practical experience with SPSS, STATA, RevMan, VOSviewer, SmartPLS, and Excel.",
              },
              {
                symbol: "✧",
                title: "Policy & Field Research",
                text: "Survey design, COM-B behavioral research, GESI frameworks, and evidence-based recommendations.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <div className="group h-full rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50/80 to-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-4xl text-blue-600 transition-all duration-300 group-hover:rotate-12 group-hover:bg-blue-600 group-hover:text-white">
                    {item.symbol}
                  </div>

                  <h3 className="mt-7 text-lg font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          RESEARCH — AUTO SLIDER
      ====================================== */}

      <section
        id="research"
        className="scroll-mt-24 bg-gradient-to-b from-blue-50/70 via-sky-50 to-white px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="04 / Selected Work"
            title="Featured Research Projects"
            description="Selected research contributions from my academic and professional journey."
          />

          <ProjectSlider />

          {/* PROJECT CARDS */}
          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal
                key={project.number}
                delay={index * 120}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-lg shadow-blue-50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-100">
                  <div
                    className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
                  >
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[25px] border-white/10" />

                    <span className="relative text-8xl font-light text-white transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {project.icon}
                    </span>

                    <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {project.number}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black tracking-wider text-blue-600">
                        {project.category}
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        {project.detail}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-snug text-slate-900">
                      {project.title}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 border-t border-blue-100 pt-5">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all hover:gap-4 hover:text-blue-800"
                      >
                        Explore Research
                        <ArrowIcon diagonal />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          PUBLICATIONS
      ====================================== */}

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="05 / Academic Contributions"
            title="Research Publications"
            description="Peer-reviewed research contributing to evidence synthesis and sustainable poultry production."
          />

          <div className="space-y-6">
            {publications.map((publication, index) => (
              <Reveal
                key={publication.title}
                delay={index * 120}
              >
                <div className="group relative flex flex-col gap-6 overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-r from-white to-blue-50/40 p-7 shadow-md shadow-blue-50 transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100 md:flex-row md:items-center">
                  <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 opacity-60 transition-all group-hover:w-2 group-hover:opacity-100" />

                  <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-50 text-2xl font-black text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    {publication.year}
                  </div>

                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
                      {publication.type}
                    </span>

                    <h3 className="mt-3 text-lg font-black leading-relaxed text-slate-900">
                      {publication.title}
                    </h3>

                    <p className="mt-3 text-sm italic text-slate-500">
                      {publication.journal}
                    </p>
                  </div>

                  <a
                    href={profile.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View research profile on ORCID"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
                  >
                    <ArrowIcon diagonal />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          EDUCATION
      ====================================== */}

      <section className="bg-gradient-to-b from-slate-50 to-blue-50/60 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="06 / Education"
            title="Academic Background"
          />

          <div className="grid gap-7 md:grid-cols-2">
            {education.map((item, index) => (
              <Reveal
                key={item.degree}
                delay={index * 150}
              >
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-9 shadow-md shadow-blue-50 transition-all duration-500 hover:-translate-y-3 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50 transition-transform duration-500 group-hover:scale-150" />

                  <span className="relative inline-block rounded-full bg-blue-100 px-5 py-2 text-xs font-bold text-blue-700">
                    {item.period}
                  </span>

                  <h3 className="relative mt-6 text-xl font-black text-slate-900">
                    {item.degree}
                  </h3>

                  <p className="relative mt-3 font-bold text-blue-600">
                    {item.institution}
                  </p>

                  <p className="relative mt-5 text-sm leading-8 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================
          CONTACT
      ====================================== */}

      <section
        id="contact"
        className="scroll-mt-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="07 / Get In Touch"
            title="Let's Work Together"
            description="Interested in research collaboration, evidence synthesis, quantitative data analysis, or interdisciplinary projects? I'd love to connect."
            centered
          />

          <Reveal>
            <div className="grid overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white shadow-2xl shadow-blue-100/60 lg:grid-cols-2">
              {/* CONTACT DETAILS */}
              <div className="animated-gradient relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white sm:p-12">
                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border-[45px] border-white/10" />

                <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

                <div className="relative">
                  <h3 className="text-3xl font-black">
                    Let's Connect.
                  </h3>

                  <p className="mt-5 max-w-md leading-8 text-blue-100">
                    Open to meaningful research conversations,
                    collaborations, and opportunities that help
                    turn evidence into positive impact.
                  </p>

                  <div className="mt-12 space-y-8">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                        Email Address
                      </p>

                      <a
                        href={`mailto:${profile.email}`}
                        className="mt-2 block break-all text-base font-semibold hover:underline"
                      >
                        {profile.email}
                      </a>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                        Location
                      </p>

                      <p className="mt-2 font-semibold">
                        {profile.location}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all hover:bg-white/20">
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-200">
                        Institution
                      </p>

                      <p className="mt-2 font-semibold leading-7">
                        {profile.university}
                        <br />
                        {profile.organization}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {[
                      {
                        label: "LinkedIn",
                        url: profile.linkedIn,
                      },
                      {
                        label: "ORCID",
                        url: profile.orcid,
                      },
                      {
                        label: "IRCOH",
                        url: profile.website,
                      },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:bg-white hover:text-blue-700"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONTACT FORM */}
              <div className="p-8 sm:p-12">
                <h3 className="text-2xl font-black text-slate-900">
                  Send Me a Message
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Fill in the details below to prepare an email
                  directly to me.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-9 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Your Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="yourname@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                      placeholder="Tell me about your research collaboration or inquiry..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Prepare Email
                    <span className="transition-transform group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </button>

                  {status && (
                    <p
                      role="status"
                      className="rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-700"
                    >
                      {status}
                    </p>
                  )}

                  <p className="text-center text-xs leading-6 text-slate-400">
                    This form opens your email application. No
                    information is stored on this website.
                  </p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="bg-slate-950 px-5 py-12 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-9 border-b border-white/10 pb-10 md:flex-row md:items-center md:justify-between">
            <div>
              <a
                href="#home"
                className="text-3xl font-black tracking-tight"
              >
                Marij
                <span className="text-blue-400"></span>
              </a>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                Research Associate | MS Management Sciences
                <br />
                University of Sargodha · IRCOH
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { name: "About", href: "#about" },
                { name: "Experience", href: "#experience" },
                { name: "Skills", href: "#skills" },
                { name: "Research", href: "#research" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-blue-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Marij All Rights
              Reserved.
            </p>


            <a
              href="#home"
              className="font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
