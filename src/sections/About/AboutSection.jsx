import { useSectionReveal } from '@/hooks/useSectionReveal'

const skills = [
  'React', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3',
  'Tailwind CSS', 'GSAP', 'Framer Motion', 'REST APIs',
  'Redux Toolkit', 'Git & GitHub', 'Vite', 'Figma',
]

const stats = [
  { value: '3+', label: 'Years of experience', accent: 'from-[#d6ff3a]/40 to-transparent' },
  { value: '20+', label: 'Projects delivered', accent: 'from-[#7cf2ff]/40 to-transparent' },
  { value: '2000+', label: 'Users served', accent: 'from-[#b08bff]/40 to-transparent' },
]

function AboutSection() {
  const sectionRef = useSectionReveal()

  return (
    <section id="about" ref={sectionRef} className="section-block py-32">
      <div className="h-rule mb-20" />

      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        {/* Left: Label + heading */}
        <div>
          <p className="label-text mb-6" data-reveal>About</p>
          <h2 className="section-heading text-balance" data-reveal data-reveal-delay="1">
            Frontend craft at
            <br />
            <span className="text-gradient-accent">production scale.</span>
          </h2>
        </div>

        {/* Right: Story paragraphs */}
        <div className="flex flex-col justify-end gap-6" data-reveal data-reveal-delay="2">
          <p className="body-lg">
            Frontend Developer with{' '}
            <span className="font-medium text-white">3+ years</span> of experience
            building scalable ERP systems and web applications used by{' '}
            <span className="font-medium text-white">2000+ users</span>.
          </p>
          <p className="body-md">
            I specialize in translating complex product requirements into interfaces
            that feel simple, responsive, and visually intentional. My sweet spot
            is where dense information meets strong UX — ERP workflows, dashboards,
            AI-assisted features, and customer-facing products where performance
            matters as much as the visual finish.
          </p>
          <p className="body-md">
            Currently working at the{' '}
            <span className="text-white">Science Olympiad Foundation</span>,
            building internal systems for teams across finance, HR, and operations.
          </p>
        </div>
      </div>

      {/* Skills list */}
      <div className="mt-24" data-reveal data-reveal-delay="3">
        <div className="mb-8 flex items-baseline justify-between">
          <p className="label-text">Core Skills</p>
          <p
            className="text-xs text-[var(--muted)]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            12 — toolset
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/[0.08] bg-white/[0.025] px-5 py-2.5 text-sm text-[#b6b9c4] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-white/[0.06] hover:text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div
        className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
        data-reveal
        data-reveal-delay="4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="modern-card group p-7 sm:p-8"
          >
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.accent}`}
            />
            <p
              className="stat-number text-5xl sm:text-6xl lg:text-7xl"
            >
              {s.value}
            </p>
            <p className="mt-4 label-text">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
