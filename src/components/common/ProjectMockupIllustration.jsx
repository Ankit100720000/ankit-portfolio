import { memo } from 'react'

export const ProjectMockupIllustration = memo(function ProjectMockupIllustration({ id, accent = '#EB7E1C', num = '01' }) {
  const isMap = id.includes('tracking') || id.includes('mapping') || id.includes('agent') || (id.includes('crm') && id.includes('online'))
  const isStock = id.includes('stock') || id.includes('warehouse') || id.includes('inventory') || id.includes('logistics')
  const isHR = id.includes('hrms') || id.includes('ats') || id.includes('pms')

  if (isMap) {
    return (
      <div className="relative h-36 w-full overflow-hidden rounded-t-xl bg-[#050b10] border-b border-white/[0.08] p-3 flex flex-col justify-between select-none">
        {/* Map grid background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, #00ACDC 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />
        
        {/* Top window controls */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[9px] font-mono text-[#00ACDC] bg-[#00ACDC]/10 px-2 py-0.5 rounded border border-[#00ACDC]/20">
            GPS Live Tracker
          </span>
        </div>

        {/* Map Route / Pins */}
        <div className="relative z-10 my-auto flex items-center justify-around">
          <div className="relative flex flex-col items-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ACDC] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00ACDC]" />
            </span>
            <span className="mt-1 text-[8px] font-semibold text-white/70">Agent #104</span>
          </div>

          <svg width="100" height="24" viewBox="0 0 100 24" fill="none" className="opacity-80">
            <path d="M 5 12 Q 30 2 50 18 T 95 12" stroke="#00ACDC" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          <div className="relative flex flex-col items-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="mt-1 text-[8px] font-semibold text-white/70">Target Hub</span>
          </div>
        </div>

        {/* Status bar */}
        <div className="relative z-10 flex items-center justify-between text-[9.5px] font-mono text-white/50 bg-white/[0.03] px-2 py-1 rounded">
          <span>Territory: Active</span>
          <span className="text-[var(--accent)] font-bold">100% Signal</span>
        </div>
      </div>
    )
  }

  if (isStock) {
    return (
      <div className="relative h-36 w-full overflow-hidden rounded-t-xl bg-[#060c10] border-b border-white/[0.08] p-3 flex flex-col justify-between select-none">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[9px] font-mono text-[var(--accent)] bg-[var(--accent-dim)] px-2 py-0.5 rounded border border-[var(--accent)]/20">
            Inventory System
          </span>
        </div>

        {/* Progress bars */}
        <div className="space-y-2 my-auto">
          {[
            { label: 'Warehouse A', val: '84%', color: accent },
            { label: 'Warehouse B', val: '62%', color: '#00ACDC' },
            { label: 'Stock Buffer', val: '95%', color: '#00E599' },
          ].map((bar) => (
            <div key={bar.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-[9px] font-mono text-white/70">
                <span>{bar.label}</span>
                <span style={{ color: bar.color }}>{bar.val}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: bar.val, background: bar.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isHR) {
    return (
      <div className="relative h-36 w-full overflow-hidden rounded-t-xl bg-[#070812] border-b border-white/[0.08] p-3 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <span className="h-2 w-2 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[9px] font-mono text-[#00ACDC] bg-[#00ACDC]/10 px-2 py-0.5 rounded border border-[#00ACDC]/20">
            HR & ATS Pipeline
          </span>
        </div>

        {/* Kanban mini cards */}
        <div className="grid grid-cols-3 gap-2 my-auto">
          {[
            { title: 'Screening', count: '14 Active', status: '#00ACDC' },
            { title: 'Interview', count: '6 Scheduled', status: '#EB7E1C' },
            { title: 'Hired', count: '8 Confirmed', status: '#00E599' },
          ].map((col) => (
            <div key={col.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1">
              <span className="text-[8px] font-bold uppercase tracking-wider text-white/50">{col.title}</span>
              <span className="text-[10px] font-extrabold" style={{ color: col.status }}>{col.count}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default Dashboard / Analytics / CRM chart mockup
  return (
    <div className="relative h-36 w-full overflow-hidden rounded-t-xl bg-[#070b10] border-b border-white/[0.08] p-3 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <span className="h-2 w-2 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[9px] font-mono text-white/60 bg-white/10 px-2 py-0.5 rounded border border-white/10">
          Module #{num}
        </span>
      </div>

      {/* Mini Chart / Bars */}
      <div className="flex items-end justify-between gap-1.5 h-16 px-2 my-auto">
        {[40, 75, 50, 90, 65, 80, 100, 70, 85].map((val, idx) => (
          <div key={idx} className="w-full flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t transition-all duration-500"
              style={{
                height: `${val}%`,
                background: idx % 2 === 0 ? accent : '#00ACDC',
                opacity: 0.6 + (val / 200),
              }}
            />
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between text-[9px] font-mono text-white/50 border-t border-white/5 pt-1">
        <span>Metrics: Synchronized</span>
        <span className="text-white/80 font-bold">2,000+ Active</span>
      </div>
    </div>
  )
})
