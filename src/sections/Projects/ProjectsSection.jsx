import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Layers3, Sparkles } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import ProjectModal from './ProjectModal'

import coverAi from '@/assets/images/covers/cover-ai.png'
import coverEcom from '@/assets/images/covers/cover-ecom.png'
import coverErp from '@/assets/images/covers/cover-erp.png'

const coverMap = {
  'mtg-erp': coverErp,
  'sof-erp': coverErp,
  'mtg-online-crm': coverEcom,
  'ai-chatbot': coverAi,
}

const projectPalettes = [
  { accent: '#d6ff3a', soft: 'rgba(214, 255, 58, 0.16)', line: 'rgba(214, 255, 58, 0.58)' },
  { accent: '#7cf2ff', soft: 'rgba(124, 242, 255, 0.16)', line: 'rgba(124, 242, 255, 0.58)' },
  { accent: '#ff7ad9', soft: 'rgba(255, 122, 217, 0.15)', line: 'rgba(255, 122, 217, 0.55)' },
  { accent: '#b08bff', soft: 'rgba(176, 139, 255, 0.17)', line: 'rgba(176, 139, 255, 0.58)' },
  { accent: '#ffb86b', soft: 'rgba(255, 184, 107, 0.15)', line: 'rgba(255, 184, 107, 0.55)' },
  { accent: '#64ff9f', soft: 'rgba(100, 255, 159, 0.14)', line: 'rgba(100, 255, 159, 0.55)' },
]

function ProjectsSection() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const previewRef = useRef(null)
  const listRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    const node = listRef.current
    const preview = previewRef.current
    if (!node || !preview) return

    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      preview.style.transform = `translate3d(${x + 24}px, ${y - 100}px, 0)`
    }

    node.addEventListener('mousemove', onMove)
    return () => node.removeEventListener('mousemove', onMove)
  }, [])

  const handleProjectMove = (event) => {
    if (prefersReducedMotion) return

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const px = x / rect.width
    const py = y / rect.height
    const rotateY = (px - 0.5) * 9
    const rotateX = (0.5 - py) * 8

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: 'center',
      '--mx': `${px * 100}%`,
      '--my': `${py * 100}%`,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleProjectLeave = (event) => {
    if (prefersReducedMotion) return

    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      '--mx': '50%',
      '--my': '0%',
      duration: 0.65,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    })
  }

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const projectEntries = gsap.utils.toArray('[data-proj-entry]')

      gsap.set(projectEntries, { opacity: 0, y: 22, willChange: 'transform, opacity' })

      ScrollTrigger.batch(projectEntries, {
        start: 'top 94%',
        once: true,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'willChange',
          })
        },
      })

      if (sceneRef.current) {
        gsap.set(sceneRef.current, { autoAlpha: 0, scale: 0.9 })
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'bottom 28%',
        onEnter: () => gsap.to(sceneRef.current, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' }),
        onEnterBack: () => gsap.to(sceneRef.current, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' }),
        onLeave: () => gsap.to(sceneRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(sceneRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power2.out' }),
        onUpdate: (self) => {
          const progress = self.progress
          const rotateY = -38 + progress * 96
          const rotateX = -18 + progress * 38
          const rotateZ = -10 + progress * 22
          const y = -34 + progress * 88
          const hue = Math.round(progress * 220)

          gsap.set('[data-project-3d]', {
            rotateX,
            rotateY,
            rotateZ,
            y,
            scale: 0.96 + progress * 0.12,
            transformPerspective: 900,
          })
          gsap.set('[data-project-orbit]', { rotate: -60 + progress * 420 })
          gsap.set('[data-project-depth]', {
            y: -24 + progress * 88,
            rotate: 24 + progress * 160,
            opacity: 0.42 + progress * 0.48,
          })
          sectionRef.current?.style.setProperty('--project-scroll-hue', String(hue))
        },
      })

      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const hoveredProject = projects.find((p) => p.id === hoveredId)
  const hoveredCover = hoveredProject ? coverMap[hoveredProject.id] || hoveredProject.preview : null
  const activeIndex = activeProject ? projects.findIndex((p) => p.id === activeProject.id) : 0

  return (
    <section id="projects" ref={sectionRef} className="section-block relative pb-32 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-[520px] opacity-80">
        <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-[#7cf2ff]/10 blur-3xl" />
        <div className="absolute right-[8%] top-28 h-80 w-80 rounded-full bg-[#ff7ad9]/10 blur-3xl" />
        <div className="absolute left-[36%] top-0 h-64 w-64 rounded-full bg-[#d6ff3a]/10 blur-3xl" />
      </div>

      <div
        ref={sceneRef}
        className="pointer-events-none fixed right-5 top-28 z-30 hidden h-64 w-64 opacity-0 [perspective:900px] lg:block xl:right-12"
        aria-hidden="true"
      >
        <div
          data-project-3d
          className="absolute inset-8 will-change-transform [transform-style:preserve-3d]"
        >
          <div className="absolute inset-8 rounded-[2.2rem] border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_48px_-24px_rgba(124,242,255,0.8)] [transform:translateZ(58px)_rotate(12deg)]" />
          <div className="absolute inset-14 rounded-full border border-lime-300/35 bg-lime-300/10 shadow-[0_0_48px_-24px_rgba(214,255,58,0.75)] [transform:translateZ(106px)]" />
          <div className="absolute inset-2 rounded-[3rem] border border-fuchsia-300/30 bg-fuchsia-300/10 [transform:translateZ(-48px)_rotate(-18deg)]" />
          <div
            data-project-orbit
            className="absolute inset-0 rounded-full border border-dashed border-white/25"
          />
          <div
            data-project-depth
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/80 shadow-[0_0_45px_-12px_rgba(255,255,255,0.8)] [transform:translateZ(136px)_rotate(24deg)]"
          />
        </div>
        <div className="absolute -bottom-6 left-1/2 h-px w-36 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="flex flex-col gap-8 pb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Enterprise Project Library
          </div>
          <h2 className="section-heading max-w-2xl text-balance">
            Colorful systems built for <span className="text-gradient-cool">real operations.</span>
          </h2>
        </div>

        <div className="max-w-md lg:text-right">
          <p className="body-md text-balance">
            ERP, CRM, reporting, logistics, exams, tracking, and internal tools shaped with
            senior-level structure, modern colors, and polished product detail.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 lg:justify-end">
            {['35+ modules', 'ERP + CRM', 'Maps + Analytics'].map((item) => (
              <span key={item} className="pill border-white/15 bg-white/[0.06] text-white/75">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-rule mb-8" />

      <div ref={listRef} className="relative">
        <div
          ref={previewRef}
          className={`pointer-events-none absolute left-0 top-0 z-20 hidden transition-opacity duration-300 lg:block ${
            hoveredId ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d12] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)]">
            {hoveredCover ? (
              <img
                src={hoveredCover}
                alt={hoveredProject?.title ?? ''}
                className="h-44 w-72 object-cover opacity-90 saturate-125"
              />
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id
            const palette = projectPalettes[index % projectPalettes.length]

            return (
              <article
                key={project.id}
                data-proj-entry
                className={`group relative min-h-[420px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0d12]/90 p-5 shadow-[0_18px_55px_-42px_rgba(0,0,0,0.9)] transition-transform transition-colors duration-300 hover:-translate-y-1 hover:border-white/20 ${
                  hoveredId && !isHovered ? 'opacity-55' : 'opacity-100'
                }`}
                style={{
                  '--project-accent': palette.accent,
                  '--project-soft': palette.soft,
                  '--project-line': palette.line,
                  background:
                    `radial-gradient(620px 260px at 12% 0%, ${palette.soft}, transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.018))`,
                }}
                onClick={() => setActiveProject(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseMove={handleProjectMove}
                onMouseLeave={(event) => {
                  setHoveredId(null)
                  handleProjectLeave(event)
                }}
              >
                <span className="project-card-light" aria-hidden="true" />
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--project-accent)] opacity-80" />
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--project-accent)]/15 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-black/35 to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm font-bold text-white shadow-[0_10px_28px_-18px_var(--project-line)]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
                        <Layers3 size={13} style={{ color: palette.accent }} />
                        Module
                      </span>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <img
                      src={coverMap[project.id] || project.preview}
                      alt={project.title}
                      className="h-32 w-full object-cover opacity-70 mix-blend-screen saturate-125 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                    />
                  </div>

                  <h3
                    className="text-2xl font-black leading-tight text-white sm:text-[1.7rem]"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: 0 }}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#aeb2bf]">
                    {project.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-2">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric}
                        className="rounded-2xl border border-white/[0.075] bg-black/20 px-4 py-3 text-xs font-medium text-white/72"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        coverMap={coverMap}
        palettes={projectPalettes}
        projectIndex={activeIndex}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}

export default ProjectsSection
