import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CustomObject } from "./CustomObject"

extend({ OrbitControls })

export const Experience = () => {
  const cubeRef = useRef(null)
  const groupRef = useRef(null)
  
  const { camera, gl } = useThree()

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
    // groupRef.current.rotation.y += delta

    /* const angle = state.clock.elapsedTime
    state.camera.position.x = Math.sin(angle) * 8
    state.camera.position.z = Math.sin(angle) * 8
    state.camera.lookAt(0, 0, 0) */
  })
  

  return (
    <>
      <orbitControls args={[ camera, gl.domElement ]} />

      <directionalLight position={[ 2, 2, 3 ]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      
      <group ref={groupRef}>
        <mesh position-x={-2}>
            <sphereGeometry />
            <meshStandardMaterial color='orange'/>
        </mesh>

        <mesh ref={cubeRef} position-x={3} scale={1.5}>
            <boxGeometry scale={1.5} />
            <meshBasicMaterial color="#ff0000" />
        </mesh>
      </group>
    
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
          <planeGeometry />
          <meshStandardMaterial color='greenyellow'/>
      </mesh>

      <CustomObject />
    </>
  )
}