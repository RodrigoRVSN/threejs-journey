import { useGLTF } from '@react-three/drei'

export const Model = () => {
  const model = useGLTF('./hamburger-draco.glb')

  return (
    <primitive object={model.scene} scale={0.35} />
  )
}

useGLTF.preload('./hamburguer-draco.glb')