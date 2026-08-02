import { memo } from 'react'
import { cn } from '@/utils/cn'

const SectionContainer = memo(function SectionContainer({
  id,
  className,
  children,
}) {
  return (
    <section id={id} className={cn('section-padding scroll-mt-8', className)}>
      {children}
    </section>
  )
})

export default SectionContainer
