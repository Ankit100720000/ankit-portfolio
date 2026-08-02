import { experience } from '@/data/site'
import { useGsapSection } from '@/hooks/useGsapSection'

export default function ExperienceSection() {
  const ref = useGsapSection({ selector: '[data-animate]', stagger: 0.15 })
  return (
    <section id="experience" ref={ref} className="section-experience">
      <div className="shell section">
        <div className="split">
          <div data-animate>
            <span className="eyebrow">03 — Experience</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>A record of useful outcomes.</h2>
          </div>
          <div className="timeline">
            {experience.map(role => (
              <article data-animate className="role" key={role.company}>
                <div className="role-period">{role.period}</div>
                <div>
                  <h3>{role.title}</h3>
                  <p className="role-company">{role.company}</p>
                  <ul>
                    {role.points.slice(0, 3).map(point => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
