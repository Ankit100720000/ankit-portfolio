import { createElement, memo } from 'react'
import { cn } from '@/utils/cn'

const GlassCard = memo(function GlassCard({
  as: Tag = 'div',
  className,
  children,
  ...props
}) {
  return createElement(
    Tag,
    {
      className: cn('glass-panel', className),
      ...props,
    },
    children,
  )
})

export default GlassCard
