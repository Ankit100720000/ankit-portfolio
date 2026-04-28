import { useSectionReveal } from '@/hooks/useSectionReveal'

const skills = [
  'React', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3',
  'Tailwind CSS', 'GSAP', 'Framer Motion', 'REST APIs',
  'Redux Toolkit', 'Git & GitHub', 'Vite', 'Figma',
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
            <span className="text-white font-medium">3+ years</span> of experience
            building scalable ERP systems and web applications used by{' '}
            <span className="text-white font-medium">2000+ users</span>.
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
      <div className="mt-20" data-reveal data-reveal-delay="3">
        <p className="label-text mb-8">Core Skills</p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-[#a0a0a0] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/[0.08] pt-16" data-reveal data-reveal-delay="4">
        {[
          { value: '3+', label: 'Years of experience' },
          { value: '20+', label: 'Projects delivered' },
          { value: '2000+', label: 'Users served' },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-5xl font-black text-white sm:text-6xl lg:text-7xl" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.05em' }}>
              {s.value}
            </p>
            <p className="mt-3 label-text">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutSection
