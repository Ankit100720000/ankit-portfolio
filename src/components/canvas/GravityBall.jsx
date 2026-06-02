import { useEffect, useRef, useCallback } from 'react'

/**
 * GravityBall — A glowing orb with real gravity physics.
 * Users can drag and fling it; it bounces off walls/floor with damping.
 * Pure JS physics loop — no heavy deps required.
 */
export default function GravityBall({ containerRef }) {
  const ballRef = useRef(null)
  const stateRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    lastMouseTime: 0,
    animId: null,
  })

  const BALL_SIZE = 56
  const GRAVITY = 0.45
  const BOUNCE = 0.65
  const FRICTION = 0.992
  const AIR_RESISTANCE = 0.998
  const MIN_VELOCITY = 0.15

  const getBounds = useCallback(() => {
    if (!containerRef?.current) return { width: 800, height: 600 }
    const rect = containerRef.current.getBoundingClientRect()
    return { width: rect.width, height: rect.height }
  }, [containerRef])

  // Initialize ball position
  useEffect(() => {
    const bounds = getBounds()
    stateRef.current.x = bounds.width * 0.7
    stateRef.current.y = bounds.height * 0.3
  }, [getBounds])

  // Physics loop
  useEffect(() => {
    const ball = ballRef.current
    if (!ball) return

    let running = true

    const tick = () => {
      if (!running) return
      const s = stateRef.current
      const bounds = getBounds()
      const maxX = bounds.width - BALL_SIZE
      const maxY = bounds.height - BALL_SIZE

      if (!s.isDragging) {
        // Apply gravity
        s.vy += GRAVITY

        // Apply air resistance
        s.vx *= AIR_RESISTANCE
        s.vy *= AIR_RESISTANCE

        // Update position
        s.x += s.vx
        s.y += s.vy

        // Floor bounce
        if (s.y > maxY) {
          s.y = maxY
          s.vy = -Math.abs(s.vy) * BOUNCE
          s.vx *= FRICTION
          // Stop tiny bounces
          if (Math.abs(s.vy) < MIN_VELOCITY) s.vy = 0
        }

        // Ceiling bounce
        if (s.y < 0) {
          s.y = 0
          s.vy = Math.abs(s.vy) * BOUNCE
        }

        // Left wall bounce
        if (s.x < 0) {
          s.x = 0
          s.vx = Math.abs(s.vx) * BOUNCE
        }

        // Right wall bounce
        if (s.x > maxX) {
          s.x = maxX
          s.vx = -Math.abs(s.vx) * BOUNCE
        }

        // Kill very small velocities
        if (Math.abs(s.vx) < MIN_VELOCITY) s.vx = 0
      }

      // Render
      ball.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`

      // Dynamic glow intensity based on velocity
      const speed = Math.hypot(s.vx, s.vy)
      const glowIntensity = Math.min(speed / 15, 1)
      const trailOpacity = 0.15 + glowIntensity * 0.4
      ball.style.setProperty('--ball-glow', `${trailOpacity}`)
      ball.style.setProperty('--ball-scale', `${1 + glowIntensity * 0.15}`)

      s.animId = requestAnimationFrame(tick)
    }

    const s = stateRef.current
    s.animId = requestAnimationFrame(tick)

    return () => {
      running = false
      if (s.animId) cancelAnimationFrame(s.animId)
    }
  }, [getBounds])

  // Drag handlers
  useEffect(() => {
    const ball = ballRef.current
    const container = containerRef?.current
    if (!ball || !container) return

    const handlePointerDown = (e) => {
      e.preventDefault()
      const s = stateRef.current
      s.isDragging = true
      s.vx = 0
      s.vy = 0

      const containerRect = container.getBoundingClientRect()
      s.dragStartX = e.clientX - containerRect.left - s.x
      s.dragStartY = e.clientY - containerRect.top - s.y
      s.lastMouseX = e.clientX
      s.lastMouseY = e.clientY
      s.lastMouseTime = performance.now()

      ball.style.cursor = 'grabbing'
      ball.classList.add('gravity-ball--dragging')
      ball.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e) => {
      const s = stateRef.current
      if (!s.isDragging) return

      const containerRect = container.getBoundingClientRect()
      const bounds = getBounds()

      s.x = Math.max(0, Math.min(bounds.width - BALL_SIZE,
        e.clientX - containerRect.left - s.dragStartX))
      s.y = Math.max(0, Math.min(bounds.height - BALL_SIZE,
        e.clientY - containerRect.top - s.dragStartY))

      // Track velocity for fling
      const now = performance.now()
      const dt = now - s.lastMouseTime
      if (dt > 0) {
        const dampening = 0.6
        s.vx = ((e.clientX - s.lastMouseX) / dt) * 16 * dampening
        s.vy = ((e.clientY - s.lastMouseY) / dt) * 16 * dampening
      }
      s.lastMouseX = e.clientX
      s.lastMouseY = e.clientY
      s.lastMouseTime = now
    }

    const handlePointerUp = (e) => {
      const s = stateRef.current
      if (!s.isDragging) return
      s.isDragging = false

      // Clamp fling velocity
      const maxFling = 22
      s.vx = Math.max(-maxFling, Math.min(maxFling, s.vx))
      s.vy = Math.max(-maxFling, Math.min(maxFling, s.vy))

      ball.style.cursor = 'grab'
      ball.classList.remove('gravity-ball--dragging')
      ball.releasePointerCapture(e.pointerId)
    }

    ball.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      ball.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [containerRef, getBounds])

  return (
    <div
      ref={ballRef}
      className="gravity-ball"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${BALL_SIZE}px`,
        height: `${BALL_SIZE}px`,
        zIndex: 15,
        cursor: 'grab',
        touchAction: 'none',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Core orb */}
      <div className="gravity-ball__core" />
      {/* Outer glow ring */}
      <div className="gravity-ball__ring" />
      {/* Trail/shadow */}
      <div className="gravity-ball__trail" />
    </div>
  )
}
