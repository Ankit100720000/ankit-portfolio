import { experience } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'

function ExperienceSection() {
  const sectionRef = useSectionReveal()

  return (
    <section id="experience" ref={sectionRef} className="section-block py-32">
      <div className="h-rule mb-20" />

      <div className="mb-20 flex items-end justify-between gap-6">
        <div>
          <p className="label-text mb-6" data-reveal>Experience</p>
          <h2 className="section-heading text-balance" data-reveal data-reveal-delay="1">
            A journey shaped<br />
            by <span className="text-gradient-accent">real products.</span>
          </h2>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-3 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block"
          aria-hidden
        />

        <div className="space-y-4">
          {experience.map((item, index) => (
            <article
              key={`${item.company}-${item.period}`}
              className="group relative md:pl-12"
              data-reveal
              data-reveal-delay={String(index + 1)}
            >
              {/* Timeline node */}
              <div
                className="absolute left-0 top-10 hidden h-6 w-6 items-center justify-center md:flex"
                aria-hidden
              >
                <span className="absolute h-6 w-6 rounded-full bg-[var(--accent)]/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-white/20 ring-4 ring-[#06070a] transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_18px_rgba(214,255,58,0.6)]" />
              </div>

              <div className="modern-card grid gap-6 p-7 transition-all duration-500 lg:grid-cols-[280px_1fr_auto] lg:gap-12 lg:p-10">
                <div>
                  <p
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.company}
                  </p>
                  <p className="mt-2 label-text">{item.period}</p>
                </div>

                <div>
                  <p
                    className="text-xl font-bold text-white sm:text-2xl"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: 0 }}
                  >
                    {item.title}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="body-md flex items-start gap-3">
                        <span className="mt-3 h-1 w-4 shrink-0 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/30" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="self-start">
                  <span
                    className="label-text tabular-nums opacity-40 transition-opacity duration-300 group-hover:opacity-90"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    0{index + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
