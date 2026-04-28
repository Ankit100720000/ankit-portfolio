import { memo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'

function FloatingOrb({ reducedMotion }) {
  const orbRef = useRef(null)
  const ringRef = useRef(null)

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
  return (
    <div className="h-full w-full overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#08090c] shadow-[0_28px_90px_rgba(2,8,20,0.4)]">
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

        <FloatingOrb reducedMotion={reducedMotion} />

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
