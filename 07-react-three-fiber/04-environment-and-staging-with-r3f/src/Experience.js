import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, ContactShadows, Environment, Float, Lightformer, OrbitControls, RandomizedLight, Sky, softShadows, Stage, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

/* softShadows({
    frustum: 3.75,
    size: 0.005,
    near: 9.5,
    samples: 17,
    rings: 11,
}) */

export default function Experience()
{
    const cube = useRef()
    const directionalLight = useRef(null)
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 1, min: 0, max: 12 }
    })

    return <>
        <Perf position="top-left" />

        <OrbitControls makeDefault />
{/* 
        <AccumulativeShadows 
            position={[ 0, -0.99, 0 ]} 
            scale={10}
        >
            <RandomizedLight 
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={1}
                bias={0.001}
                position={[ 1, 2, 3 ]}
            />
        </AccumulativeShadows>

        <ContactShadows
            scale={10}
            far={5}
            resolution={512}
        /> */}

        {/* <directionalLight 
            castShadow 
            ref={directionalLight} 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            shadow-mapSize={[ 1024, 1024 ]}    
        />
        <ambientLight intensity={ 0.5 } />

        <Sky
        /> */}

        {/* <Environment 
            background
            files='./environmentMaps/the_sky_is_on_fire_2k.hdr'
        /> */}

        {/* <Environment 
            preset='sunset'
            ground={{
                heigth: 7,
                radius: 28,
                scale: 100
            }}
        > */}
            {/* <Lightformer 
                position-z={-5}
                scale={10}
                color='red'
                intensity={10}
                form='ring'
            /> */}
        {/* </Environment> */}

        <Stage
            contactShadow={{ opacity: 0.2, blur: 3 }}
            envrionment='sunset'
        >
            <mesh castShadow position-x={ - 2 } position-y={1} envMapIntensity={envMapIntensity}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh castShadow ref={ cube } position-y={1} position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </Stage>

        {/* <mesh receiveShadow position-y={0} rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}

    </>
}