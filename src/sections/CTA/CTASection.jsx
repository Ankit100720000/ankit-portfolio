import { ArrowRight } from 'lucide-react'
import Button from '@/ui/Button'
import SectionContainer from '@/ui/SectionContainer'
import { useSectionReveal } from '@/hooks/useSectionReveal'

function CTASection() {
  const sectionRef = useSectionReveal()

  return (
    <SectionContainer id="cta">
      <div
        ref={sectionRef}
        className="mx-auto max-w-4xl border-t border-white/8 pt-16 text-center"
      >
        <p className="section-kicker justify-center" data-reveal>
          Let&apos;s collaborate
        </p>
        <h2 className="section-title mt-6 text-balance" data-reveal>
          Let&apos;s build something impactful together.
        </h2>
        <p className="body-copy mx-auto mt-6 max-w-2xl" data-reveal>
          If you need a frontend developer who can turn complex product
          requirements into clean, high-performing interfaces, I&apos;d love to talk.
        </p>
        <div className="mt-10 flex justify-center" data-reveal>
          <Button href="#contact" icon={ArrowRight}>
            Contact Me
          </Button>
        </div>
      </div>
    </SectionContainer>
  )
}

export default CTASection
