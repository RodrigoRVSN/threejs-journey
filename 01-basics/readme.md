# Mesh

- It's a combination of a **geometry** (shape) and a **material** (how looks).

```js
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

# Transform

### There are 4 properties to transform objects
- `Position:` X, Y and Z axis
- Scale
- Rotation
- Quarternion

> Those properties will be compiled in matrices.

# Geometries

### Made by vertices. Can be mesh's and particles.

# Textures

### Where to find: 

- https://www.poliigon.com
- https://www.3dtextures.me
- https://www.arroway-textures.ch

# Materials

### Use a CubMap Hdri to make a envMap material reflection effect.

- https://polyhaven.com
- https://matheowis.github.io/HDRI-to-CubeMap/ -> Convert HDRI images to a Cube Map