import { useGLTF, Environment, Float, PresentationControls, ContactShadows, Html, Text } from '@react-three/drei'

export default function Experience()
{
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>
        <Environment preset='apartment' />

        <color args={[ '#695b5b' ]} attach='background' /> 
    
        <PresentationControls 
            global
            rotation={[0.1, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4}>
                <rectAreaLight 
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#ff6900'}
                    rotation={[ -0.1, Math.PI, 0 ]}
                    position={[0, 0.55, -1.15]}
                />
                <primitive 
                    position-y={-1.2}
                    object={computer.scene}
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={1.17}
                        position={[ 0, 1.56, -1.4 ]}
                        rotation-x={-0.256}
                    >
                        <iframe src='https://bruno-simon.com/html/' />
                    </Html>
                    <Text
                        font='./bangers-v20-latin-regular.woff'
                        fontSize={1}
                        position={[2, 1.75, 0.75]}
                        rotation-y={-1.25 }
                        maxWidth={2}
                        textAlign='center'
                    >
                        Rodrigo Victor
                    </Text>
                </primitive>
            </Float>
        </PresentationControls>

        <ContactShadows 
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />
    </>
}
