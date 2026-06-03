import { useEffect, useRef, useState } from 'react'
import { gsap, splitTextLinesReveal } from '@/animations/gsap'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowUpRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import ProjectModal from './ProjectModal'

const palettes = [
  { accent: '#EB7E1C', dim: 'rgba(235,126,28,0.07)', border: 'rgba(235,126,28,0.22)', glow: 'rgba(235,126,28,0.18)', num: '01', soft: 'rgba(235,126,28,0.13)', line: 'rgba(235,126,28,0.5)' },
  { accent: '#00ACDC', dim: 'rgba(0,172,220,0.07)', border: 'rgba(0,172,220,0.22)', glow: 'rgba(0,172,220,0.18)', num: '02', soft: 'rgba(0,172,220,0.13)', line: 'rgba(0,172,220,0.5)' },
  { accent: '#EB7E1C', dim: 'rgba(235,126,28,0.07)', border: 'rgba(235,126,28,0.22)', glow: 'rgba(235,126,28,0.18)', num: '03', soft: 'rgba(235,126,28,0.13)', line: 'rgba(235,126,28,0.5)' },
  { accent: '#00ACDC', dim: 'rgba(0,172,220,0.07)', border: 'rgba(0,172,220,0.22)', glow: 'rgba(0,172,220,0.18)', num: '04', soft: 'rgba(0,172,220,0.13)', line: 'rgba(0,172,220,0.5)' },
  { accent: '#EB7E1C', dim: 'rgba(235,126,28,0.07)', border: 'rgba(235,126,28,0.22)', glow: 'rgba(235,126,28,0.18)', num: '05', soft: 'rgba(235,126,28,0.13)', line: 'rgba(235,126,28,0.5)' },
  { accent: '#00ACDC', dim: 'rgba(0,172,220,0.07)', border: 'rgba(0,172,220,0.22)', glow: 'rgba(0,172,220,0.18)', num: '06', soft: 'rgba(0,172,220,0.13)', line: 'rgba(0,172,220,0.5)' },
  { accent: '#EB7E1C', dim: 'rgba(235,126,28,0.07)', border: 'rgba(235,126,28,0.22)', glow: 'rgba(235,126,28,0.18)', num: '07', soft: 'rgba(235,126,28,0.13)', line: 'rgba(235,126,28,0.5)' },
  { accent: '#00ACDC', dim: 'rgba(0,172,220,0.07)', border: 'rgba(0,172,220,0.22)', glow: 'rgba(0,172,220,0.18)', num: '08', soft: 'rgba(0,172,220,0.13)', line: 'rgba(0,172,220,0.5)' },
]

const INITIAL_COUNT = 8

function ProjectsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  useEffect(() => {
    if (headingRef.current) {
      return splitTextLinesReveal(headingRef.current, headingRef.current)
    }
  }, [])

  // Card entrance animations
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-grid-card')

      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, showAll])

  const handleCardClick = (project, idx) => {
    setActiveProject(project)
    setActiveIndex(idx)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      {/* Header */}
      <div
        className="section-block relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-xl"
            style={{ borderColor: 'rgba(255,135,9,0.2)', background: 'rgba(255,135,9,0.06)', color: 'var(--accent)' }}>
            <Sparkles size={12} />
            Project Portfolio
          </div>
          <h2
            ref={headingRef}
            className="section-heading text-balance"
          >
            Work I&apos;ve shipped. <span className="text-gradient-cool">Built for scale.</span>
          </h2>
        </div>

        <p className="text-sm text-white/40 max-w-xs leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          {projects.length} projects across ERP systems, dashboards, and enterprise tools.
        </p>
      </div>

      {/* Project Grid */}
      <div className="section-block relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visibleProjects.map((project, i) => {
            const p = palettes[i % palettes.length]

            return (
              <article
                key={project.id}
                className="proj-grid-card group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-400"
                style={{
                  background: `linear-gradient(160deg, ${p.dim}, rgba(12,13,18,0.95) 60%)`,
                  borderColor: 'rgba(255,255,255,0.06)',
                  '--card-accent': p.accent,
                }}
                onClick={() => handleCardClick(project, i)}
                onMouseEnter={(e) => {
                  if (prefersReducedMotion) return
                  gsap.to(e.currentTarget, {
                    y: -4,
                    borderColor: p.border,
                    boxShadow: `0 12px 40px -12px ${p.glow}, 0 0 0 1px ${p.border}`,
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }}
                onMouseLeave={(e) => {
                  if (prefersReducedMotion) return
                  gsap.to(e.currentTarget, {
                    y: 0,
                    borderColor: 'rgba(255,255,255,0.06)',
                    boxShadow: 'none',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }}
              >
                {/* Top accent line */}
                <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

                {/* Card content */}
                <div className="p-5 sm:p-6">
                  {/* Number + Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: p.accent, fontFamily: 'var(--font-display)' }}
                    >
                      {p.num}
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--card-accent)]"
                      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      <ArrowUpRight size={14} className="text-white/40 transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold leading-snug text-white mb-2 transition-colors duration-300 group-hover:text-[var(--card-accent)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[13px] leading-relaxed text-white/40 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border"
                        style={{
                          fontFamily: 'var(--font-display)',
                          borderColor: 'rgba(255,255,255,0.06)',
                          background: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Show All / Show Less toggle */}
        {projects.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(255,135,9,0.04)]"
              style={{
                fontFamily: 'var(--font-display)',
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View All {projects.length} Projects <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <ProjectModal
        project={activeProject}
        palettes={palettes}
        projectIndex={activeIndex}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}

export default ProjectsSection
