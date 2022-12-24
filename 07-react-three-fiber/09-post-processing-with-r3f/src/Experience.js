import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Bloom, DepthOfField, EffectComposer, Glitch, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Drunk } from './Drunk'
import { useRef } from 'react'

export default function Experience()
{
    const drunkRef = useRef(null)

    return <>

        <Perf position="top-left" />

        <color args={[ '#201919']} attach='background' />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color={'cyan'} /* emissive='cyan' toneMapped={false} emissiveIntensity={2} */ />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <EffectComposer>
            {/* <Vignette blendFunction={BlendFunction.NORMAL} darkness={0.9} /> */}
            {/* <Glitch /> */}
            {/* <Bloom mipmapBlur /> */}
            {/* <DepthOfField /> */}
            <Drunk 
                drunkRef={drunkRef}
                frequency={2}
                amplitude={0.1}
                blendFunction={BlendFunction.DARKEN}
            />
        </EffectComposer>


    </>
}