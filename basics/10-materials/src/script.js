import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

const gui = new lil.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const light = new THREE.PointLight(0xffffff, 0.9)
light.position.x = 2
light.position.y = 2
light.position.z = 4
scene.add(light)

/* Textures */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/one-piece/px.png',
    '/textures/environmentMaps/one-piece/nx.png',
    '/textures/environmentMaps/one-piece/py.png',
    '/textures/environmentMaps/one-piece/nx.png',
    '/textures/environmentMaps/one-piece/pz.png',
    '/textures/environmentMaps/one-piece/nz.png',
])

/* const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const ambientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/4.png') */

/* const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
material.color.set('red')
material.transparent = true
 */
// const material = new THREE.MeshMatcapMaterial({ map: matcapTexture })

/* const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.6
material.map = doorColorTexture
material.aoMap = ambientOcclusion
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05 */

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.6
material.envMap = environmentMapTexture


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 15),
    material
)
sphere.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

plane.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = -1.5

scene.add(torus, plane, sphere)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.01 * elapsedTime
    torus.rotation.x = 0.01 * elapsedTime
    plane.rotation.x = 0.01 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()