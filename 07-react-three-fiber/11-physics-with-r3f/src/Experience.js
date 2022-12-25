import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {  Debug, Physics, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'

export default function Experience()
{   
    const cubeRef = useRef(null)

    const cubePush = () => {
        cubeRef.current.applyImpulse({ x: 0, y: 0, z: Math.random() * 2 })
    
    }
    
    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={[ 0, -9.8, 0]}s>

            <Debug />
            <RigidBody ref={cubeRef} >
                <mesh onClick={cubePush} castShadow position={ [ 2, 2, 0 ] }>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>


            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
        </Physics>

    </>
}