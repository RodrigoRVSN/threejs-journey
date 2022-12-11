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