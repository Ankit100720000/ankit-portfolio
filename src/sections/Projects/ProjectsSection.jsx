import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { Draggable } from 'gsap/Draggable'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowUpRight, ArrowRight, Layers3, Sparkles, GripVertical } from 'lucide-react'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(Draggable)

const palettes = [
  { accent: '#ff8709', dim: 'rgba(255,135,9,0.07)', border: 'rgba(255,135,9,0.22)', glow: 'rgba(255,135,9,0.18)', num: '01' },
  { accent: '#f7bdf8', dim: 'rgba(247,189,248,0.07)', border: 'rgba(247,189,248,0.22)', glow: 'rgba(247,189,248,0.18)', num: '02' },
  { accent: '#ff5d73', dim: 'rgba(255,93,115,0.07)', border: 'rgba(255,93,115,0.22)', glow: 'rgba(255,93,115,0.18)', num: '03' },
  { accent: '#ffd166', dim: 'rgba(255,209,102,0.07)', border: 'rgba(255,209,102,0.22)', glow: 'rgba(255,209,102,0.18)', num: '04' },
  { accent: '#ff8709', dim: 'rgba(255,135,9,0.07)', border: 'rgba(255,135,9,0.22)', glow: 'rgba(255,135,9,0.18)', num: '05' },
  { accent: '#f7bdf8', dim: 'rgba(247,189,248,0.07)', border: 'rgba(247,189,248,0.22)', glow: 'rgba(247,189,248,0.18)', num: '06' },
  { accent: '#ff5d73', dim: 'rgba(255,93,115,0.07)', border: 'rgba(255,93,115,0.22)', glow: 'rgba(255,93,115,0.18)', num: '07' },
  { accent: '#ffd166', dim: 'rgba(255,209,102,0.07)', border: 'rgba(255,209,102,0.22)', glow: 'rgba(255,209,102,0.18)', num: '08' },
]

function ProjectsSection() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [activeIndex, setActiveIndex]     = useState(0)

  // Card Entrance Animations
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const cards = gsap.utils.toArray('.proj-h-card')

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=60',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Background color scroll transition
      gsap.to(document.documentElement, {
        '--bg': '#141016',
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

  // Drag Interaction (using GSAP Draggable)
  useEffect(() => {
    if (prefersReducedMotion) return

    const cards = gsap.utils.toArray('.proj-h-card')
    if (cards.length === 0) return

    const draggables = Draggable.create(cards, {
      type: 'x,y',
      bounds: sectionRef.current,
      edgeResistance: 0.7,
      zIndexBoost: true,
      onDragStart: function() {
        // scale up and raise border glow of the inner element during drag
        const inner = this.target.querySelector('.proj-h-card-inner')
        if (inner) {
          gsap.to(inner, {
            scale: 1.05,
            borderColor: 'rgba(255,255,255,0.25)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.55)',
            duration: 0.2,
            overwrite: 'auto'
          })
        }
      },
      onDragEnd: function() {
        // restore scale and shadow on drag drop
        const inner = this.target.querySelector('.proj-h-card-inner')
        if (inner) {
          gsap.to(inner, {
            scale: 1,
            borderColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            duration: 0.3,
            overwrite: 'auto'
          })
        }
      }
    })

    return () => {
      draggables.forEach(d => d.kill())
    }
  }, [prefersReducedMotion])

  // Mouse Interaction (Bouncy physics: attraction + drift away + 3D tilt)
  useEffect(() => {
    if (prefersReducedMotion) return

    const section = sectionRef.current
    const cards = gsap.utils.toArray('.proj-h-card')

    if (!section || cards.length === 0) return

    const radius = 300 // slightly smaller radius for smaller cards
    let lastMouseX = 0
    let lastMouseY = 0
    let hasMoved = false

    const updateCards = () => {
      if (!hasMoved) return
      cards.forEach((card) => {
        const inner = card.querySelector('.proj-h-card-inner')
        if (!inner) return

        const rect = card.getBoundingClientRect()
        const cardX = rect.left + rect.width / 2
        const cardY = rect.top + rect.height / 2

        const dx = cardX - lastMouseX
        const dy = cardY - lastMouseY
        const dist = Math.hypot(dx, dy)

        let targetX = 0
        let targetY = 0
        let targetScale = 1
        let rotateX = 0
        let rotateY = 0

        // If card is being dragged, we skip custom mouse-displacement to let Draggable control it
        const isDragging = Draggable.get(card)?.isDragging

        if (dist < radius && !isDragging) {
          const factor = (radius - dist) / radius
          const isHovered = lastMouseX >= rect.left && lastMouseX <= rect.right &&
                            lastMouseY >= rect.top && lastMouseY <= rect.bottom

          if (isHovered) {
            // Magnet pull
            targetX = -dx * 0.12
            targetY = -dy * 0.12
            targetScale = 1.03
            // 3D tilt rotation
            rotateX = (dy / rect.height) * 15
            rotateY = -(dx / rect.width) * 15
          } else {
            // Drift away push
            const angle = Math.atan2(dy, dx)
            const pushDist = factor * 20
            targetX = Math.cos(angle) * pushDist
            targetY = Math.sin(angle) * pushDist
            targetScale = 1 - (0.04 * factor)
          }
        }

        if (!isDragging) {
          gsap.to(inner, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 800,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })
    }

    const handleMouseMove = (e) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      hasMoved = true
      updateCards()
    }

    const handleMouseLeave = () => {
      hasMoved = false
      cards.forEach((card) => {
        const inner = card.querySelector('.proj-h-card-inner')
        const isDragging = Draggable.get(card)?.isDragging
        if (inner && !isDragging) {
          gsap.to(inner, {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', updateCards)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', updateCards)
    }
  }, [prefersReducedMotion])

  const handleCardClick = (project, idx, e) => {
    const d = Draggable.get(e.currentTarget)
    if (d && !d.clickAllowed) return
    setActiveProject(project)
    setActiveIndex(idx)
  }

  const handleReset = () => {
    const cards = gsap.utils.toArray('.proj-h-card')
    gsap.to(cards, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      overwrite: 'auto'
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header */}
      <div
        className="section-block relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-xl"
            style={{ borderColor: 'rgba(0,245,212,0.2)', background: 'rgba(0,245,212,0.06)', color: 'var(--accent)' }}>
            <Sparkles size={12} />
            Enterprise Project Library
          </div>
          <h2
            className="section-heading"
            style={{ fontSize: 'clamp(2rem,4vw,3.5rem)' }}
          >
            Work I&apos;ve shipped.{' '}
            <span className="text-gradient-cool">Interactive Canvas</span>
          </h2>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="btn-primary text-xs flex items-center gap-2 self-start md:self-auto py-2.5 px-5 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--fg)',
          }}
        >
          Reset Positions
        </button>
      </div>

      <div className="section-block py-16 animate-reveal">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => {
            const p = palettes[i % palettes.length]

            return (
              <article
                key={project.id}
                className="proj-h-card relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                style={{
                  height: '320px',
                  willChange: 'transform',
                }}
                onClick={(e) => handleCardClick(project, i, e)}
              >
                <div
                  className="proj-h-card-inner group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 w-full h-full"
                  style={{
                    background: 'rgba(15,15,30,0.45)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    borderTop: `2px solid ${p.accent}`,
                    willChange: 'transform',
                  }}
                >
                  {/* Subtle Abstract Background Pattern (Grid/Lines) */}
                  <svg className="absolute inset-0 h-full w-full opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.07] pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M0 10 H100 M0 30 H100 M0 50 H100 M0 70 H100 M0 90 H100 M10 0 V100 M30 0 V100 M50 0 V100 M70 0 V100 M90 0 V100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>

                  {/* Accent Glow Circle */}
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)` }} />

                  {/* Top Row: Index + Module Category + Grip Handle */}
                  <div className="flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      <GripVertical size={12} className="text-white/30 group-hover:text-white/60 transition-colors" />
                      <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10"
                        style={{ color: p.accent }}>
                        MOD-{p.num}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 border border-white/5 bg-white/[0.02]">
                      <Layers3 size={10} style={{ color: p.accent }} />
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-white/50" style={{ fontFamily: 'var(--font-display)' }}>
                        {project.category || 'ERP MODULE'}
                      </span>
                    </div>
                  </div>

                  {/* Title and Arrow */}
                  <div className="mt-3 flex items-start justify-between gap-3 z-10 pointer-events-none">
                    <h3 className="text-sm font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--p-accent)]"
                      style={{ fontFamily: 'var(--font-display)', '--p-accent': p.accent }}>
                      {project.title}
                    </h3>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                      <ArrowUpRight size={12} style={{ color: p.accent }} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-[11px] leading-4 text-white/60 z-10 pointer-events-none">
                    {project.description}
                  </p>

                  {/* KPIs / Metrics Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-1.5 z-10 pointer-events-none">
                    {project.metrics.slice(0, 2).map((m) => {
                      const parts = m.split(' ')
                      const val = parts[0]
                      const desc = parts.slice(1).join(' ')
                      return (
                        <div key={m} className="flex flex-col gap-0.5 rounded-lg border border-white/[0.03] bg-white/[0.01] p-2">
                          <span className="text-[12px] font-black text-white" style={{ fontFamily: 'var(--font-display)', color: p.accent }}>
                            {val}
                          </span>
                          <span className="text-[8px] text-white/40 uppercase tracking-wider font-semibold">
                            {desc || 'Metric'}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Tech Stack Footer */}
                  <div className="mt-auto flex flex-wrap gap-1 pt-2.5 border-t border-white/5 z-10 pointer-events-none">
                    {project.stack.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest border"
                        style={{
                          fontFamily: 'var(--font-display)',
                          borderColor: p.border,
                          background: p.dim,
                          color: p.accent,
                        }}>
                        {t}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded-full px-2 py-0.5 text-[8px] font-semibold text-white/30" style={{ fontFamily: 'var(--font-display)' }}>
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            )
          })}

          {/* End card — CTA */}
          <div className="proj-h-card relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            style={{
              height: '320px',
              willChange: 'transform',
            }}>
            <div className="proj-h-card-inner flex flex-col items-center justify-center gap-4 rounded-2xl border p-6 text-center w-full h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,212,0.04), rgba(162,89,255,0.04))',
                borderColor: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                borderTop: '2px solid var(--accent)',
                willChange: 'transform',
              }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'var(--accent-dim)', border: '1px solid rgba(0,245,212,0.2)' }}>
                <ArrowRight size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-base font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  See more
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: 'var(--muted)' }}>
                  45+ modules delivered
                </p>
              </div>
              <a href="#contact"
                className="btn-primary text-xs"
                style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                Let&apos;s connect
              </a>
            </div>
          </div>
        </div>
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
