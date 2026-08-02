import { useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import { navLinks } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  useLayoutEffect(() => {
    if (reducedMotion || !navRef.current) return undefined
    const ctx = gsap.context(() => gsap.fromTo(navRef.current, { y: -80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power4.out', clearProps: 'transform,visibility' }), navRef)
    return () => ctx.revert()
  }, [reducedMotion])
  return (
    <header ref={navRef} className="nav">
      <div className="shell nav-inner">
        <a className="brand" href="#home" aria-label="Ankit Maurya home">ANKIT <i>MAURYA</i></a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">{navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}</nav>
        <a href="#contact" className="button button-primary">Start a conversation ↗</a>
      </div>
    </header>
  )
}
