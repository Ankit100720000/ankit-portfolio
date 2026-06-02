import { memo, useEffect, useRef } from 'react'
import SectionHeading from '@/components/common/SectionHeading'
import { skillGroups } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import GlassCard from '@/components/ui/GlassCard'
import SectionContainer from '@/components/ui/SectionContainer'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const SkillBar = memo(function SkillBar({ name, level, index, accentColor }) {
  const barRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!barRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          delay: 0.15 * index,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top bottom-=80',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [level, index, prefersReducedMotion])

  return (
    <div className="skill-bar-row group">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-200 transition-colors duration-300 group-hover:text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {name}
        </span>
        <span
          className="rounded-full border px-2 py-0.5 text-[10px] font-bold tabular-nums transition-all duration-300 group-hover:border-transparent"
          style={{
            fontFamily: 'var(--font-display)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: accentColor || 'var(--accent)',
          }}
        >
          {level}%
        </span>
      </div>
      <div className="skill-progress-track">
        <span
          ref={barRef}
          className="skill-progress-fill"
          style={{
            width: prefersReducedMotion ? `${level}%` : '0%',
            '--bar-accent': accentColor || 'var(--accent)',
          }}
        />
      </div>
    </div>
  )
})

const SkillCard = memo(function SkillCard({ group, groupIndex }) {
  // Extract accent colors from the gradient class
  const accentColors = {
    0: '#ff8709',
    1: '#f7bdf8',
  }
  const accentColor = accentColors[groupIndex] || '#ff8709'

  return (
    <GlassCard className="skill-glass-card h-full rounded-2xl p-7 sm:p-8" data-reveal>
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h3
            className="text-xl font-extrabold text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
          >
            {group.title}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-slate-500">{group.description}</p>
        </div>
        <span
          className="shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            fontFamily: 'var(--font-display)',
            borderColor: `${accentColor}33`,
            background: `${accentColor}0d`,
            color: accentColor,
          }}
        >
          {group.items.length} skills
        </span>
      </div>

      {/* Skill bars */}
      <div className="space-y-5">
        {group.items.map((item, i) => (
          <SkillBar
            key={item.name}
            name={item.name}
            level={item.level}
            index={i}
            accentColor={accentColor}
          />
        ))}
      </div>
    </GlassCard>
  )
})

function SkillsSection() {
  const sectionRef = useSectionReveal()

  return (
    <SectionContainer id="skills">
      <div ref={sectionRef}>
        <SectionHeading
          eyebrow="Skills"
          title="A frontend stack tuned for product polish, interaction quality, and runtime performance."
          description="I lean on a focused toolkit rather than a bloated one, pairing solid frontend fundamentals with motion, API integration, and product-minded implementation."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} groupIndex={i} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default SkillsSection
