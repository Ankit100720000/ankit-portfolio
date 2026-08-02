import { contact } from '@/data/site'
import { useGsapSection } from '@/hooks/useGsapSection'

export default function ContactSection() {
  const ref = useGsapSection({ stagger: 0.14, start: 'top 82%' })
  return (
    <section id="contact" ref={ref} className="section-contact">
      <div className="shell section contact-inner">
        <span data-animate className="eyebrow">04 — Contact</span>
        <h2 data-animate className="section-title">Have a complex product problem?<br />Let’s make it easier to use.</h2>
        <div data-animate className="contact-grid">
          <a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          <div className="contact-links">
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={contact.resume} target="_blank" rel="noreferrer">Resume ↗</a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>Call ↗</a>
          </div>
        </div>
      </div>
    </section>
  )
}
