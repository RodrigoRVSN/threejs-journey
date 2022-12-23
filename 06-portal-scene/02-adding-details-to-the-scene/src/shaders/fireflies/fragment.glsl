void main() {
  float distanceToCenter = 0.05 / distance(gl_PointCoord, vec2(0.5)) - 0.10;
  
  gl_FragColor = vec4(1.0, 1.0, 1.0, distanceToCenter);
}