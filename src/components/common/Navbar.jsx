import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { navLinks } from '@/data/site'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const node = navRef.current
    if (!node) return
    gsap.fromTo(
      node,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 },
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section for nav link highlighting
  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close drawer on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href) => `#${activeSection}` === href

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
          scrolled
            ? 'py-3'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Glass container */}
        <div
          className={`flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
            scrolled
              ? 'mx-4 rounded-2xl border border-white/[0.08] bg-[#060610]/90 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl'
              : ''
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
            aria-label="Ankit Maurya - Home"
          >

            <span
              className="text-3xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ankit<span className="text-[var(--accent)]">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? 'active !text-white' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              id="navbar-contact-cta"
              href="mailto:mauryankit2615@gmail.com"
              className="btn-neon hidden sm:inline-flex"
            >
              Hire me
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl"
          style={{ animation: 'fade-in 0.25s ease' }}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5">
            <a href="#home" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-dim)] text-[var(--accent)] text-sm font-extrabold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                AM
              </span>
              <span
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ankit<span className="text-[var(--accent)]">.</span>
              </span>
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-all hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex flex-col gap-1 px-5 pt-6" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl border border-transparent px-4 py-4 text-xl font-semibold text-white/80 transition-all duration-200 hover:border-[var(--accent)]/20 hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
                style={{
                  fontFamily: 'var(--font-display)',
                  animationDelay: `${i * 60}ms`,
                  animation: 'fade-up 0.4s ease forwards',
                  opacity: 0,
                }}
              >
                {link.label}
                <span className="text-[var(--muted)] text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="px-5 pt-8">
            <a
              href="mailto:mauryankit2615@gmail.com"
              onClick={() => setMobileOpen(false)}
              className="btn-neon w-full justify-center"
            >
              Get in touch →
            </a>
          </div>

          {/* Ambient glow decoration */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', filter: 'blur(60px)' }}
          />
        </div>
      )}
    </>
  )
}

export default Navbar
