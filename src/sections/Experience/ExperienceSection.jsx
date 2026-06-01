import { useRef, useEffect } from 'react'
import { experience } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { gsap, splitWordReveal } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { TimelineSvgLine, SectionConnector } from '@/components/common/SvgDecorations'
import { Briefcase, Calendar } from 'lucide-react'

const expPalettes = [
  { accent: '#ff8709', glow: 'rgba(255,135,9,0.15)', dim: 'rgba(255,135,9,0.06)', border: 'rgba(255,135,9,0.2)' },
  { accent: '#f7bdf8', glow: 'rgba(247,189,248,0.15)', dim: 'rgba(247,189,248,0.06)', border: 'rgba(247,189,248,0.2)' },
  { accent: '#ff5d73', glow: 'rgba(255,93,115,0.15)', dim: 'rgba(255,93,115,0.06)', border: 'rgba(255,93,115,0.2)' },
]

function getInitials(company) {
  return company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function ExperienceSection() {
  const sectionRef = useSectionReveal()
  const headingRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (headingRef.current) {
      splitWordReveal(headingRef.current, headingRef.current, 0.1)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to(document.documentElement, {
        '--bg': '#171212',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section id="experience" ref={sectionRef} className="section-block py-32">
      <div className="h-rule mb-20" />

      <SectionConnector color="#f7bdf8" />

      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="label-text mb-6" data-reveal>Experience</p>
          <h2
            ref={headingRef}
            className="section-heading text-balance"
          >
            A journey shaped by <span className="text-gradient-cool">real products.</span>
          </h2>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex" data-reveal data-reveal-delay="2">
          <span className="text-4xl font-extrabold"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--accent), #fff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >3+</span>
          <span className="label-text">Years building</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* GSAP SVG animated timeline line */}
        <TimelineSvgLine height={experience.length * 260} />

        <div className="space-y-5">
          {experience.map((item, index) => {
            const palette = expPalettes[index % expPalettes.length]
            const isFirst = index === 0

            return (
              <article
                key={`${item.company}-${item.period}`}
                className="group relative md:pl-12"
                data-reveal
                data-reveal-delay={String(index + 1)}
              >
                {/* Timeline node */}
                <div className="timeline-node" aria-hidden>
                  {/* Pulse ring for current */}
                  {isFirst && (
                    <span
                      className="absolute h-6 w-6 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: palette.dim,
                        boxShadow: `0 0 20px ${palette.glow}`,
                      }}
                    />
                  )}
                  <span
                    className="relative h-3 w-3 rounded-full ring-4 ring-[var(--bg)] transition-all duration-500"
                    style={{
                      background: isFirst ? palette.accent : 'rgba(255,255,255,0.15)',
                      boxShadow: isFirst ? `0 0 16px ${palette.glow}` : 'none',
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="glow-card relative grid gap-6 p-6 transition-all duration-500 hover:-translate-y-0.5 lg:grid-cols-[260px_1fr_80px] lg:gap-10 lg:p-8"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)` }}
                  />

                  {/* Left — company info */}
                  <div className="flex items-start gap-4">
                    {/* Company initials badge */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-extrabold transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-display)',
                        borderColor: palette.border,
                        background: palette.dim,
                        color: palette.accent,
                        boxShadow: `0 0 0 0 ${palette.glow}`,
                        transition: 'box-shadow 0.3s ease',
                      }}
                    >
                      {getInitials(item.company)}
                    </div>
                    <div>
                      <p
                        className="text-base font-bold text-white transition-colors duration-200 group-hover:text-[var(--palette-accent)]"
                        style={{ fontFamily: 'var(--font-display)', '--palette-accent': palette.accent }}
                      >
                        {item.company}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Calendar size={11} className="text-[var(--muted)] shrink-0" />
                        <p
                          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.period}
                        </p>
                      </div>
                      {isFirst && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--green)]/25 bg-[var(--green)]/[0.07] px-2.5 py-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--green)]" style={{ fontFamily: 'var(--font-display)' }}>Current</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center — role + bullet points */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <Briefcase size={14} style={{ color: palette.accent, flexShrink: 0 }} />
                      <p
                        className="text-xl font-extrabold text-white"
                        style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                      >
                        {item.title}
                      </p>
                    </div>
                    <ul className="space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-[13px] leading-6 text-[var(--muted)]">
                          <span
                            className="mt-2.5 h-1 w-3 shrink-0 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent}50)` }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right — index counter */}
                  <div className="hidden lg:flex lg:justify-end lg:self-start">
                    <span
                      className="text-4xl font-extrabold tabular-nums opacity-10 transition-opacity duration-300 group-hover:opacity-25"
                      style={{ fontFamily: 'var(--font-display)', color: palette.accent, letterSpacing: '-0.03em' }}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* Hover corner glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(40% 30% at 0% 0%, ${palette.glow}, transparent)` }}
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
