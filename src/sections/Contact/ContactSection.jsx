import { useState, useEffect, useRef } from 'react'
import { contact } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import { gsap, splitTextLinesReveal } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { Mail, FileText, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react'

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const contactLinks = [
  {
    id: 'contact-email',
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: <Mail size={18} />,
    accent: '#ff8709',
    glow: 'rgba(255,135,9,0.15)',
    dim: 'rgba(255,135,9,0.06)',
    border: 'rgba(255,135,9,0.2)',
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    value: 'ankit-maurya2000',
    href: contact.linkedin,
    external: true,
    icon: <LinkedinIcon />,
    accent: '#f7bdf8',
    glow: 'rgba(247,189,248,0.15)',
    dim: 'rgba(247,189,248,0.06)',
    border: 'rgba(247,189,248,0.2)',
  },
  {
    id: 'contact-resume',
    label: 'Resume',
    value: 'Download CV',
    href: contact.resume,
    download: 'Ankit-Maurya-Resume.txt',
    icon: <FileText size={18} />,
    accent: '#ff5d73',
    glow: 'rgba(255,93,115,0.15)',
    dim: 'rgba(255,93,115,0.06)',
    border: 'rgba(255,93,115,0.2)',
  },
]

function ContactSection() {
  const sectionRef = useSectionReveal()
  const headingRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (headingRef.current) {
      return splitTextLinesReveal(headingRef.current, headingRef.current)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to(document.documentElement, {
        '--bg': '#0c0d12',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    setSending(true)
    // Compose mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact — ${formState.name}`)
    const body = encodeURIComponent(
      `Hi Ankit,\n\n${formState.message}\n\nBest,\n${formState.name}\n${formState.email}`
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setFormState({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <section id="contact" ref={sectionRef} className="section-block pt-28 pb-40 md:pt-36 md:pb-52">


      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-x-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/4 bottom-40 h-80 w-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute right-1/3 bottom-20 h-60 w-60 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] lg:gap-12 items-center">
 
        {/* Left — CTA panel */}
        <div className="flex flex-col justify-center">
          <div className="max-w-xl">
            <p className="label-text mb-6">Let's work together</p>
            <h2
              ref={headingRef}
              className="display-heading text-balance leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.03em' }}
            >
              Let's build something <span className="text-gradient-cool">together.</span>
            </h2>
 
            <div className="mt-6 flex items-center gap-3">
              <span className="accent-dot" />
              <p
                className="text-sm text-[var(--muted-2)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Available for new opportunities · Q2 2026
              </p>
            </div>
          </div>
 
          {/* Contact link list */}
          <div className="mt-10 flex flex-col gap-3 max-w-xl">
            {contactLinks.map((item, index) => (
              <a
                key={item.label}
                id={item.id}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                download={item.download}
                className="group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:border-[var(--item-accent)] overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.015)',
                  borderColor: 'rgba(255,255,255,0.04)',
                  '--item-accent': item.accent,
                }}
                data-reveal
                data-reveal-delay={String(index + 1)}
              >
                <div className="flex items-center gap-4 z-10">
                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderColor: item.border,
                      background: item.dim,
                      color: item.accent,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.label}
                    </span>
                    <div className="text-sm font-semibold text-white transition-colors duration-200 group-hover:text-[var(--item-accent)]"
                      style={{ fontFamily: 'var(--font-display)', '--item-accent': item.accent }}>
                      {item.value}
                    </div>
                  </div>
                </div>
 
                <ArrowUpRight
                  size={16}
                  className="z-10 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--item-accent)]"
                  style={{ '--item-accent': item.accent }}
                />
 
                {/* Hover back glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${item.glow} 0%, transparent 65%)` }}
                />
              </a>
            ))}
          </div>
        </div>
 
        {/* Right — Inline contact form */}
        <div data-reveal data-reveal-delay="2" className="h-fit">
          <div className="glow-card relative h-fit p-7 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-2), transparent)' }}
            />

            {sent ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center py-12">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border"
                  style={{ borderColor: 'var(--accent)', background: 'var(--accent-dim)', color: 'var(--accent)' }}
                >
                  <CheckCircle2 size={28} />
                </div>
                <h3
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Message sent!
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-xs">
                  Your email client should have opened. Looking forward to connecting!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 btn-ghost text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div>
                  <p className="label-text mb-6">Send a message</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Jane Doe"
                    className="form-input"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email-input"
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="hello@example.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    className="form-input resize-none"
                    required
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={sending}
                  className="btn-primary mt-2 w-full justify-center"
                >
                  {sending ? (
                    <>Sending…</>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-[var(--muted)]" style={{ fontFamily: 'var(--font-display)' }}>
                  Opens your email client · No data stored
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
