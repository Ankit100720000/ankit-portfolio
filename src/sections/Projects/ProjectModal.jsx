import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function ProjectModal({ project, coverMap = {}, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 px-4 py-6 backdrop-blur-lg sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#111] ring-1 ring-white/[0.08]"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/60 transition hover:bg-white/[0.12] hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Hero image */}
            {(() => {
              const cover = coverMap[project.id]
              return cover ? (
                <div className="overflow-hidden rounded-t-[2rem]">
                  <img
                    src={cover}
                    alt={project.title}
                    className="h-56 w-full object-cover sm:h-72"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-t-[2rem] bg-white/[0.03] text-sm text-[var(--muted)]">
                  {project.metrics[0]}
                </div>
              )
            })()}

            {/* Content */}
            <div className="p-7 sm:p-10">
              {/* Header */}
              <div className="mb-8">
                <p className="label-text mb-4">Case Study</p>
                <h3
                  id="modal-title"
                  className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
                {/* Left */}
                <div>
                  <p className="body-md mb-6">{project.description}</p>

                  {/* Impact callout */}
                  <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                    <p className="label-text mb-3">Impact</p>
                    <p className="body-md">{project.impact}</p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {project.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-4 py-4"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <p className="text-sm leading-7 text-[#a0a0a0]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div>
                  <p className="label-text mb-4">Tech Stack</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="pill">{tech}</span>
                    ))}
                  </div>

                  <p className="label-text mb-4">Metrics</p>
                  <div className="mb-8 space-y-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm text-[#a0a0a0]"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--accent)]"
                  >
                    Discuss This Project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ProjectModal
