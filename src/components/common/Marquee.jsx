import { memo } from 'react'

const Marquee = memo(function Marquee({ items = [] }) {
  // Duplicate items to ensure a seamless looping visual
  const displayItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.04] bg-white/[0.7] py-4.5 select-none pointer-events-none z-10" aria-hidden="true">
      <div className="marquee-track flex gap-12 text-3xl font-mono tracking-[0.28em] uppercase text-black">
        {displayItems.map((item, idx) => (
          <span key={idx} className="flex items-center gap-6 shrink-0">
            <span>{item}</span>
            <span className="text-[var(--accent)] text-3xl" style={{ textShadow: '0 0 8px var(--accent-glow)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
})

export default Marquee
