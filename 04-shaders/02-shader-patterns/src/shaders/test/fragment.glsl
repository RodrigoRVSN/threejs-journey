varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // float strength = 1.0 - vUv.y;
    // float strength = vUv.y * 10.0;
    /* float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0)); */

    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));


    /* float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0)); */
    
    /* float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

    float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    float strength = barY + barX; */

    
    /* float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    float strength = barY + barX; */
    
    // float strength = abs(vUv.x - 0.5);
    
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    
    /* float squareExternal = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float squareInternal = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))); 
    float strength = squareExternal * squareInternal; */

    /* float strength = floor(vUv.x * 10.0) / 10.0;
    strength *= floor(vUv.y * 10.0) / 10.0; */

    // float strength = random(vUv);

    float strength = 0.065 / distance(vUv, vec2(0.5)) + 0.25;
    strength *= random(vUv);
    
    // strength = clamp(strength, 0.0, 1.0);
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    gl_FragColor = vec4(vec3(mixedColor), 1.0);
}