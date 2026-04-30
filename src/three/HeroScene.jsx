import { memo, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/animations/gsap'

function CameraRig({ reducedMotion, controls }) {
  useFrame((state, delta) => {
    if (reducedMotion) return
    if (!controls) return

    const px = state.pointer.x * 0.35
    const py = state.pointer.y * 0.22

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      controls.camZ,
      4,
      delta,
    )
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      px,
      4,
      delta,
    )
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      py,
      4,
      delta,
    )

    state.camera.lookAt(0, 0, 0)
  })

  return null
}

function HeroRig({ children, reducedMotion, controls }) {
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    if (reducedMotion) return
    if (!controls) return

    const px = state.pointer.x * 0.35
    const py = state.pointer.y * 0.22

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      controls.rotY + px,
      4,
      delta,
    )
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      controls.rotX - py,
      4,
      delta,
    )
  })

  return <group ref={groupRef}>{children}</group>
}

function FloatingOrb({ reducedMotion, materialRef }) {
  const orbRef = useRef(null)
  const ringRef = useRef(null)
  const ringMatRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    if (!orbRef.current || !ringMatRef.current || !materialRef?.current) {
      return undefined
    }

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.fromTo(
      orbRef.current.scale,
      { x: 0.9, y: 0.9, z: 0.9 },
      { x: 1.45, y: 1.45, z: 1.45, duration: 1.2 },
    )
      .fromTo(
        ringMatRef.current,
        { opacity: 0 },
        { opacity: 0.42, duration: 0.9 },
        0.1,
      )
      .fromTo(
        materialRef.current,
        { distort: 0.18, emissiveIntensity: 0.45 },
        { distort: 0.42, emissiveIntensity: 0.85, duration: 1.2 },
        0,
      )

    return () => tl.kill()
  }, [materialRef, reducedMotion])

  useFrame((state, delta) => {
    if (reducedMotion) {
      return
    }

    const t = state.clock.getElapsedTime()

    if (orbRef.current) {
      orbRef.current.rotation.x = Math.cos(t / 4) / 9
      orbRef.current.rotation.y = Math.sin(t / 2.2) / 8
      orbRef.current.position.y = Math.sin(t / 1.7) * 0.12
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12
      ringRef.current.rotation.x += delta * 0.08
    }
  })

  return (
    <group>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh ref={orbRef} scale={1.45}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            ref={materialRef}
            color="#7dd3fc"
            emissive="#0ea5e9"
            emissiveIntensity={0.85}
            distort={0.42}
            speed={2}
            roughness={0.08}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={2.2}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          ref={ringMatRef}
          color="#fde68a"
          emissive="#fde68a"
          emissiveIntensity={0.65}
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]} scale={2.55}>
        <torusGeometry args={[1, 0.006, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.45}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  )
}

const HeroScene = memo(function HeroScene({ reducedMotion }) {
  const wrapperRef = useRef(null)
  const orbMatRef = useRef(null)
  const controls = useMemo(() => ({ rotX: 0, rotY: 0, camZ: 5.5 }), [])

  useEffect(() => {
    if (reducedMotion) return undefined
    if (!wrapperRef.current) return undefined

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: true,
      },
    })

    tl.to(
      controls,
      {
        rotY: Math.PI * 0.18,
        rotX: -0.12,
        camZ: 4.85,
        ease: 'none',
      },
      0,
    )

    if (orbMatRef.current) {
      tl.to(
        orbMatRef.current,
        { distort: 0.58, emissiveIntensity: 1.05, ease: 'none' },
        0,
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [controls, reducedMotion])

  return (
    <div
      ref={wrapperRef}
      className="h-full w-full overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#08090c] shadow-[0_28px_90px_rgba(2,8,20,0.4)]"
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 8]}
          angle={0.18}
          penumbra={1}
          intensity={1.1}
          color="#7dd3fc"
        />
        <pointLight position={[-8, -6, -8]} intensity={0.6} color="#fde68a" />

        <CameraRig reducedMotion={reducedMotion} controls={controls} />

        <HeroRig reducedMotion={reducedMotion} controls={controls}>
          <FloatingOrb reducedMotion={reducedMotion} materialRef={orbMatRef} />
        </HeroRig>

        <Sparkles
          count={reducedMotion ? 30 : 90}
          scale={7}
          size={2.4}
          speed={0.45}
          opacity={0.55}
          color="#dbeafe"
        />

        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.45}
          scale={10}
          blur={3}
          far={4.5}
        />
      </Canvas>
    </div>
  )
})

export default HeroScene
