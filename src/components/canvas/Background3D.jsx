import { memo, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '@/animations/gsap'

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createParticlePositions(count = 900) {
  const rand = mulberry32(0x1d2c3b4a)
  const arr = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const r = 7 + rand() * 9
    const theta = rand() * Math.PI * 2
    const phi = Math.acos(2 * rand() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }

  return arr
}

const PARTICLE_POSITIONS = createParticlePositions()

/* ─── Big iridescent center blob ─────────────────── */
function CenterBlob({ reducedMotion, matRef }) {
  const meshRef = useRef(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.25
      const s = 1 + Math.sin(t * 0.4) * 0.04
      meshRef.current.scale.setScalar(2.4 * s)
    }
  })

  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#7cf2ff"
          emissive="#0a2540"
          emissiveIntensity={0.5}
          roughness={0.12}
          metalness={0.85}
          distort={0.42}
          speed={1.6}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  )
}

/* ─── Floating accent shapes ─────────────────────── */
function FloatingShape({
  geometry,
  position,
  scale = 1,
  color = '#d6ff3a',
  speed = 1,
  rotationIntensity = 0.6,
  floatIntensity = 1.2,
  reducedMotion,
}) {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    if (reducedMotion) return
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.18 * speed
      meshRef.current.rotation.y += delta * 0.22 * speed
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      position={position}
    >
      <mesh ref={meshRef} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
    </Float>
  )
}

/* ─── Glassy refractive sphere ───────────────────── */
function GlassBubble({ position, scale, reducedMotion }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (reducedMotion) return
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1.5} position={position}>
      <mesh ref={ref} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.05}
          ior={1.4}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.35}
          distortionScale={0.4}
          temporalDistortion={0.15}
          color="#ffffff"
          backside
          backsideThickness={0.4}
        />
      </mesh>
    </Float>
  )
}

/* ─── Spherical particle cloud ───────────────────── */
function ParticleCloud({ reducedMotion }) {
  const pointsRef = useRef(null)
  const positions = PARTICLE_POSITIONS

  useFrame((_, delta) => {
    if (reducedMotion) return
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.018
      pointsRef.current.rotation.x += delta * 0.006
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Mouse / scroll parallax for the whole rig ──── */
function ParallaxRig({ children, reducedMotion }) {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    if (reducedMotion) return

    const px = state.pointer.x * 0.4
    const py = state.pointer.y * 0.25
    const scroll = (typeof window !== 'undefined' ? window.scrollY : 0) * 0.0008

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      px,
      3.2,
      delta,
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -py + scroll * 0.3,
      3.2,
      delta,
    )

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      px * 0.9,
      2.2,
      delta,
    )
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      -scroll * 0.6 + -py * 0.55,
      2.2,
      delta,
    )
  })

  return <group ref={groupRef}>{children}</group>
}

const Background3D = memo(function Background3D({ reducedMotion = false }) {
  const centerMatRef = useRef(null)
  const dirLightRef = useRef(null)
  const coolLightRef = useRef(null)
  const limeLightRef = useRef(null)
  const violetLightRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) {
      return undefined
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    const palettes = [
      {
        id: 'home',
        colors: {
          cool: '#7cf2ff',
          lime: '#d6ff3a',
          violet: '#b08bff',
          blob: '#7cf2ff',
        },
      },
      {
        id: 'projects',
        colors: {
          cool: '#7cf2ff',
          lime: '#d6ff3a',
          violet: '#ffffff',
          blob: '#d6ff3a',
        },
      },
      {
        id: 'about',
        colors: {
          cool: '#b08bff',
          lime: '#7cf2ff',
          violet: '#d6ff3a',
          blob: '#b08bff',
        },
      },
      {
        id: 'experience',
        colors: {
          cool: '#ffffff',
          lime: '#d6ff3a',
          violet: '#7cf2ff',
          blob: '#7cf2ff',
        },
      },
      {
        id: 'contact',
        colors: {
          cool: '#7cf2ff',
          lime: '#ffffff',
          violet: '#b08bff',
          blob: '#b08bff',
        },
      },
    ]

    const toRGB = (hex) => {
      const c = new THREE.Color(hex)
      return { r: c.r, g: c.g, b: c.b }
    }

    const applyPalette = (colors) => {
      if (coolLightRef.current) {
        gsap.to(coolLightRef.current.color, {
          ...toRGB(colors.cool),
          duration: 0.85,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      if (limeLightRef.current) {
        gsap.to(limeLightRef.current.color, {
          ...toRGB(colors.lime),
          duration: 0.85,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      if (violetLightRef.current) {
        gsap.to(violetLightRef.current.color, {
          ...toRGB(colors.violet),
          duration: 0.85,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      if (dirLightRef.current) {
        gsap.to(dirLightRef.current.color, {
          ...toRGB('#ffffff'),
          duration: 0.85,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      if (centerMatRef.current) {
        gsap.to(centerMatRef.current.color, {
          ...toRGB(colors.blob),
          duration: 0.9,
          ease: 'power3.out',
          overwrite: true,
        })
      }
    }

    const triggers = palettes
      .map(({ id, colors }) => {
        const el = document.getElementById(id)
        if (!el) return null

        return ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => applyPalette(colors),
          onEnterBack: () => applyPalette(colors),
        })
      })
      .filter(Boolean)

    if (palettes[0]) {
      applyPalette(palettes[0].colors)
    }

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [reducedMotion])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <directionalLight
          ref={dirLightRef}
          position={[6, 6, 6]}
          intensity={1.4}
          color="#ffffff"
        />
        <pointLight
          ref={coolLightRef}
          position={[-7, -3, -4]}
          intensity={1.1}
          color="#7cf2ff"
        />
        <pointLight
          ref={limeLightRef}
          position={[7, 3, -3]}
          intensity={1.0}
          color="#d6ff3a"
        />
        <pointLight
          ref={violetLightRef}
          position={[0, 6, -6]}
          intensity={0.8}
          color="#b08bff"
        />

        {/* HDRI for refractions / metallic reflections */}
        <Environment preset="night" />

        <ParallaxRig reducedMotion={reducedMotion}>
          <CenterBlob reducedMotion={reducedMotion} matRef={centerMatRef} />

          {/* Glass refractive bubble */}
          <GlassBubble
            position={[3.4, 1.2, -1.5]}
            scale={0.9}
            reducedMotion={reducedMotion}
          />

          {/* Floating accent shapes scattered around */}
          <FloatingShape
            geometry={<torusKnotGeometry args={[0.6, 0.18, 128, 16]} />}
            position={[-3.6, 1.5, -2]}
            scale={0.7}
            color="#d6ff3a"
            speed={0.9}
            reducedMotion={reducedMotion}
          />
          <FloatingShape
            geometry={<octahedronGeometry args={[1, 0]} />}
            position={[-3, -2, 2]}
            scale={0.55}
            color="#b08bff"
            speed={1.4}
            reducedMotion={reducedMotion}
          />
          <FloatingShape
            geometry={<dodecahedronGeometry args={[1, 0]} />}
            position={[3.2, -1.8, 1.5]}
            scale={0.6}
            color="#7cf2ff"
            speed={1.1}
            reducedMotion={reducedMotion}
          />
          <FloatingShape
            geometry={<icosahedronGeometry args={[1, 0]} />}
            position={[4.5, -0.5, -3]}
            scale={0.5}
            color="#ffffff"
            speed={0.7}
            reducedMotion={reducedMotion}
          />
          <FloatingShape
            geometry={<torusGeometry args={[0.7, 0.15, 16, 64]} />}
            position={[-4.8, -0.6, -2.5]}
            scale={0.6}
            color="#d6ff3a"
            speed={1.2}
            reducedMotion={reducedMotion}
          />

          <ParticleCloud reducedMotion={reducedMotion} />

          <Sparkles
            count={reducedMotion ? 50 : 160}
            scale={16}
            size={1.6}
            speed={0.3}
            opacity={0.55}
            color="#d6ff3a"
          />
          <Sparkles
            count={reducedMotion ? 30 : 80}
            scale={12}
            size={1.2}
            speed={0.2}
            opacity={0.45}
            color="#7cf2ff"
          />
        </ParallaxRig>
      </Canvas>
    </div>
  )
})

export default Background3D
