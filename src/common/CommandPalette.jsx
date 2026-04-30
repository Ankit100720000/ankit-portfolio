import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Download, ExternalLink, Search } from 'lucide-react'
import { contact, navLinks } from '@/data/site'

function isTypingTarget(target) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

function triggerDownload(href) {
  const anchor = document.createElement('a')
  anchor.href = href
  anchor.download = ''
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const filteredLinks = navLinks.filter((link) =>
      link.label.toLowerCase().includes(query.toLowerCase()),
    )

    return [
      ...filteredLinks.map((link) => ({
        type: 'nav',
        label: link.label,
        href: link.href,
      })),
      { type: 'action', label: 'Download Resume', href: contact.resume, action: 'download' },
      { type: 'action', label: 'LinkedIn', href: contact.linkedin, action: 'external' },
    ]
  }, [query])

  const clampedIndex = Math.min(
    Math.max(activeIndex, 0),
    Math.max(items.length - 1, 0),
  )

  const openPalette = () => {
    setQuery('')
    setActiveIndex(0)
    setIsOpen(true)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isTypingTarget(event.target)) {
        return
      }

      const key = event.key.toLowerCase()
      const openShortcut =
        (key === 'k' && (event.metaKey || event.ctrlKey)) ||
        key === '/' ||
        (key === 'p' && (event.metaKey || event.ctrlKey))

      if (openShortcut && !isOpen) {
        event.preventDefault()
        openPalette()
        return
      }

      if (key === 'escape' && isOpen) {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      if (!isOpen) {
        return
      }

      if (key === 'arrowdown') {
        event.preventDefault()
        setActiveIndex((prev) => prev + 1)
      } else if (key === 'arrowup') {
        event.preventDefault()
        setActiveIndex((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [isOpen])

  const handleAction = (item) => {
    setIsOpen(false)

    if (!item) return

    if (item.type === 'nav') {
      const target = document.querySelector(item.href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    if (item.action === 'download') {
      triggerDownload(item.href)
      return
    }

    if (item.action === 'external') {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onEnter = (event) => {
      if (event.key !== 'Enter') return
      if (isTypingTarget(event.target) && event.target !== inputRef.current) return
      event.preventDefault()
      handleAction(items[clampedIndex])
    }

    window.addEventListener('keydown', onEnter)
    return () => window.removeEventListener('keydown', onEnter)
  }, [clampedIndex, isOpen, items])

  const navItems = items.filter((i) => i.type === 'nav')
  const actionItems = items.filter((i) => i.type === 'action')

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
                ref={inputRef}
                placeholder="Search sections or actions..."
                className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActiveIndex(0)
                }}
              />
              <kbd className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-slate-400 sm:flex">
                ESC
              </kbd>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-2">
              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Navigation
              </div>
              {navItems.map((item, idx) => {
                const isActive = clampedIndex === idx

                return (
                  <button
                    key={item.href}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleAction(item)}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                      <Command size={12} />
                    </div>
                    {item.label}
                  </button>
                )
              })}

              <div className="mt-2 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Actions
              </div>
              {actionItems.map((item, i) => {
                const idx = navItems.length + i
                const isActive = clampedIndex === idx
                const Icon = item.action === 'download' ? Download : ExternalLink

                return (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleAction(item)}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded border border-white/10 bg-white/5">
                      <Icon size={12} />
                    </div>
                    {item.label}
                  </button>
                )
              })}
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
                  Ctrl/⌘ K
                </span>
                or
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
