import { useEffect, useRef } from 'react'
import { gsap, drawSvgPath } from '@/animations/gsap'

/* ─── Animated Hero Background SVG ─────────────────────────── */
export function HeroSvgDeco() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return
    const paths = svgRef.current.querySelectorAll('.draw-path')

    paths.forEach((path, i) => {
      const len = path.getTotalLength?.() ?? 600
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.6 })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.4 + i * 0.3,
        ease: 'power2.inOut',
        delay: 0.4 + i * 0.15,
      })
    })

    // Floating orbs
    const orbs = svgRef.current.querySelectorAll('.float-orb')
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: -18 - i * 6,
        x: 10 - i * 4,
        duration: 4 + i * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.6,
      })
    })

    // Rotating ring
    const ring = svgRef.current.querySelector('.spin-ring')
    if (ring) {
      gsap.to(ring, {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="svg-deco pointer-events-none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orb-grad-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,245,212,0.25)" />
          <stop offset="100%" stopColor="rgba(0,245,212,0)" />
        </radialGradient>
        <radialGradient id="orb-grad-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(162,89,255,0.2)" />
          <stop offset="100%" stopColor="rgba(162,89,255,0)" />
        </radialGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="blur-md">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,245,212,0)" />
          <stop offset="40%" stopColor="rgba(0,245,212,0.5)" />
          <stop offset="70%" stopColor="rgba(162,89,255,0.4)" />
          <stop offset="100%" stopColor="rgba(162,89,255,0)" />
        </linearGradient>
        <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,245,212,0)" />
          <stop offset="50%" stopColor="rgba(0,245,212,0.35)" />
          <stop offset="100%" stopColor="rgba(0,245,212,0)" />
        </linearGradient>
      </defs>

      {/* Large ambient orbs */}
      <ellipse className="float-orb" cx="80" cy="200" rx="320" ry="280" fill="url(#orb-grad-1)" filter="url(#blur-md)" opacity="0.6" />
      <ellipse className="float-orb" cx="1360" cy="380" rx="380" ry="320" fill="url(#orb-grad-2)" filter="url(#blur-md)" opacity="0.5" />
      <ellipse className="float-orb" cx="720" cy="820" rx="260" ry="200" fill="url(#orb-grad-1)" filter="url(#blur-md)" opacity="0.3" />

      {/* Decorative corner geometric lines */}
      <path
        className="draw-path svg-draw-path"
        d="M0 0 L140 0 L140 90"
        stroke="url(#line-grad)"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        className="draw-path svg-draw-path"
        d="M1440 900 L1300 900 L1300 810"
        stroke="url(#line-grad)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Diagonal accent lines */}
      <line
        className="draw-path"
        x1="0" y1="450" x2="400" y2="0"
        stroke="url(#line-grad)"
        strokeWidth="0.6"
        opacity="0.3"
      />
      <line
        className="draw-path"
        x1="1440" y1="450" x2="1040" y2="900"
        stroke="url(#line-grad)"
        strokeWidth="0.6"
        opacity="0.3"
      />

      {/* Vertical accent lines */}
      <line
        className="draw-path"
        x1="200" y1="0" x2="200" y2="900"
        stroke="url(#line-grad-2)"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <line
        className="draw-path"
        x1="1240" y1="0" x2="1240" y2="900"
        stroke="url(#line-grad-2)"
        strokeWidth="0.5"
        opacity="0.15"
      />

      {/* Top-right spinning ring decoration */}
      <g className="spin-ring" transform="translate(1340, 80)">
        <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(162,89,255,0.2)" strokeWidth="1" strokeDasharray="8 12" />
        <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(0,245,212,0.15)" strokeWidth="1" strokeDasharray="4 6" />
      </g>

      {/* Small accent dots / crosses */}
      {[
        [120, 60], [1320, 720], [680, 160], [850, 780],
      ].map(([x, y], i) => (
        <g key={i} opacity="0.4" transform={`translate(${x}, ${y})`}>
          <line x1="-6" y1="0" x2="6" y2="0" stroke={i % 2 === 0 ? '#00f5d4' : '#a259ff'} strokeWidth="1" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke={i % 2 === 0 ? '#00f5d4' : '#a259ff'} strokeWidth="1" />
        </g>
      ))}

      {/* Circuit-like path decoration */}
      <path
        className="draw-path svg-draw-path"
        d="M80 700 L80 620 L180 620 L180 540 L320 540 L320 480"
        stroke="rgba(0,245,212,0.3)"
        strokeWidth="1"
      />
      <circle cx="80" cy="700" r="3" fill="rgba(0,245,212,0.5)" />
      <circle cx="320" cy="480" r="3" fill="rgba(0,245,212,0.5)" />
    </svg>
  )
}

/* ─── Experience Timeline SVG ────────────────────────────── */
export function TimelineSvgLine({ height = 400 }) {
  const pathRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return
    drawSvgPath(pathRef.current, containerRef.current, 0.2)
  }, [])

  return (
    <div ref={containerRef} className="absolute left-[11px] top-0 hidden md:block" style={{ height, width: 2 }}>
      <svg
        width="24"
        height={height}
        viewBox={`0 0 24 ${height}`}
        fill="none"
        className="overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="timeline-line-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#ff8709" />
            <stop offset="60%" stopColor="#f7bdf8" />
            <stop offset="100%" stopColor="rgba(247,189,248,0)" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          className="svg-draw-path"
          d={`M 12 0 L 12 ${height}`}
          stroke="url(#timeline-line-grad)"
          strokeWidth="2"
          opacity="0.8"
          style={{ filter: 'drop-shadow(0 0 4px rgba(255,135,9,0.4))' }}
        />
      </svg>
    </div>
  )
}

/* ─── Section connector SVG ──────────────────────────────── */
export function SectionConnector({ color = '#ff8709' }) {
  const pathRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return
    const len = pathRef.current.getTotalLength?.() ?? 300
    gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 90%',
        once: true,
      },
    })
  }, [])

  return (
    <div ref={wrapRef} className="relative flex items-center justify-center py-6 overflow-hidden" aria-hidden="true">
      <svg width="100%" height="32" viewBox="0 0 800 32" preserveAspectRatio="none" className="svg-deco" style={{ position: 'relative' }}>
        <defs>
          <linearGradient id={`conn-grad-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={color} stopOpacity="0.5" />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 0 16 Q 200 4 400 16 Q 600 28 800 16"
          stroke={`url(#conn-grad-${color.replace('#','')})`}
          strokeWidth="1"
          fill="none"
          className="svg-draw-path"
        />
        {/* Center diamond */}
        <polygon
          points="400,10 406,16 400,22 394,16"
          fill={color}
          opacity="0.7"
        />
      </svg>
    </div>
  )
}

/* ─── Skill radar / ring decoration ─────────────────────── */
export function SkillOrbitSvg() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return
    const rings = svgRef.current.querySelectorAll('.orbit-ring')
    rings.forEach((r, i) => {
      gsap.to(r, {
        rotate: i % 2 === 0 ? 360 : -360,
        duration: 20 + i * 5,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      })
    })
    // Pulse dots
    const dots = svgRef.current.querySelectorAll('.pulse-dot')
    dots.forEach((d, i) => {
      gsap.to(d, {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.5 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
        transformOrigin: 'center center',
      })
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill="none"
      aria-hidden="true"
      className="svg-deco"
      style={{ position: 'relative', opacity: 0.6 }}
    >
      <circle className="orbit-ring" cx="130" cy="130" r="120" stroke="rgba(0,245,212,0.12)" strokeWidth="1" strokeDasharray="4 10" />
      <circle className="orbit-ring" cx="130" cy="130" r="88" stroke="rgba(162,89,255,0.15)" strokeWidth="1" strokeDasharray="6 8" />
      <circle className="orbit-ring" cx="130" cy="130" r="56" stroke="rgba(0,245,212,0.2)" strokeWidth="1" strokeDasharray="3 6" />

      {/* Inner glow */}
      <circle cx="130" cy="130" r="28" fill="rgba(0,245,212,0.05)" />
      <circle cx="130" cy="130" r="14" fill="rgba(0,245,212,0.1)" />
      <circle cx="130" cy="130" r="5" fill="rgba(0,245,212,0.8)" className="pulse-dot" />

      {/* Orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 130 + 120 * Math.cos(rad)
        const y = 130 + 120 * Math.sin(rad)
        return (
          <circle
            key={i}
            className="pulse-dot"
            cx={x} cy={y} r="3"
            fill={i % 2 === 0 ? 'rgba(0,245,212,0.7)' : 'rgba(162,89,255,0.7)'}
          />
        )
      })}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 130 + 88 * Math.cos(rad)
        const y = 130 + 88 * Math.sin(rad)
        return (
          <circle key={`inner-${i}`} cx={x} cy={y} r="2" fill="rgba(162,89,255,0.6)" />
        )
      })}
    </svg>
  )
}

/* ─── Scroll progress bar ────────────────────────────────── */
export function ScrollProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = Math.min((scrollTop / docHeight) * 100, 100)
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return <div id="scroll-progress" ref={barRef} aria-hidden="true" />
}
