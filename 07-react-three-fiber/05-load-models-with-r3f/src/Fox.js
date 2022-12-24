import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export const Fox = () => {
  const fox = useGLTF('/Fox/glTF/Fox.gltf')
  const animations = useAnimations(fox.animations, fox.scene)

  useEffect(() => {
    const action = animations.actions.Walk
    action.reset().fadeIn(0.5).play()
    
    let timeout = window.setTimeout(() => {
      animations.actions.Run.play()
      animations.actions.Run.crossFadeFrom(animations.actions.Walk, 1)
    }, 2000)

    return () => {
      clearTimeout(timeout)
      action.fadeOut(0.5)
    }
  },[])

  return (
    <primitive 
      object={fox.scene}
      scale={0.02}
      position={[ -3, 0, 2 ]}
    />
  )
}