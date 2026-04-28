import { useEffect } from 'react'
import { gsap } from '@/animations/gsap'
import { valueHighlights } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import SectionContainer from '@/ui/SectionContainer'

const valueCardsLeft = [
  'Scalable ERP architecture for complex internal workflows',
  'Usable dashboard design that surfaces the right metrics faster',
  'Frontend systems built for long-term product growth',
]

const valueCardsRight = [
  'Smooth API integration and reliable connected UI states',
  'Clean UI/UX refinement that reduces friction in daily tasks',
  'Performance-focused builds that stay fast under real usage',
]

function ValueSection() {
  const sectionRef = useSectionReveal()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) {
      return undefined
    }

    const sectionNode = sectionRef.current

    const ctx = gsap.context(() => {
      const leftTrack = sectionNode.querySelector('[data-value-left]')
      const rightTrack = sectionNode.querySelector('[data-value-right]')

      if (leftTrack) {
        gsap.fromTo(
          leftTrack,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionNode,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      if (rightTrack) {
        gsap.fromTo(
          rightTrack,
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionNode,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    }, sectionNode)

    return () => ctx.revert()
  }, [prefersReducedMotion, sectionRef])

  return (
    <SectionContainer id="value">
      <div ref={sectionRef} className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <p className="section-kicker" data-reveal>
            What I do
          </p>
          <h2 className="section-title mt-6 max-w-4xl text-balance" data-reveal>
            I design and build high-performance web applications, interactive
            dashboards, and scalable ERP systems focused on usability,
            performance, and real-world impact.
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="body-copy max-w-xl" data-reveal>
            The goal is always clarity. I take complex business requirements and
            shape them into interfaces that feel calm, readable, and reliable in
            everyday use.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2" data-reveal>
            {valueHighlights.map((item) => (
              <div
                key={item}
                className="subtle-panel px-5 py-5 text-sm font-medium text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:h-[560px]">
          <div className="space-y-5 lg:pt-10" data-value-left>
            {valueCardsLeft.map((item, index) => (
              <div
                key={item}
                className={`subtle-panel px-6 py-6 ${index === 1 ? 'lg:ml-6' : ''}`}
                data-reveal
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  0{index + 1}
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-200">{item}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5 lg:pb-10 lg:pt-24" data-value-right>
            {valueCardsRight.map((item, index) => (
              <div
                key={item}
                className={`subtle-panel px-6 py-6 ${index === 1 ? 'lg:mr-6' : ''}`}
                data-reveal
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  0{index + 4}
                </p>
                <p className="mt-4 text-lg leading-8 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default ValueSection
