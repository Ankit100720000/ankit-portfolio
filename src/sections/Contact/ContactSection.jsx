import { contact } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'

function ContactSection() {
  const sectionRef = useSectionReveal()

  const links = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/ankit-maurya2000',
      href: contact.linkedin,
      external: true,
    },
    {
      label: 'Resume',
      value: 'Download CV',
      href: contact.resume,
      download: 'Ankit-Maurya-Resume.txt',
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section-block py-32 pb-24">
      <div className="h-rule mb-20" />

      {/* CTA panel */}
      <div className="modern-card relative overflow-hidden p-8 sm:p-14 lg:p-20" data-reveal>
        {/* Decorative aurora */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-[var(--accent)]/[0.10] blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-[#7cf2ff]/[0.06] blur-[120px]" />

        <div className="relative">
          <p className="label-text mb-8">Contact</p>
          <h2
            className="display-heading text-balance leading-[0.9]"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-gradient-accent">together.</span>
          </h2>

          <div className="mt-10 flex items-center gap-3">
            <span className="accent-dot" />
            <p
              className="text-sm text-[var(--muted-2)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Available for new opportunities · Q2 2026
            </p>
          </div>
        </div>
      </div>

      {/* Contact links */}
      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {links.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            download={item.download}
            className="modern-card group relative flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7"
            data-reveal
            data-reveal-delay={String(index + 1)}
          >
            <span className="label-text">{item.label}</span>
            <div className="mt-10 flex items-end justify-between gap-4">
              <span
                className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.value}
              </span>
              <span className="text-xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactSection
