import { useFrame } from '@react-three/fiber'
import { meshBounds, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const handlePointerEnter = () => {
        cube.current.material.color.set('red')
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 } onClick={event => event.stopPropagation()}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh 
            raycast={meshBounds}
            ref={ cube } 
            position-x={ 2 } 
            scale={ 1.5 } 
            onClick={handlePointerEnter}
            onPointerEnter={() => document.body.style.cursor = 'pointer' }
            onPointerLeave={() => document.body.style.cursor = 'default' }
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}