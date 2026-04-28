import { experience } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'

function ExperienceSection() {
  const sectionRef = useSectionReveal()

  return (
    <section id="experience" ref={sectionRef} className="section-block py-32">
      <div className="h-rule mb-20" />

      <div className="flex items-end justify-between gap-6 mb-20">
        <div>
          <p className="label-text mb-6" data-reveal>Experience</p>
          <h2 className="section-heading text-balance" data-reveal data-reveal-delay="1">
            A journey shaped<br />by real products.
          </h2>
        </div>
      </div>

      <div className="space-y-0">
        {experience.map((item, index) => (
          <article
            key={`${item.company}-${item.period}`}
            className="group grid gap-6 border-t border-white/[0.08] py-12 transition-all duration-300 hover:bg-white/[0.015] lg:grid-cols-[280px_1fr_auto] lg:gap-16 lg:px-6"
            data-reveal
            data-reveal-delay={String(index + 1)}
          >
            {/* Left: Company */}
            <div>
              <p className="text-base font-semibold text-white">{item.company}</p>
              <p className="mt-2 label-text">{item.period}</p>
            </div>

            {/* Middle: Role + bullets */}
            <div>
              <p className="text-xl font-bold text-white sm:text-2xl" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}>
                {item.title}
              </p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 body-md">
                    <span className="mt-2.5 h-1 w-4 shrink-0 rounded-full bg-white/20" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Index */}
            <div className="self-start">
              <span className="label-text tabular-nums opacity-40">0{index + 1}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
