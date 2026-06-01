import { memo } from 'react'
import { cn } from '@/utils/cn'

const SectionHeading = memo(function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  center = false,
}) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      <span className="section-kicker" data-reveal>
        {eyebrow}
      </span>
      <h2 className="section-title mt-5 text-balance" data-reveal>
        {title}
      </h2>
      <p className="body-copy mt-5 text-balance" data-reveal>
        {description}
      </p>
    </div>
  )
})

export default SectionHeading
