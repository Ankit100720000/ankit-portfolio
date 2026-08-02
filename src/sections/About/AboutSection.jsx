import TechIcon from '@/components/common/TechIcon'
import { useGsapSection } from '@/hooks/useGsapSection'
const capabilities = [['Enterprise interfaces', 'ERP, CRM, ASP Web Forms & operations'], ['Frontend systems', 'React, Redux Toolkit & REST APIs'], ['Product UI', 'Figma, responsive patterns & accessibility'], ['Commerce and growth', 'Shopify, Razorpay, SEO & performance']]
const toolkit = ['React', 'JavaScript', 'Redux Toolkit', 'Tailwind CSS', 'GSAP', 'Highcharts', 'REST APIs', 'Figma', 'GitHub', 'Shopify', 'AI APIs', 'Google Maps API']
const outcomes = [['40%', 'Lower data inconsistency'], ['65→92', 'Lighthouse score'], ['500+', 'Documents processed daily'], ['35%', 'Engagement lift'], ['30%', 'Faster initial load']]
export default function AboutSection() {
  const ref = useGsapSection({ stagger: 0.09 })
  return (
    <section id="about" ref={ref} className="section-about">
      <div className="shell section">
        <div className="split">
          <div data-animate>
            <span className="eyebrow">01 — Approach</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>Make the hard part feel obvious.</h2>
          </div>
          <div>
            <p data-animate className="body-copy">I build scalable React interfaces for teams working with dense data, essential workflows, and high expectations. My work blends product thinking, UI craft, and performance engineering.</p>
            <div className="facts">
              {[['3+', 'Years shipping'], ['45+', 'Production apps'], ['500+', 'Daily users served'], ['50+', 'Figma designs shipped']].map(([value, label]) => (
                <div data-animate className="fact" key={label}>
                  <span className="fact-value">{value}</span>
                  <span className="fact-label">{label}</span>
                </div>
              ))}
            </div>
            <div className="capabilities">
              {capabilities.map(([title, detail]) => (
                <div data-animate className="capability" key={title}>
                  <b>{title}</b>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div data-animate className="toolbox">
          <div>
            <span className="eyebrow">Toolbox</span>
            <p>Tools I use to turn product complexity into clear, reliable interfaces.</p>
          </div>
          <div className="toolkit-grid">
            {toolkit.map(name => (
              <div className="tool" key={name}>
                <TechIcon name={name} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div data-animate className="impact-strip">
          {outcomes.map(([value, label]) => (
            <div className="impact" key={label}>
              <strong style={{ color: '#111410' }}>{value}</strong>
              <span style={{ color: '#111410' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
