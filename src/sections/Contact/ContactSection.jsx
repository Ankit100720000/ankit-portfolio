import { contact } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'

function ContactSection() {
  const sectionRef = useSectionReveal()

  return (
    <section id="contact" ref={sectionRef} className="section-block py-32 pb-24">
      <div className="h-rule mb-20" />

      {/* Giant CTA heading */}
      <div className="mb-20" data-reveal>
        <p className="label-text mb-8">Contact</p>
        <h2 className="display-heading text-balance leading-[0.9]" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
          Let&apos;s build
          <br />
          something
          <br />
          <span className="text-gradient-accent">together.</span>
        </h2>
      </div>

      {/* Contact details */}
      <div className="grid gap-0 border-t border-white/[0.08]">
        {[
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
        ].map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
            download={item.download}
            className="group flex items-center justify-between border-b border-white/[0.08] py-8 transition-all duration-300 hover:pl-4"
            data-reveal
            data-reveal-delay={String(index + 1)}
          >
            <div className="flex items-center gap-8">
              <span className="label-text w-20">{item.label}</span>
              <span className="text-lg font-medium text-white transition-colors duration-300 group-hover:text-[var(--accent)] sm:text-xl lg:text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {item.value}
              </span>
            </div>
            <span className="text-xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
              →
            </span>
          </a>
        ))}
      </div>

      {/* Availability badge */}
      <div className="mt-16 flex items-center gap-3" data-reveal data-reveal-delay="4">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--accent)]" />
        <p className="label-text">Available for new opportunities</p>
      </div>
    </section>
  )
}

export default ContactSection
