import { Float, Html, OrbitControls, PivotControls, Text, TransformControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience()
{
    const cube = useRef(null)
    const sphere = useRef(null)

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls anchor={[0,0,0]} depthTest={false}>
            <mesh ref={sphere} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html 
                    position={[1,1,0]}
                    wrapperClass="label"
                    center
                    distanceFactor={6}
                    occlude={[sphere, cube]}
                >
                    opa
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>


        <Float>
            <Text 
                font='./bangers-v20-latin-regular.woff'
                fontSize={1}
                color='salmon'
                position-y={2}
            >
                I love rust
                <meshNormalMaterial />
            </Text>
        </Float>

    </>
}