import { memo } from 'react'

const Marquee = memo(function Marquee({ items = [] }) {
  // Duplicate items to ensure a seamless looping visual
  const displayItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/[0.06] py-5 select-none pointer-events-none z-10"
      aria-hidden="true"
      style={{
        background: 'linear-gradient(90deg, rgba(255,135,9,0.03), rgba(247,189,248,0.03), rgba(255,135,9,0.03))',
      }}
    >
      <div
        className="marquee-track flex gap-12 text-2xl tracking-[0.22em] uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.12)',
        }}
      >
        {displayItems.map((item, idx) => (
          <span key={idx} className="flex items-center gap-6 shrink-0">
            <span>{item}</span>
            <span
              className="text-lg"
              style={{
                color: 'var(--accent)',
                textShadow: '0 0 8px var(--accent-glow)',
                opacity: 0.6,
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
})

export default Marquee
