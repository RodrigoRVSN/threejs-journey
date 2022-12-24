import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import { ACESFilmicToneMapping, LinearEncoding } from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas 
        flat
        gl={{
            antialias: true,
            toneMapping: ACESFilmicToneMapping,
            outputEncoding: LinearEncoding
        }}
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]
        }}
    >
        <Experience />
    </Canvas>
)