import { memo, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function WireSphere({ reducedMotion }) {
  const meshRef = useRef(null)
  const innerRef = useRef(null)
  const ringRef = useRef(null)

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.getElapsedTime()

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.12
      innerRef.current.rotation.x += delta * 0.04
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={meshRef} scale={2.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#d6ff3a"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Inner softly glowing solid sphere */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={innerRef} scale={1.4}>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial
            color="#7cf2ff"
            emissive="#1a2a3a"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.25}
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      {/* Thin orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]} scale={3.2}>
        <torusGeometry args={[1, 0.004, 16, 200]} />
        <meshBasicMaterial color="#b08bff" transparent opacity={0.35} />
      </mesh>

      {/* Second ring opposite axis */}
      <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]} scale={3.6}>
        <torusGeometry args={[1, 0.003, 16, 200]} />
        <meshBasicMaterial color="#7cf2ff" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

function ParticleField({ reducedMotion }) {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const count = 600
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (reducedMotion) return
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02
      pointsRef.current.rotation.x += delta * 0.005
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
        size={0.025}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

const Background3D = memo(function Background3D({ reducedMotion = false }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 4, 6]} intensity={1.2} color="#d6ff3a" />
        <pointLight position={[-6, -4, -2]} intensity={0.8} color="#7cf2ff" />
        <pointLight position={[0, 5, -6]} intensity={0.6} color="#b08bff" />

        <WireSphere reducedMotion={reducedMotion} />
        <ParticleField reducedMotion={reducedMotion} />

        <Sparkles
          count={reducedMotion ? 40 : 120}
          scale={14}
          size={1.4}
          speed={0.25}
          opacity={0.5}
          color="#d6ff3a"
        />
      </Canvas>
    </div>
  )
})

export default Background3D
