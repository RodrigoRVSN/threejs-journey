# Post Processing 

- Put the texture in a render target (or buffer) instead of the canvas in the screen and just putting in the canvas after the processing on buffer. Made with Effect Composer.
- Its better for performance, because we do a ping-pong passes in the memory buffer and pass all of them for the canvas.
- Avoid having a lot of passes.

# Performance
- Look the performance in the start of the project.

### General

- The page needs to be at least 60fps
- Have a good javascript code
- Dispose of things not used
```js
scene.remove()
cube.geometry.dispose()
cube.material.dispose()
```

### Lights

- Avoid Three.js lights, use baked lights or cheap lights (Ambient, Directional, Hemisphere)
- Avoid adding and removing lights, it will be recompiled

### Shadows

- Avoid shadows, use baked shadows
- Optimize shadow maps, see with a camera helper if the size, radius and etc is optimized. Use the smallest size possible
- Use castShadow and receiveShadow wisely
- Deactivate shadow auto update

### Textures

- Takes a lot from the GPU, try to reduce the resolution
- Use the right format and try to optimze the images

### Materials

- Use cheap materials

### Meshes

-  Use instancedMesh to make only a mesh and transform the matrix for each instance of that mesh.

### Models

- Use `draco` compression
- Use `gzip`, a compression in server side.

### Cameras
- Use near and far to not render unnecessary contents not being show

### Render
- Limit pixel ratio
- Use powerPrefenrece with `high-performance` option
- `Antialias` is performant, but no antialias is more performant :D

### Post processing
- Limit passes, try to merge them

### Shaders
- You can change the `precision` param
- Keep code simple, avoid `if's` (could use `clamp` instead) and try to use the `glsl` properties, like `mix` and etc
- Use defines
- Do the calculations in the vertex shader and send the results to the fragment shader