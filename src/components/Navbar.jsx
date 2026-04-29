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
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? 'border-white/[0.08] bg-[#0a0b10]/80 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'border-white/[0.05] bg-white/[0.02] backdrop-blur-md'
        }`}
      >
        <a
          href="#home"
          className="flex items-center gap-2 px-2 text-sm font-bold tracking-[0.14em] uppercase text-white"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
            <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-60 blur-[6px]" />
          </span>
          Ankit
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#9296a2] transition-all duration-300 hover:bg-white/[0.06] hover:text-white"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:mauryankit2615@gmail.com"
          className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-[var(--accent)] sm:inline-flex"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Hire Me
          <span className="arrow-anim">→</span>
        </a>
      </div>
    </header>
  )
}

export default Navbar
