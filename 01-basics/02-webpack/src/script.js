import './style.css'
import * as THREE from 'three'

// scene
const scene = new THREE.Scene()

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// sizes
const sizes = {
  width: 700,
  height: 500
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
