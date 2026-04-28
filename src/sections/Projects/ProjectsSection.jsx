import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import ProjectModal from './ProjectModal'

// Cover images for projects that have them
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
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Parallax on project images
      gsap.utils.toArray('[data-proj-img]').forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      })

      // Staggered entrance per row
      gsap.utils.toArray('[data-proj-entry]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section id="projects" ref={sectionRef} className="section-block pb-32 pt-10">

      {/* Section header */}
      <div className="flex flex-col gap-4 pb-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label-text mb-5" >Selected Work</p>
          <h2
            className="section-heading max-w-2xl text-balance"
         
          >
            Products built for real users.
          </h2>
        </div>
        <p
          className="body-md max-w-xs text-balance sm:text-right"
         
        >
          Frontend work shipped in production environments.
        </p>
      </div>

      <div className="h-rule" />

      {/* Project rows */}
      <div className="divide-y divide-white/[0.08]">
        {projects.map((project, index) => {
          const cover = coverMap[project.id]
          const isHovered = hoveredId === project.id

          return (
            <article
              key={project.id}
              data-proj-entry
              className="group cursor-pointer"
              onClick={() => setActiveProject(project)}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Main row */}
              <div className="flex items-center gap-6 py-8 sm:gap-10 lg:py-10">
                {/* Number */}
                <span className="label-text w-8 shrink-0 tabular-nums">
                  0{index + 1}
                </span>

                {/* Title + stack */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="text-2xl font-bold tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-3xl lg:text-4xl xl:text-5xl"
                    style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.04em' }}
                  >
                    {project.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Thumbnail — always visible on lg, hidden on smaller */}
                <div className="img-zoom hidden shrink-0 overflow-hidden rounded-xl lg:block">
                  {cover ? (
                    <img
                      src={cover}
                      alt={project.title}
                      data-proj-img
                      className="h-28 w-48 object-cover opacity-50 transition-all duration-500 group-hover:opacity-100 xl:h-32 xl:w-56"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-28 w-48 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs text-[var(--muted)] xl:h-32 xl:w-56">
                      {project.metrics[0]}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <span
                  className="hidden shrink-0 text-xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:block"
                >
                  →
                </span>
              </div>

              {/* Expandable description — slides in on hover */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: isHovered ? '120px' : '0px', opacity: isHovered ? 1 : 0 }}
              >
                <p className="body-md pb-8 pl-14 max-w-2xl sm:pl-20">
                  {project.description}
                </p>
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
