import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { navLinks } from '@/data/site'

function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <div
        className={`relative flex w-full max-w-6xl items-center justify-between gap-4 overflow-hidden rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? 'border-white/[0.10] bg-[#0a0b10]/86 shadow-[0_14px_45px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl'
            : 'border-white/[0.07] bg-white/[0.035] backdrop-blur-md'
        }`}
      >
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <a
          href="#home"
          className="flex items-center gap-3 px-2 text-sm font-bold uppercase tracking-[0.14em] text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] text-[var(--accent)]">
            AM
            <span className="absolute inset-0 rounded-full bg-[var(--accent)]/20 blur-md" />
          </span>
          Ankit
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#a1a5b1] transition-all duration-300 hover:bg-white/[0.07] hover:text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:mauryankit2615@gmail.com"
          className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[var(--accent)] sm:inline-flex"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Hire Me
          <span className="arrow-anim">-&gt;</span>
        </a>
      </div>
    </header>
  )
}

export default Navbar
