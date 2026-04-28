import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Download, ExternalLink, Search } from 'lucide-react'
import { navLinks } from '@/data/site'

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === '/' && !isOpen) {
        event.preventDefault()
        setIsOpen(true)
      } else if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const filteredLinks = navLinks.filter((link) =>
    link.label.toLowerCase().includes(query.toLowerCase()),
  )

  const handleAction = (href) => {
    setIsOpen(false)
    const target = document.querySelector(href)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-start justify-center bg-black/60 p-4 pt-[14vh] backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: -24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(13,16,20,0.95)] shadow-[0_32px_120px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-300/20 to-transparent" />
            </div>

            <div className="relative flex items-center gap-3 border-b border-white/5 p-5">
              <Search size={20} className="text-sky-200" />
              <input
                autoFocus
                placeholder="Search sections or actions..."
                className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <kbd className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-400 sm:flex">
                ESC
              </kbd>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-2">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Navigation
              </div>
              {filteredLinks.map((link) => (
                <button
                  key={link.href}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  onClick={() => handleAction(link.href)}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                    <Command size={12} />
                  </div>
                  {link.label}
                </button>
              ))}

              <div className="mt-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Actions
              </div>
              <a
                href="/ankit-maurya-resume.txt"
                download
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                  <Download size={12} />
                </div>
                Download Resume
              </a>
              <a
                href="https://linkedin.com/in/ankitmaurya/"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                  <ExternalLink size={12} />
                </div>
                LinkedIn
              </a>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5">
                    ↑↓
                  </span>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5">
                    Enter
                  </span>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                Press
                <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5">
                  /
                </span>
                anywhere
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CommandPalette
