import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/* ─── Section reveal (data-reveal items) ─────────────── */
export function createSectionReveal(scope, start = 'top 78%') {
  const items = scope.querySelectorAll('[data-reveal]')
  if (!items.length) return null

  gsap.set(items, { willChange: 'transform, opacity' })

  return gsap.fromTo(
    items,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.95,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'willChange',
      scrollTrigger: { trigger: scope, start },
    },
  )
}

/* ─── Hero entrance (yPercent clip reveal) ─────────────── */
export function createHeroTextReveal(items) {
  if (!items.length) return null
  return gsap.fromTo(
    items,
    { yPercent: 110, opacity: 0, rotate: 3 },
    { yPercent: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' },
  )
}

/* ─── Word split text reveal ─────────────────────────── */
export function splitWordReveal(element, trigger, delay = 0) {
  if (!element) return null
  const original = element.innerText
  const words = original.split(' ')

  element.innerHTML = words
    .map(w => `<span class="gsap-word-wrap"><span class="gsap-word">${w}</span></span>`)
    .join(' ')

  const wordEls = element.querySelectorAll('.gsap-word')
  gsap.set(wordEls, { yPercent: 120, opacity: 0 })

  return gsap.to(wordEls, {
    yPercent: 0,
    opacity: 1,
    duration: 0.75,
    stagger: 0.06,
    ease: 'power3.out',
    delay,
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 85%',
      once: true,
    },
  })
}

/* ─── Char split text reveal ─────────────────────────── */
export function splitCharReveal(element, trigger, delay = 0) {
  if (!element) return null
  const original = element.innerText
  const chars = [...original]

  element.innerHTML = chars
    .map(ch => ch === ' '
      ? '&nbsp;'
      : `<span class="gsap-char" style="display:inline-block">${ch}</span>`)
    .join('')

  const charEls = element.querySelectorAll('.gsap-char')
  gsap.set(charEls, { y: '105%', opacity: 0, rotate: 8, transformOrigin: 'bottom center' })

  return gsap.to(charEls, {
    y: '0%',
    opacity: 1,
    rotate: 0,
    duration: 0.55,
    stagger: 0.022,
    ease: 'back.out(1.4)',
    delay,
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top 88%',
      once: true,
    },
  })
}

/* ─── Animated counter ───────────────────────────────── */
export function animateCounter(element, target, suffix = '', duration = 1.6) {
  if (!element) return null
  const isFloat = String(target).includes('.')
  const obj = { val: 0 }

  return gsap.to(obj, {
    val: parseFloat(target),
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = isFloat
        ? obj.val.toFixed(1) + suffix
        : Math.round(obj.val) + suffix
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
  })
}

/* ─── SVG stroke draw-in ─────────────────────────────── */
export function drawSvgPath(path, trigger, delay = 0) {
  if (!path) return null
  const length = path.getTotalLength?.() ?? 500

  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  })

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.8,
    ease: 'power2.inOut',
    delay,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      once: true,
    },
  })
}

/* ─── Parallax scroll ────────────────────────────────── */
export function createParallax(element, yDistance = 60) {
  if (!element) return null
  return gsap.to(element, {
    y: yDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
}

/* ─── Magnetic hover helper ──────────────────────────── */
export function addMagneticHover(el, strength = 0.35) {
  if (!el) return
  const rect = () => el.getBoundingClientRect()

  const onMove = (e) => {
    const r = rect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

/* ─── Staggered grid entry ───────────────────────────── */
export function staggerGridReveal(items, trigger, from = 'bottom') {
  if (!items.length) return null
  const fromVars = {
    bottom: { y: 40, opacity: 0, scale: 0.96 },
    left:   { x: -40, opacity: 0 },
    right:  { x: 40, opacity: 0 },
    fade:   { opacity: 0, scale: 0.94 },
  }[from] ?? { y: 40, opacity: 0 }

  gsap.set(items, fromVars)

  return gsap.to(items, {
    ...Object.fromEntries(Object.keys(fromVars).map(k => [k, k === 'opacity' ? 1 : k === 'scale' ? 1 : 0])),
    opacity: 1,
    scale: 1,
    duration: 0.65,
    stagger: { each: 0.08, from: 'start' },
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start: 'top 88%',
      once: true,
    },
  })
}
