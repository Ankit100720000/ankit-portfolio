import { memo } from 'react'

const PremiumBackground = memo(function PremiumBackground({ reducedMotion = false }) {
  return (
    <div
      className="premium-bg pointer-events-none fixed inset-0 -z-10"
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className="premium-bg__base" />
      <div className="premium-bg__mesh" />
      <div className="premium-bg__grid" />
      <div className="premium-bg__vignette" />
    </div>
  )
})

export default PremiumBackground

