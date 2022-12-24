import { shaderMaterial ,Center, OrbitControls, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex'
import portalFragmentShader from './shaders/portal/fragment'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial({
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    }, 
    portalVertexShader, 
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
    const portalMaterial = useRef(null)

    const { nodes } = useGLTF('./model/portal.glb')
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>

        <OrbitControls makeDefault />

        <color args={[ '#201919' ]} attach='background' />
        
        <Center>
            <mesh geometry={nodes.baked.geometry} >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>

            <mesh 
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh 
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>


            <mesh 
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={6}
                scale={[ 4, 2, 4 ]}
                position-y={1}
                speed={0.4}
                count={40}
            />
        </Center>
    </>
}