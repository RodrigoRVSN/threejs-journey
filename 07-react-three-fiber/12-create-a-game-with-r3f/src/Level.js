import * as THREE from "three"
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text, useGLTF } from "@react-three/drei"
import { useMemo } from "react"

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

THREE.ColorManagement.legacyMode = false

const BlockStart = ({ position = [ 0, 0, 0 ] }) => {
  return (
      <group position={position}>
        <Float>
          <Text
            font='./bebas-neue-v9-latin-regular.woff'
            scale={4}
            textAlign='right'
            maxWidth={1}
            position={[ 0.75, 0.75, 0 ]}
          >
            RodrigoRVSN Race
          </Text>
        </Float>
        <mesh 
          geometry={boxGeometry} 
          material={floor1Material}
          position={[ 0, -0.1, 0 ]} 
          receiveShadow 
          scale={[ 4, 0.2, 4 ]}
        />
      </group>
  )
}

const BlockEnd = ({ position = [ 0, 0, 0 ] }) => {
  const hamburger = useGLTF('./hamburger.glb')

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true
  })

  return (
      <group position={position}>
        <mesh 
          geometry={boxGeometry} 
          material={floor1Material}
          receiveShadow 
          scale={[ 4, 0.2, 4 ]}
        />
        <RigidBody type='fixed' colliders='hull' position={[ 0, 0.25, 0 ]} restitution={0.2}>
          <primitive object={hamburger.scene} scale={0.2}/>
        </RigidBody>
      </group>
  )
}

const BlockSpinner = ({ position = [ 0, 0, 0 ] }) => {
  const obstacle = useRef(null)
  const speed = Math.random() < 0.5 ? -1 : 1

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
    obstacle.current.setNextKinematicRotation(rotation)
  })

  return (
      <group position={position}>
        <mesh 
          geometry={boxGeometry} 
          material={floor2Material}
          position={[ 0, -0.1, 0 ]} 
          receiveShadow 
          scale={[ 4, 0.2, 4 ]}
        />
        <RigidBody ref={obstacle} type='kinematicPosition' position={[ 0, 0.3, 0]} restitution={0.2} friction={0}>
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[ 3.5, 0.3, 0.3 ]}
            castShadow
          />
        </RigidBody>
      </group>
  )
}

const BlockLimbo = ({ position = [ 0, 0, 0 ] }) => {
  const obstacle = useRef(null)
  const timeOffset = Math.random() * Math.PI * 2

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const y = Math.sin(time + timeOffset) + 1.15
    obstacle.current.setNextKinematicTranslation({ x: 0, y, z: position[2] })
  })

  return (
      <group position={position}>
        <mesh 
          geometry={boxGeometry} 
          material={floor2Material}
          position={[ 0, -0.1, 0 ]} 
          receiveShadow 
          scale={[ 4, 0.2, 4 ]}
        />
        <RigidBody ref={obstacle} type='kinematicPosition' position={[ 0, 0.3, 0]} restitution={0.2} friction={0}>
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[ 3.5, 0.3, 0.3 ]}
            castShadow
          />
        </RigidBody>
      </group>
  )
}

const BlockAxe = ({ position = [ 0, 0, 0 ] }) => {
  const obstacle = useRef(null)
  const timeOffset = Math.random() * Math.PI * 2

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    const x = Math.sin(time + timeOffset)
    obstacle.current.setNextKinematicTranslation({ x: x + position[0], y: position[1] + 0.75, z: position[2] })
  })

  return (
      <group position={position}>
        <mesh 
          geometry={boxGeometry} 
          material={floor2Material}
          position={[ 0, -0.1, 0 ]} 
          receiveShadow 
          scale={[ 4, 0.2, 4 ]}
        />
        <RigidBody ref={obstacle} type='kinematicPosition' position={[ 0, 0.3, 0]} restitution={0.2} friction={0}>
          <mesh
            geometry={boxGeometry}
            material={obstacleMaterial}
            scale={[ 1.5, 1.5, 0.3 ]}
            castShadow
          />
        </RigidBody>
      </group>
  )
}

const Bounds = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type='fixed' restitution={0.2} friction={0}>
        <mesh 
          position={[ 2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[ 0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh 
          position={[ -2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[ 0.3, 1.5, 4 * length]}
          castShadow
        />
        <mesh 
          position={[ 0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[ 4, 1.5, 0.3 ]}
          castShadow
        />
        <CuboidCollider 
          args={[ 2, 0.1, 2 * length]} 
          position={[ 0, -0.1, -(length * 2) + 2]} 
          friction={1}
        />
      </RigidBody>
    </>
  )
}

export const Level = ({ count = 5, types = [ BlockSpinner, BlockAxe, BlockLimbo ], seed}) => {
  const blocks = useMemo(() => {
    const blocks = []
    
    for(let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      blocks.push(type)
    }

    return blocks
  }, [count, types, seed])

  return (
    <>
      <BlockStart />
      
      {blocks.map((Block, index) => (
        <Block key={index} position={[ 0, 0, - (index + 1) * 4 ]} />
      ))}

      <BlockEnd position={[ 0, 0, -(count + 1) * 4]} />
      
      <Bounds length={count + 2} />
    </>
  )
}