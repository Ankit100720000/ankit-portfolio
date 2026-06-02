import { useEffect, useRef, useState } from 'react'
import { gsap, splitTextLinesReveal } from '@/animations/gsap'
import { Draggable } from 'gsap/Draggable'
import { projects } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowUpRight, Layers3, Sparkles, GripVertical } from 'lucide-react'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(Draggable)

const palettes = [
  { accent: '#ff8709', dim: 'rgba(255,135,9,0.07)', border: 'rgba(255,135,9,0.22)', glow: 'rgba(255,135,9,0.18)', num: '01', bg: 'radial-gradient(circle at center, #592700 0%, #1c0d00 100%)' },
  { accent: '#f7bdf8', dim: 'rgba(247,189,248,0.07)', border: 'rgba(247,189,248,0.22)', glow: 'rgba(247,189,248,0.18)', num: '02', bg: 'radial-gradient(circle at center, #43144c 0%, #1b071e 100%)' },
  { accent: '#ff5d73', dim: 'rgba(255,93,115,0.07)', border: 'rgba(255,93,115,0.22)', glow: 'rgba(255,93,115,0.18)', num: '03', bg: 'radial-gradient(circle at center, #570f1a 0%, #1d0408 100%)' },
  { accent: '#ffd166', dim: 'rgba(255,209,102,0.07)', border: 'rgba(255,209,102,0.22)', glow: 'rgba(255,209,102,0.18)', num: '04', bg: 'radial-gradient(circle at center, #4f3c05 0%, #1a1401 100%)' },
  { accent: '#ff8709', dim: 'rgba(255,135,9,0.07)', border: 'rgba(255,135,9,0.22)', glow: 'rgba(255,135,9,0.18)', num: '05', bg: 'radial-gradient(circle at center, #592700 0%, #1c0d00 100%)' },
  { accent: '#f7bdf8', dim: 'rgba(247,189,248,0.07)', border: 'rgba(247,189,248,0.22)', glow: 'rgba(247,189,248,0.18)', num: '06', bg: 'radial-gradient(circle at center, #43144c 0%, #1b071e 100%)' },
  { accent: '#ff5d73', dim: 'rgba(255,93,115,0.07)', border: 'rgba(255,93,115,0.22)', glow: 'rgba(255,93,115,0.18)', num: '07', bg: 'radial-gradient(circle at center, #570f1a 0%, #1d0408 100%)' },
  { accent: '#ffd166', dim: 'rgba(255,209,102,0.07)', border: 'rgba(255,209,102,0.22)', glow: 'rgba(255,209,102,0.18)', num: '08', bg: 'radial-gradient(circle at center, #4f3c05 0%, #1a1401 100%)' },
]

function ProjectsSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [activeIndex, setActiveIndex]     = useState(0)
  const [dragActiveIdx, setDragActiveIdx] = useState(-1)

  useEffect(() => {
    if (headingRef.current) {
      return splitTextLinesReveal(headingRef.current, headingRef.current)
    }
  }, [])

  // Card Entrance Animations
  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return
 
    const cards = gsap.utils.toArray('.proj-h-card')
 
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        }
      )
 
      // Background color scroll transition
      gsap.to(document.documentElement, {
        '--bg': '#10091a',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      })
    }, sectionRef)
 
    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Drag Interaction with GRAVITY PHYSICS (ball-like bounce for cards)
  const physicsRef = useRef({}) // per-card physics state: { vx, vy, lastX, lastY, lastTime, active }
  const physicsLoopRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const cards = gsap.utils.toArray('.proj-h-card')
    if (cards.length === 0) return

    const GRAVITY = 0.35
    const BOUNCE = 0.55
    const FRICTION = 0.985
    const AIR_RESIST = 0.997
    const MIN_VEL = 0.3

    // Init physics state for each card — start with random velocity so they bounce from load!
    const physics = {}
    cards.forEach((card, i) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 8 // random initial speed between 4-12
      physics[i] = {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3, // slight upward bias for dramatic effect
        active: true, // START IMMEDIATELY
        lastX: 0,
        lastY: 0,
        lastTime: 0,
      }
    })
    physicsRef.current = physics

    // Physics loop — runs all the time, checks which cards need physics
    let running = true
    const tick = () => {
      if (!running) return

      const section = sectionRef.current
      if (!section) { physicsLoopRef.current = requestAnimationFrame(tick); return }
      const sectionRect = section.getBoundingClientRect()

      // Phase 1: Compute intended new absolute positions and velocities for all cards
      const cardData = cards.map((card, i) => {
        const p = physics[i]
        const d = Draggable.get(card)
        if (!p || !d) return null

        const cardRect = card.getBoundingClientRect()
        const cardW = cardRect.width
        const cardH = cardRect.height
        const radius = cardW / 2

        const origLeft = cardRect.left - sectionRect.left - d.x
        const origTop = cardRect.top - sectionRect.top - d.y

        // Apply forces if active
        if (p.active) {
          p.vy += GRAVITY
          p.vx *= AIR_RESIST
          p.vy *= AIR_RESIST
        }

        const newX = d.x + p.vx
        const newY = d.y + p.vy

        return {
          card, i, p, d,
          radius, cardW, cardH, origLeft, origTop,
          cx: origLeft + newX + radius,
          cy: origTop + newY + radius
        }
      }).filter(Boolean)

      // Phase 2: Resolve collisions between all pairs of cards (Circle-to-Circle)
      for (let iter = 0; iter < 2; iter++) { // 2 iterations for stable collision resolution
        for (let i = 0; i < cardData.length; i++) {
          for (let j = i + 1; j < cardData.length; j++) {
            const c1 = cardData[i]
            const c2 = cardData[j]

            const dx = c2.cx - c1.cx
            const dy = c2.cy - c1.cy
            const dist = Math.hypot(dx, dy)
            const minDist = c1.radius + c2.radius

            if (dist < minDist && dist > 0.1) { // They are overlapping!
              const overlap = minDist - dist
              const nx = dx / dist
              const ny = dy / dist

              // Separate them visually
              c1.cx -= nx * (overlap / 2)
              c1.cy -= ny * (overlap / 2)
              c2.cx += nx * (overlap / 2)
              c2.cy += ny * (overlap / 2)

              // Wake up inactive cards if they get bumped hard
              if (!c1.p.active && (Math.abs(c2.p.vx) > 1 || Math.abs(c2.p.vy) > 1)) c1.p.active = true
              if (!c2.p.active && (Math.abs(c1.p.vx) > 1 || Math.abs(c1.p.vy) > 1)) c2.p.active = true

              // Exchange momentum/velocity elastically
              const kx = c1.p.vx - c2.p.vx
              const ky = c1.p.vy - c2.p.vy
              const pValue = nx * kx + ny * ky

              const bounce = 0.85 // bounciness between cards
              c1.p.vx -= pValue * nx * bounce
              c1.p.vy -= pValue * ny * bounce
              c2.p.vx += pValue * nx * bounce
              c2.p.vy += pValue * ny * bounce
            }
          }
        }
      }

      // Phase 3: Check wall boundaries, enforce bounds, update GSAP
      cardData.forEach(c => {
        if (!c.p.active) return

        // Convert absolute center back to relative top-left
        let newX = c.cx - c.radius - c.origLeft
        let newY = c.cy - c.radius - c.origTop

        const maxRight = sectionRect.width - c.origLeft - c.cardW
        const maxLeft = -c.origLeft
        const maxBottom = sectionRect.height - c.origTop - c.cardH
        const maxTop = -c.origTop

        // Floor bounce
        if (newY > maxBottom) {
          newY = maxBottom
          c.p.vy = -Math.abs(c.p.vy) * BOUNCE
          c.p.vx *= FRICTION
        }
        // Ceiling bounce
        if (newY < maxTop) {
          newY = maxTop
          c.p.vy = Math.abs(c.p.vy) * BOUNCE
        }
        // Left wall
        if (newX < maxLeft) {
          newX = maxLeft
          c.p.vx = Math.abs(c.p.vx) * BOUNCE
        }
        // Right wall
        if (newX > maxRight) {
          newX = maxRight
          c.p.vx = -Math.abs(c.p.vx) * BOUNCE
        }

        // Kill tiny velocities to allow resting
        if (Math.abs(c.p.vx) < MIN_VEL) c.p.vx = 0
        if (Math.abs(c.p.vy) < MIN_VEL && Math.abs(newY - maxBottom) < 1) c.p.vy = 0

        // Stop physics if completely settled
        if (c.p.vx === 0 && c.p.vy === 0 && Math.abs(newY - maxBottom) < 2) {
          c.p.active = false
          const inner = c.card.querySelector('.proj-h-card-inner')
          if (inner) {
            gsap.to(inner, {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              duration: 0.5,
              overwrite: 'auto'
            })
          }
        }

        // Apply position
        gsap.set(c.card, { x: newX, y: newY })
        c.d.update()

        // Dynamic glow based on speed
        const speed = Math.hypot(c.p.vx, c.p.vy)
        const inner = c.card.querySelector('.proj-h-card-inner')
        if (inner && speed > 1) {
          const intensity = Math.min(speed / 12, 1)
          inner.style.boxShadow = `0 ${4 + intensity * 6}px ${12 + intensity * 10}px rgba(0,0,0,${0.15 + intensity * 0.15})`
        }
      })

      physicsLoopRef.current = requestAnimationFrame(tick)
    }

    physicsLoopRef.current = requestAnimationFrame(tick)

    // Create Draggable instances that feed into the physics system
    const draggables = Draggable.create(cards, {
      type: 'x,y',
      edgeResistance: 0.65,
      zIndexBoost: true,
      onDragStart: function() {
        const idx = cards.indexOf(this.target)
        const p = physics[idx]
        if (p) {
          p.active = false // pause physics while dragging
          p.vx = 0
          p.vy = 0
          p.lastX = this.x
          p.lastY = this.y
          p.lastTime = performance.now()
        }
 
        const inner = this.target.querySelector('.proj-h-card-inner')
        if (inner) {
          gsap.to(inner, {
            scale: 1.05,
            borderColor: 'rgba(255,255,255,0.25)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            duration: 0.2,
            overwrite: 'auto'
          })
        }
 
        // Neighbor highlight
        const dragIdx = idx
        setDragActiveIdx(dragIdx)
        cards.forEach((card, ci) => {
          if (ci === dragIdx) return
          const dist = Math.abs(ci - dragIdx)
          if (dist <= 2) {
            const neighborInner = card.querySelector('.proj-h-card-inner')
            if (neighborInner) {
              const factor = dist === 1 ? 1 : 0.5
              gsap.to(neighborInner, {
                scale: 1 + 0.04 * factor,
                borderColor: `rgba(255,135,9,${0.35 * factor})`,
                boxShadow: `0 4px 10px rgba(0,0,0,0.12)`,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
              })
            }
            card.classList.add('proj-neighbor-active')
          }
        })
      },
      onDrag: function() {
        const idx = cards.indexOf(this.target)
        const p = physics[idx]
        if (p) {
          // Track velocity from drag movement
          const now = performance.now()
          const dt = now - p.lastTime
          if (dt > 0) {
            p.vx = ((this.x - p.lastX) / dt) * 16 * 0.55
            p.vy = ((this.y - p.lastY) / dt) * 16 * 0.55
          }
          p.lastX = this.x
          p.lastY = this.y
          p.lastTime = now
        }

        // Tilt neighbors
        const dragIdx = idx
        cards.forEach((card, ci) => {
          if (ci === dragIdx) return
          const dist = Math.abs(ci - dragIdx)
          if (dist <= 2) {
            const neighborInner = card.querySelector('.proj-h-card-inner')
            if (neighborInner) {
              const dragRect = this.target.getBoundingClientRect()
              const cardRect = card.getBoundingClientRect()
              const dx = dragRect.left - cardRect.left
              const dy = dragRect.top - cardRect.top
              const tiltX = Math.max(-8, Math.min(8, (dy / 300) * 8))
              const tiltY = Math.max(-8, Math.min(8, -(dx / 300) * 8))
              gsap.to(neighborInner, {
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 800,
                duration: 0.3,
                overwrite: 'auto'
              })
            }
          }
        })
      },
      onDragEnd: function() {
        const idx = cards.indexOf(this.target)
        const p = physics[idx]
        if (p) {
          // Clamp fling velocity
          const maxFling = 18
          p.vx = Math.max(-maxFling, Math.min(maxFling, p.vx))
          p.vy = Math.max(-maxFling, Math.min(maxFling, p.vy))
          p.active = true // START PHYSICS! gravity takes over
        }

        const inner = this.target.querySelector('.proj-h-card-inner')
        if (inner) {
          gsap.to(inner, {
            scale: 1,
            borderColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            duration: 0.3,
            overwrite: 'auto'
          })
        }

        setDragActiveIdx(-1)

        // Reset neighbors
        cards.forEach((card) => {
          card.classList.remove('proj-neighbor-active')
          const neighborInner = card.querySelector('.proj-h-card-inner')
          if (neighborInner) {
            gsap.to(neighborInner, {
              scale: 1,
              borderColor: 'rgba(255,255,255,0.06)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              ease: 'power3.out',
              overwrite: 'auto'
            })
          }
        })
      }
    })

    return () => {
      running = false
      if (physicsLoopRef.current) cancelAnimationFrame(physicsLoopRef.current)
      draggables.forEach(d => d.kill())
    }
  }, [prefersReducedMotion])

  // Mouse Interaction (Bouncy physics: attraction + drift away + 3D tilt)
  useEffect(() => {
    if (prefersReducedMotion) return

    const section = sectionRef.current
    const cards = gsap.utils.toArray('.proj-h-card')

    if (!section || cards.length === 0) return

    const radius = 300 // slightly smaller radius for smaller cards
    let lastMouseX = 0
    let lastMouseY = 0
    let hasMoved = false

    const updateCards = () => {
      if (!hasMoved) return
      cards.forEach((card, ci) => {
        const inner = card.querySelector('.proj-h-card-inner')
        if (!inner) return

        const p = palettes[ci % palettes.length]
        const rect = card.getBoundingClientRect()
        const cardX = rect.left + rect.width / 2
        const cardY = rect.top + rect.height / 2

        const dx = cardX - lastMouseX
        const dy = cardY - lastMouseY
        const dist = Math.hypot(dx, dy)

        let targetX = 0
        let targetY = 0
        let targetScale = 1
        let rotateX = 0
        let rotateY = 0
        let targetBorderColor = 'rgba(255,255,255,0.06)'
        let targetBoxShadow = '0 4px 12px rgba(0,0,0,0.15)'

        // If card is being dragged, we skip custom mouse-displacement to let Draggable control it
        const isDragging = Draggable.get(card)?.isDragging

        if (dist < radius && !isDragging) {
          const factor = (radius - dist) / radius
          
          // True circular hover detection based on distance to card center
          const cardRadius = rect.width / 2
          const isHovered = dist <= cardRadius

          if (isHovered) {
            // Magnet pull
            targetX = -dx * 0.15
            targetY = -dy * 0.15
            targetScale = 1.08
            // 3D tilt rotation
            rotateX = (dy / rect.height) * 20
            rotateY = -(dx / rect.width) * 20
            
            // Brighten border and add premium glow
            targetBorderColor = p.accent
            targetBoxShadow = `0 8px 20px rgba(0,0,0,0.2), 0 0 10px ${p.glow}`
          } else {
            // Drift away push
            const angle = Math.atan2(dy, dx)
            const pushDist = factor * 22
            targetX = Math.cos(angle) * pushDist
            targetY = Math.sin(angle) * pushDist
            targetScale = 1 - (0.05 * factor)
            
            targetBorderColor = 'rgba(255,255,255,0.06)'
            targetBoxShadow = '0 4px 12px rgba(0,0,0,0.15)'
          }
        }

        if (!isDragging) {
          gsap.to(inner, {
            x: targetX,
            y: targetY,
            scale: targetScale,
            rotateX: rotateX,
            rotateY: rotateY,
            borderColor: targetBorderColor,
            boxShadow: targetBoxShadow,
            transformPerspective: 800,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      })
    }

    const handleMouseMove = (e) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      hasMoved = true
      updateCards()
    }

    const handleMouseLeave = () => {
      hasMoved = false
      cards.forEach((card) => {
        const inner = card.querySelector('.proj-h-card-inner')
        const isDragging = Draggable.get(card)?.isDragging
        if (inner && !isDragging) {
          gsap.to(inner, {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            borderColor: 'rgba(255,255,255,0.06)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', updateCards)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', updateCards)
    }
  }, [prefersReducedMotion])

  const handleCardClick = (project, idx, e) => {
    const d = Draggable.get(e.currentTarget)
    if (d && !d.clickAllowed) return
    setActiveProject(project)
    setActiveIndex(idx)
  }

  const handleReset = () => {
    // Stop all active physics
    const physics = physicsRef.current
    Object.keys(physics).forEach(k => {
      physics[k].vx = 0
      physics[k].vy = 0
      physics[k].active = false
    })

    const cards = gsap.utils.toArray('.proj-h-card')
    gsap.to(cards, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      overwrite: 'auto'
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative pt-28 pb-40 md:pt-36 md:pb-52 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Blueprint Dotted Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }} />


      {/* Header */}
      <div
        className="section-block relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-xl"
            style={{ borderColor: 'rgba(255,135,9,0.2)', background: 'rgba(255,135,9,0.06)', color: 'var(--accent)' }}>
            <Sparkles size={12} />
            Enterprise Project Library
          </div>
          <h2
            ref={headingRef}
            className="section-heading text-balance"
          >
            Work I&apos;ve shipped. <span className="text-gradient-cool">Interactive Canvas</span>
          </h2>
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="btn-primary text-xs flex items-center gap-2 self-start md:self-auto py-2.5 px-5 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            fontFamily: 'var(--font-display)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--fg)',
          }}
        >
          Reset Positions
        </button>
      </div>

      <div className="section-block py-8 animate-reveal">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => {
            const p = palettes[i % palettes.length]

            return (
              <article
                key={project.id}
                className="proj-h-card relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none aspect-square w-full max-w-[310px] mx-auto rounded-full"
                style={{
                  willChange: 'transform',
                }}
                onClick={(e) => handleCardClick(project, i, e)}
              >
                <div
                  className="proj-h-card-inner group relative flex flex-col items-center justify-center text-center overflow-hidden border p-5 sm:p-6 w-full h-full rounded-full"
                  style={{
                    background: p.bg,
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderTop: `2px solid ${p.accent}`,
                    willChange: 'transform',
                    '--card-accent': p.accent,
                    '--card-border': p.border,
                    '--card-dim': p.dim,
                  }}
                >
                  {/* Subtle Abstract Background Pattern */}
                  <svg className="absolute inset-0 h-full w-full opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.07] pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M0 10 H100 M0 30 H100 M0 50 H100 M0 70 H100 M0 90 H100 M10 0 V100 M30 0 V100 M50 0 V100 M70 0 V100 M90 0 V100" stroke="currentColor" strokeWidth="0.5" />
                  </svg>

                  {/* Accent Glow Circle */}
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none -translate-y-1/2 translate-x-1/2"
                    style={{ background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)` }} />

                  {/* Center Accent Glow Core (Chatak/Vibrant Center) */}
                  <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none filter blur-xl"
                    style={{ background: `radial-gradient(circle at center, ${p.accent} 0%, transparent 65%)` }} />

                  {/* Main Content (Centered for circular layout) */}
                  <div className="flex flex-col items-center gap-2 z-10 pointer-events-none mt-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white/40 transition-all duration-300 group-hover:scale-110 shadow-lg"
                      style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                      <ArrowUpRight size={16} style={{ color: p.accent }} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-white transition-colors duration-300 group-hover:text-[var(--p-accent)]"
                      style={{ fontFamily: 'var(--font-display)', '--p-accent': p.accent }}>
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-xs sm:text-[13px] leading-relaxed text-white/50 px-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Footer */}
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5 z-10 pointer-events-none mb-1">
                    {project.stack.slice(0, 2).map((t) => (
                      <span key={t} className="tech-badge rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest border"
                        style={{
                          fontFamily: 'var(--font-display)',
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}

        </div>
      </div>

      <ProjectModal
        project={activeProject}
        palettes={palettes}
        projectIndex={activeIndex}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}

export default ProjectsSection
