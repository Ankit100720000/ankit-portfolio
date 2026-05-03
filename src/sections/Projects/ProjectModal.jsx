import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

function ProjectModal({ project, coverMap = {}, palettes = [], projectIndex = 0, onClose }) {
  useEffect(() => {
    if (!project) return undefined

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [project, onClose])

  const palette = palettes[projectIndex % Math.max(palettes.length, 1)] || {
    accent: '#d6ff3a',
    soft: 'rgba(214, 255, 58, 0.16)',
    line: 'rgba(214, 255, 58, 0.58)',
  }

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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0c0d12] shadow-[0_35px_120px_-60px_var(--modal-line)] ring-1 ring-white/[0.08]"
            style={{
              '--modal-accent': palette.accent,
              '--modal-soft': palette.soft,
              '--modal-line': palette.line,
              background:
                `radial-gradient(900px 420px at 0% 0%, ${palette.soft}, transparent 58%), linear-gradient(180deg, rgba(17,19,27,0.98), rgba(8,9,13,0.98))`,
            }}
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 ring-1 ring-white/10 transition hover:bg-white hover:text-black"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {(() => {
              const cover = coverMap[project.id] || project.preview
              return cover ? (
                <div className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-transparent" />
                  <div className="absolute left-0 top-0 h-1 w-full bg-[var(--modal-accent)]" />
                  <img
                    src={cover}
                    alt={project.title}
                    className="h-60 w-full object-cover opacity-80 saturate-125 sm:h-80"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-t-[2rem] bg-white/[0.03] text-sm text-[var(--muted)]">
                  {project.metrics[0]}
                </div>
              )
            })()}

            <div className="p-7 sm:p-10">
              <div className="mb-8">
                <p className="label-text mb-4 text-[var(--modal-accent)]">Enterprise Case Study</p>
                <h3
                  id="modal-title"
                  className="text-3xl font-black leading-tight text-white sm:text-5xl"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: 0 }}
                >
                  {project.title}
                </h3>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                  <p className="body-md mb-6">{project.description}</p>

                  <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-[0_20px_60px_-44px_var(--modal-line)]">
                    <p className="label-text mb-3">Impact</p>
                    <p className="body-md">{project.impact}</p>
                  </div>

                  <div className="space-y-3">
                    {project.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.035] px-4 py-4"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--modal-accent)]" />
                        <p className="text-sm leading-7 text-[#a0a0a0]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

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
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-medium text-[#b8bbc6]"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={onClose}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, #ffffff, ${palette.accent})` }}
                  >
                    Discuss This Project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
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
