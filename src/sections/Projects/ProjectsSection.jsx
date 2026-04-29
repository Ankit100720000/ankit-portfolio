import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import ProjectModal from './ProjectModal'

import coverErp from '@/assets/cover-erp.png'
import coverAi from '@/assets/cover-ai.png'
import coverEcom from '@/assets/cover-ecom.png'

const coverMap = {
  'erp-dashboard': coverErp,
  'ai-chatbot': coverAi,
  'ecommerce-platform': coverEcom,
}

function ProjectsSection() {
  const sectionRef = useRef(null)
  const previewRef = useRef(null)
  const listRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  // Hover preview that follows the cursor (desktop only)
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

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-proj-entry]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const hoveredProject = projects.find((p) => p.id === hoveredId)
  const hoveredCover = hoveredProject ? coverMap[hoveredProject.id] : null

  return (
    <section id="projects" ref={sectionRef} className="section-block pb-32 pt-20">
      {/* Section header */}
      <div className="flex flex-col gap-6 pb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-text mb-5">Selected Work</p>
          <h2 className="section-heading max-w-2xl text-balance">
            Products built for <span className="text-gradient-accent">real users.</span>
          </h2>
        </div>
        <p className="body-md max-w-xs text-balance sm:text-right">
          Frontend work shipped in production environments — design,
          performance, and detail.
        </p>
      </div>

      <div className="h-rule" />

      {/* Project rows with floating cursor preview */}
      <div ref={listRef} className="relative divide-y divide-white/[0.08]">
        {/* Floating preview card */}
        <div
          ref={previewRef}
          className={`pointer-events-none absolute left-0 top-0 z-20 hidden lg:block transition-opacity duration-300 ${
            hoveredId ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d12] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            {hoveredCover ? (
              <img
                src={hoveredCover}
                alt={hoveredProject?.title ?? ''}
                className="h-44 w-72 object-cover"
              />
            ) : (
              <div
                className="flex h-44 w-72 items-center justify-center bg-gradient-to-br from-[#1a1c22] to-[#0a0b10] text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {hoveredProject?.metrics?.[0]}
              </div>
            )}
          </div>
        </div>

        {projects.map((project, index) => {
          const isHovered = hoveredId === project.id
          return (
            <article
              key={project.id}
              data-proj-entry
              className={`group relative cursor-pointer transition-colors duration-300 ${
                hoveredId && !isHovered ? 'opacity-40' : 'opacity-100'
              }`}
              onClick={() => setActiveProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center gap-6 py-8 sm:gap-10 lg:py-10">
                <span
                  className="label-text w-10 shrink-0 tabular-nums"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3
                    className="text-2xl font-bold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-3xl lg:text-4xl xl:text-5xl"
                    style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.04em' }}
                  >
                    {project.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden shrink-0 text-2xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white md:block">
                  →
                </span>
              </div>
            </article>
          )
        })}
      </div>

      <ProjectModal
        project={activeProject}
        coverMap={coverMap}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}

export default ProjectsSection
