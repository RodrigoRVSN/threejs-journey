import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
const controls = new OrbitControls(camera, canvas) 
controls.enableDamping = true

/* const cursor = { x: 0, y: 0 }
document.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
}) */

camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const tick = () =>
{
    /* camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position) */
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()