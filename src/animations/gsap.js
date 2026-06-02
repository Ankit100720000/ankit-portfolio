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

/* ─── Line-by-line Scroll Scrub Text Reveal ───────────── */
export function splitTextLinesReveal(element, trigger) {
  if (!element) return null
  if (element.getAttribute('data-split-text') === 'true') {
    return null
  }
  element.setAttribute('data-split-text', 'true')

  const originalHTML = element.innerHTML
  const originalText = element.innerText
  let lastWidth = window.innerWidth
  let killTimeline = null
  let isMounted = true

  const doSplit = () => {
    if (!isMounted) return

    if (killTimeline) {
      if (killTimeline.scrollTrigger) killTimeline.scrollTrigger.kill()
      killTimeline.kill()
      killTimeline = null
    }

    // Reset element to its original HTML state before walking tree
    element.innerHTML = originalHTML

    // Walk tree to wrap words while preserving parent classes/styles
    const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)
    const nodes = []
    let node
    while ((node = walk.nextNode())) nodes.push(node)

    nodes.forEach(n => {
      if (!n.nodeValue.trim()) return
      const parent = n.parentNode
      const isRoot = parent === element
      const parentClass = !isRoot && parent.className ? parent.className : ''
      const parentStyle = !isRoot && parent.getAttribute('style') ? parent.getAttribute('style') : ''
      
      const words = n.nodeValue.split(/(\s+)/)
      const frag = document.createDocumentFragment()
      
      words.forEach(w => {
        if (w.trim()) {
          const span = document.createElement('span')
          span.className = `temp-word ${parentClass}`.trim()
          span.setAttribute('style', `display: inline-block; ${parentStyle}`)
          span.textContent = w
          frag.appendChild(span)
        } else {
          frag.appendChild(document.createTextNode(w))
        }
      })
      parent.replaceChild(frag, n)
    })

    // Wait a frame for browser to render spans and calculate offsets
    requestAnimationFrame(() => {
      if (!isMounted) return
      const wordSpans = element.querySelectorAll('.temp-word')
      if (!wordSpans.length) return

      // Group words into lines by offsetTop
      const linesMap = new Map()
      wordSpans.forEach(span => {
        const top = span.offsetTop
        if (!linesMap.has(top)) {
          linesMap.set(top, [])
        }
        linesMap.get(top).push(span.outerHTML)
      })

      // Re-build html: wrap each line in a container with overflow hidden (mask)
      const linesHTML = Array.from(linesMap.values()).map(lineWords => {
        const lineText = lineWords.join(' ')
        return `<div class="line-wrap" style="overflow: hidden; display: block; padding-bottom: 0.15em; margin-bottom: -0.15em;"><div class="line-inner" style="display: block; will-change: transform; white-space: nowrap;">${lineText}</div></div>`
      }).join('\n')

      element.innerHTML = linesHTML

      const lineInners = element.querySelectorAll('.line-inner')
      
      // Initialize state
      gsap.set(lineInners, { yPercent: 120 })

      // Create scroll-scrub timeline
      killTimeline = gsap.to(lineInners, {
        yPercent: 0,
        stagger: 0.1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: trigger || element,
          scrub: 1,
          start: "top 85%",
          end: "top 55%",
          invalidateOnRefresh: true,
        }
      })

      ScrollTrigger.refresh()
    })
  }

  // Run splitting after fonts load or instantly if already loaded
  if (document.fonts) {
    document.fonts.ready.then(() => {
      if (isMounted) doSplit()
    })
  } else {
    doSplit()
  }

  const handleResize = () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth
      doSplit()
    }
  }

  window.addEventListener('resize', handleResize)

  // Return clean-up function
  return () => {
    isMounted = false
    window.removeEventListener('resize', handleResize)
    if (killTimeline) {
      if (killTimeline.scrollTrigger) killTimeline.scrollTrigger.kill()
      killTimeline.kill()
    }
    element.removeAttribute('data-split-text')
    element.innerHTML = originalHTML
  }
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
