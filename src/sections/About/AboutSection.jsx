import { useRef, useEffect } from 'react'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { gsap, splitTextLinesReveal, animateCounter } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { SkillOrbitSvg } from '@/components/common/SvgDecorations'
import { Code2, Layers, Zap, Database, GitBranch, Globe, Package } from 'lucide-react'

const skillsWithIcons = [
  { name: 'React', icon: <Code2 size={13} /> },
  { name: 'JavaScript', icon: <Zap size={13} /> },
  { name: 'TypeScript', icon: <Code2 size={13} /> },
  { name: 'HTML5 & CSS3', icon: <Globe size={13} /> },
  { name: 'Tailwind CSS', icon: <Layers size={13} /> },
  { name: 'GSAP', icon: <Zap size={13} /> },
  { name: 'Framer Motion', icon: <Zap size={13} /> },
  { name: 'REST APIs', icon: <Database size={13} /> },
  { name: 'Redux Toolkit', icon: <Package size={13} /> },
  { name: 'Git & GitHub', icon: <GitBranch size={13} /> },
  { name: 'Vite', icon: <Zap size={13} /> },
  { name: 'Figma', icon: <Layers size={13} /> },
]

const stats = [
  { value: '3+', label: 'Years of experience', accent: 'var(--accent)', glow: 'var(--accent-glow)', border: 'var(--border)' },
  { value: '45+', label: 'Projects delivered', accent: 'var(--accent)', glow: 'var(--accent-glow)', border: 'var(--border)' },
  { value: '2K+', label: 'Users served', accent: 'var(--accent)', glow: 'var(--accent-glow)', border: 'var(--border)' },
]

function AnimatedStatCard({ stat }) {
  const numRef = useRef(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    // Parse numeric part (e.g. "3+" -> 3, "45+" -> 45, "2K+" -> 2)
    const raw = String(stat.value)
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
    const suffix = raw.replace(/[0-9.]/g, '')
    if (!isNaN(num)) {
      animateCounter(el, num, suffix, 1.6)
    }
  }, [stat.value])

  return (
    <div
      className="glow-card group relative flex flex-col gap-3 p-6 sm:p-8"
      style={{ '--hover-glow': stat.glow }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }}
      />

      <p
        ref={numRef}
        className="text-4xl font-extrabold sm:text-5xl"
        style={{
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.03em',
          background: `linear-gradient(135deg, ${stat.accent} 0%, #ffffff 70%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {stat.value}
      </p>
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--muted-2)' }}
      >
        {stat.label}
      </p>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(50% 50% at 50% 0%, ${stat.glow}, transparent)` }}
      />
    </div>
  )
}

function AboutSection() {
  const sectionRef = useSectionReveal()
  const headingRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (headingRef.current) {
      return splitTextLinesReveal(headingRef.current, headingRef.current)
    }
  }, [])



  return (
    <section id="about" ref={sectionRef} className="section-block pt-20 pb-24 md:pt-28 md:pb-32">


      {/* Section label + headings */}
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20 mb-16">
        {/* Left: label + heading */}
        <div>
          <p className="label-text mb-6" data-reveal>About</p>
          <h2
            ref={headingRef}
            className="section-heading text-balance"
          >
            Frontend craft at{' '}
            <span className="text-gradient-cool">production scale.</span>
          </h2>
        </div>

        {/* Right: story */}
        <div className="flex flex-col justify-end gap-5" data-reveal data-reveal-delay="2">
          <p className="body-lg">
            Frontend Developer with{' '}
            <span className="font-semibold text-white">3+ years</span> of experience
            building scalable ERP systems and web applications used by{' '}
            <span className="font-semibold text-white">2,000+ users</span>.
          </p>
          <p className="body-md">
            I specialize in translating complex product requirements into interfaces
            that feel simple, responsive, and visually intentional. My sweet spot
            is where dense information meets strong UX — ERP workflows, dashboards,
            AI-assisted features, and customer-facing products.
          </p>
          <p className="body-md">
            Currently at{' '}
            <span className="font-medium text-white">Science Olympiad Foundation</span>,
            building internal systems for finance, HR, and operations teams.
          </p>
        </div>
      </div>

      {/* Bento grid */}
      <div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        data-reveal
        data-reveal-delay="3"
      >
        {/* ── Big "What I do" card — spans 2 cols on lg ── */}
        <div
          className="glow-card relative p-7 lg:col-span-2"
          style={{ background: 'linear-gradient(135deg, rgba(235, 126, 28, 0.04) 0%, rgba(13,13,31,0.9) 60%)' }}
        >
          <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
          />
          <p className="label-text mb-5">What I do</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'ERP & Dashboards', desc: 'Building complex enterprise systems with clean data visualization and efficient UX patterns.', accent: '#EB7E1C' },
              { title: 'Modern UI Engineering', desc: 'Crafting pixel-perfect interfaces with smooth animations, responsive layouts, and accessibility.', accent: '#00ACDC' },
              { title: 'API Integration', desc: 'Seamlessly connecting frontends to complex backend systems with clean data management layers.', accent: '#EB7E1C' },
              { title: 'Performance & Scale', desc: 'Optimizing rendering, code-splitting, and bundle size to keep apps fast under heavy load.', accent: '#00ACDC' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: item.accent }} />
                  <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</p>
                </div>
                <p className="text-[13px] leading-6 text-[var(--muted)] pl-3.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Currently at card ── */}
        <div
          className="glow-card relative flex flex-col justify-between p-7"
          style={{ background: 'linear-gradient(135deg, rgba(0, 172, 220, 0.04) 0%, rgba(13,13,31,0.9) 60%)' }}
        >
          <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-2), transparent)' }}
          />
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]" />
              </span>
              <p className="label-text">Currently at</p>
            </div>
            <p className="text-2xl font-extrabold leading-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Science Olympiad<br />Foundation
            </p>
            <p className="mt-2 text-[13px] text-[var(--muted)]">Frontend Developer · Mar 2025 – Present</p>
          </div>
          <div className="mt-6 rounded-xl border border-[var(--accent-2)]/15 bg-[var(--accent-2-dim)] px-4 py-3">
            <p className="text-[12px] font-medium text-[var(--accent-2)]" style={{ fontFamily: 'var(--font-display)' }}>
              Building ERP systems for 2000+ users across finance, HR & operations
            </p>
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="mt-10 mb-20" data-reveal data-reveal-delay="4">
        <div className="mb-5 flex items-center justify-between">
          <p className="label-text text-lg">Core Skills</p>

        </div>
        <div className="flex flex-wrap gap-4">
          {skillsWithIcons.map((skill) => (
            <button
              key={skill.name}
              className="skill-chip group"
            >
              <span className="text-[var(--muted-2)] transition-colors duration-300 group-hover:text-[var(--accent)]">{skill.icon}</span>
              {skill.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        data-reveal
        data-reveal-delay="5"
      >
        {stats.map((s) => (
          <AnimatedStatCard key={s.label} stat={s} />
        ))}
      </div>
    </section>
  )
}

export default AboutSection
