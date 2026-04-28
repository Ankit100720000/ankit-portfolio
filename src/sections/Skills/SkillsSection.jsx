import { memo } from 'react'
import SectionHeading from '@/components/SectionHeading'
import { skillGroups } from '@/data/site'
import { useSectionReveal } from '@/hooks/useSectionReveal'
import GlassCard from '@/ui/GlassCard'
import SectionContainer from '@/ui/SectionContainer'

const SkillCard = memo(function SkillCard({ group }) {
  return (
    <GlassCard className="h-full rounded-[2rem] p-6 sm:p-7" data-reveal>
      <div
        className={`mb-6 h-16 rounded-[1.4rem] bg-gradient-to-br ${group.accent} opacity-90`}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-500">{group.description}</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
          {group.items.length} skills
        </span>
      </div>

      <div className="mt-8 space-y-5">
        {group.items.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-200">{item.name}</span>
              <span className="text-slate-500">{item.level}%</span>
            </div>
            <div className="skill-progress">
              <span style={{ width: `${item.level}%` }} />
            </div>
          </div>
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

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default SkillsSection
