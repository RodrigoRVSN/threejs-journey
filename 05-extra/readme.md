# Post Processing 

- Put the texture in a render target (or buffer) instead of the canvas in the screen and just putting in the canvas after the processing on buffer. Made with Effect Composer.
- Its better for performance, because we do a ping-pong passes in the memory buffer and pass all of them for the canvas.
- Avoid having a lot of passes.