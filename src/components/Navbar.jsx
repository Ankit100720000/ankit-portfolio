import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/animations/gsap'
import { navLinks } from '@/data/site'

function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const node = navRef.current
    if (!node) return

    gsap.fromTo(node,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
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
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 xl:px-24 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/85 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <a
        href="#home"
        className="font-poppins text-sm font-bold tracking-[0.12em] uppercase text-white"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Ankit<span className="text-[var(--accent)]">.</span>
      </a>

      <nav className="hidden items-center gap-10 md:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="mailto:mauryankit2615@gmail.com"
        className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] sm:inline-flex"
      >
        Hire Me
      </a>
    </header>
  )
}

export default Navbar
