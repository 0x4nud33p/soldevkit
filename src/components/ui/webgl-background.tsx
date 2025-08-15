"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

// Add type declarations
declare global {
  interface Window {
    THREE: {
      WebGLRenderer: new (options?: any) => any;
      OrthographicCamera: new (...args: any[]) => any;
      WebGLRenderTarget: new (...args: any[]) => any;
      ShaderMaterial: new (options?: any) => any;
      Vector2: new (...args: any[]) => any;
      Vector3: new (...args: any[]) => any;
      Vector4: new (...args: any[]) => any;
      PlaneGeometry: new (...args: any[]) => any;
      Mesh: new (...args: any[]) => any;
      LinearFilter: any;
      RGBAFormat: any;
      FloatType: any;
    };
    initWebGL?: () => void;
  }
}

interface Config {
  brushSize: number;
  brushStrength: number;
  distortionAmount: number;
  fluidDecay: number;
  trailLength: number;
  stopDecay: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  colorIntensity: number;
  softness: number;
}

const WebGLBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptsLoaded = useRef(false);

  useEffect(() => {
    // This will run after the scripts are loaded
    const initWebGL = () => {
      if (
        typeof window !== "undefined" &&
        window.THREE &&
        !scriptsLoaded.current
      ) {
        scriptsLoaded.current = true;

        // Your original script.js code goes here
        const config: Config = {
          brushSize: 25.0,
          brushStrength: 0.5,
          distortionAmount: 2.5,
          fluidDecay: 0.98,
          trailLength: 0.8,
          stopDecay: 0.85,
          color1: "#1a1a1a", // Dark charcoal
          color2: "#282C35", // Medium grey
          color3: "#0f0f0f", // Light grey with slight blue tint
          color4: "#9ca3af", // Lighter grey for highlights
          colorIntensity: 1.2, // Increased for more metallic shine
          softness: 0.7, // Reduced for sharper metallic edges
        };

        function hexToRgb(hex: string): [number, number, number] {
          const r = parseInt(hex.slice(1, 3), 16) / 255;
          const g = parseInt(hex.slice(3, 5), 16) / 255;
          const b = parseInt(hex.slice(5, 7), 16) / 255;
          return [r, g, b];
        }

        // Shaders
        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        const fluidShader = `
          uniform float iTime;
          uniform vec2 iResolution;
          uniform vec4 iMouse;
          uniform int iFrame;
          uniform sampler2D iPreviousFrame;
          uniform float uBrushSize;
          uniform float uBrushStrength;
          uniform float uFluidDecay;
          uniform float uTrailLength;
          uniform float uStopDecay;
          varying vec2 vUv;
          
          vec2 ur, U;
          
          float ln(vec2 p, vec2 a, vec2 b) {
              return length(p-a-(b-a)*clamp(dot(p-a,b-a)/dot(b-a,b-a),0.,1.));
          }
          
          vec4 t(vec2 v, int a, int b) {
              return texture2D(iPreviousFrame, fract((v+vec2(float(a),float(b)))/ur));
          }
          
          vec4 t(vec2 v) {
              return texture2D(iPreviousFrame, fract(v/ur));
          }
          
          float area(vec2 a, vec2 b, vec2 c) {
              float A = length(b-c), B = length(c-a), C = length(a-b), s = 0.5*(A+B+C);
              return sqrt(s*(s-A)*(s-B)*(s-C));
          }
          
          void main() {
              U = vUv * iResolution;
              ur = iResolution.xy;
              
              if (iFrame < 1) {
                  float w = 0.5+sin(0.2*U.x)*0.5;
                  float q = length(U-0.5*ur);
                  gl_FragColor = vec4(0.1*exp(-0.001*q*q),0,0,w);
              } else {
                  vec2 v = U,
                       A = v + vec2( 1, 1),
                       B = v + vec2( 1,-1),
                       C = v + vec2(-1, 1),
                       D = v + vec2(-1,-1);
                  
                  for (int i = 0; i < 8; i++) {
                      v -= t(v).xy;
                      A -= t(A).xy;
                      B -= t(B).xy;
                      C -= t(C).xy;
                      D -= t(D).xy;
                  }
                  
                  vec4 me = t(v);
                  vec4 n = t(v, 0, 1),
                      e = t(v, 1, 0),
                      s = t(v, 0, -1),
                      w = t(v, -1, 0);
                  vec4 ne = .25*(n+e+s+w);
                  me = mix(t(v), ne, vec4(0.15,0.15,0.95,0.));
                  me.z = me.z - 0.01*((area(A,B,C)+area(B,C,D))-4.);
                  
                  vec4 pr = vec4(e.z,w.z,n.z,s.z);
                  me.xy = me.xy + 100.*vec2(pr.x-pr.y, pr.z-pr.w)/ur;
                  
                  me.xy *= uFluidDecay;
                  me.z *= uTrailLength;
                  
                  if (iMouse.z > 0.0) {
                      vec2 mousePos = iMouse.xy;
                      vec2 mousePrev = iMouse.zw;
                      vec2 mouseVel = mousePos - mousePrev;
                      float velMagnitude = length(mouseVel);
                      float q = ln(U, mousePos, mousePrev);
                      vec2 m = mousePos - mousePrev;
                      float l = length(m);
                      if (l > 0.0) m = min(l, 10.0) * m / l;
                      
                      float brushSizeFactor = 1e-4 / uBrushSize;
                      float strengthFactor = 0.03 * uBrushStrength;
                      
                      float falloff = exp(-brushSizeFactor*q*q*q);
                      falloff = pow(falloff, 0.5);
                      
                      me.xyw += strengthFactor * falloff * vec3(m, 10.);
                      
                      if (velMagnitude < 2.0) {
                          float distToCursor = length(U - mousePos);
                          float influence = exp(-distToCursor * 0.01);
                          float cursorDecay = mix(1.0, uStopDecay, influence);
                          me.xy *= cursorDecay;
                          me.z *= cursorDecay;
                      }
                  }
                  
                  gl_FragColor = clamp(me, -0.4, 0.4);
              }
          }
        `;

        const displayShader = `
          uniform float iTime;
          uniform vec2 iResolution;
          uniform sampler2D iFluid;
          uniform float uDistortionAmount;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform vec3 uColor4;
          uniform float uColorIntensity;
          uniform float uSoftness;
          varying vec2 vUv;
          
          void main() {
            vec2 fragCoord = vUv * iResolution;
            
            vec4 fluid = texture2D(iFluid, vUv);
            vec2 fluidVel = fluid.xy;
            
            float mr = min(iResolution.x, iResolution.y);
            vec2 uv = (fragCoord * 2.0 - iResolution.xy) / mr;
            
            uv += fluidVel * (0.5 * uDistortionAmount);
            
            float d = -iTime * 0.5;
            float a = 0.0;
            for (float i = 0.0; i < 8.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
            }
            d += iTime * 0.5;
            
            float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
            float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
            float mixer3 = sin(d + a) * 0.5 + 0.5;
            
            float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
            mixer1 = mix(mixer1, 0.5, smoothAmount);
            mixer2 = mix(mixer2, 0.5, smoothAmount);
            mixer3 = mix(mixer3, 0.5, smoothAmount);
            
            vec3 col = mix(uColor1, uColor2, mixer1);
            col = mix(col, uColor3, mixer2);
            col = mix(col, uColor4, mixer3 * 0.4);
            
            col *= uColorIntensity;
            
            gl_FragColor = vec4(col, 1.0);
          }
        `;

        const camera = new window.THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new window.THREE.WebGLRenderer({ antialias: true });

        const gradientCanvas = containerRef.current;
        if (!gradientCanvas) {
          console.error("Container ref is null");
          return;
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        gradientCanvas.appendChild(renderer.domElement);

        const fluidTarget1 = new window.THREE.WebGLRenderTarget(
          window.innerWidth,
          window.innerHeight,
          {
            minFilter: window.THREE.LinearFilter,
            magFilter: window.THREE.LinearFilter,
            format: window.THREE.RGBAFormat,
            type: window.THREE.FloatType,
          },
        );

        const fluidTarget2 = new window.THREE.WebGLRenderTarget(
          window.innerWidth,
          window.innerHeight,
          {
            minFilter: window.THREE.LinearFilter,
            magFilter: window.THREE.LinearFilter,
            format: window.THREE.RGBAFormat,
            type: window.THREE.FloatType,
          },
        );

        let currentFluidTarget = fluidTarget1;
        let previousFluidTarget = fluidTarget2;
        let frameCount = 0;

        const fluidMaterial = new window.THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            iResolution: {
              value: new window.THREE.Vector2(
                window.innerWidth,
                window.innerHeight,
              ),
            },
            iMouse: { value: new window.THREE.Vector4(0, 0, 0, 0) },
            iFrame: { value: 0 },
            iPreviousFrame: { value: null },
            uBrushSize: { value: config.brushSize },
            uBrushStrength: { value: config.brushStrength },
            uFluidDecay: { value: config.fluidDecay },
            uTrailLength: { value: config.trailLength },
            uStopDecay: { value: config.stopDecay },
          },
          vertexShader: vertexShader,
          fragmentShader: fluidShader,
        });

        const displayMaterial = new window.THREE.ShaderMaterial({
          uniforms: {
            iTime: { value: 0 },
            iResolution: {
              value: new window.THREE.Vector2(
                window.innerWidth,
                window.innerHeight,
              ),
            },
            iFluid: { value: null },
            uDistortionAmount: { value: config.distortionAmount },
            uColor1: {
              value: new window.THREE.Vector3(...hexToRgb(config.color1)),
            },
            uColor2: {
              value: new window.THREE.Vector3(...hexToRgb(config.color2)),
            },
            uColor3: {
              value: new window.THREE.Vector3(...hexToRgb(config.color3)),
            },
            uColor4: {
              value: new window.THREE.Vector3(...hexToRgb(config.color4)),
            },
            uColorIntensity: { value: config.colorIntensity },
            uSoftness: { value: config.softness },
          },
          vertexShader: vertexShader,
          fragmentShader: displayShader,
        });

        const geometry = new window.THREE.PlaneGeometry(2, 2);
        const fluidPlane = new window.THREE.Mesh(geometry, fluidMaterial);
        const displayPlane = new window.THREE.Mesh(geometry, displayMaterial);

        let mouseX = 0,
          mouseY = 0;
        let prevMouseX = 0,
          prevMouseY = 0;
        let lastMoveTime = 0;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = renderer.domElement.getBoundingClientRect();
          prevMouseX = mouseX;
          prevMouseY = mouseY;
          mouseX = e.clientX - rect.left;
          mouseY = rect.height - (e.clientY - rect.top);
          lastMoveTime = performance.now();
          fluidMaterial.uniforms.iMouse.value.set(
            mouseX,
            mouseY,
            prevMouseX,
            prevMouseY,
          );
        };

        const handleMouseLeave = () => {
          fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        function animate() {
          requestAnimationFrame(animate);

          const time = performance.now() * 0.001;
          fluidMaterial.uniforms.iTime.value = time;
          displayMaterial.uniforms.iTime.value = time;
          fluidMaterial.uniforms.iFrame.value = frameCount;

          if (performance.now() - lastMoveTime > 100) {
            fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
          }

          fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
          fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
          fluidMaterial.uniforms.uFluidDecay.value = config.fluidDecay;
          fluidMaterial.uniforms.uTrailLength.value = config.trailLength;
          fluidMaterial.uniforms.uStopDecay.value = config.stopDecay;

          displayMaterial.uniforms.uDistortionAmount.value =
            config.distortionAmount;
          displayMaterial.uniforms.uColorIntensity.value =
            config.colorIntensity;
          displayMaterial.uniforms.uSoftness.value = config.softness;
          displayMaterial.uniforms.uColor1.value.set(
            ...hexToRgb(config.color1),
          );
          displayMaterial.uniforms.uColor2.value.set(
            ...hexToRgb(config.color2),
          );
          displayMaterial.uniforms.uColor3.value.set(
            ...hexToRgb(config.color3),
          );
          displayMaterial.uniforms.uColor4.value.set(
            ...hexToRgb(config.color4),
          );

          fluidMaterial.uniforms.iPreviousFrame.value =
            previousFluidTarget.texture;
          renderer.setRenderTarget(currentFluidTarget);
          renderer.render(fluidPlane, camera);

          displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
          renderer.setRenderTarget(null);
          renderer.render(displayPlane, camera);

          const temp = currentFluidTarget;
          currentFluidTarget = previousFluidTarget;
          previousFluidTarget = temp;

          frameCount++;
        }

        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;

          renderer.setSize(width, height);
          fluidMaterial.uniforms.iResolution.value.set(width, height);
          displayMaterial.uniforms.iResolution.value.set(width, height);

          fluidTarget1.setSize(width, height);
          fluidTarget2.setSize(width, height);
          frameCount = 0;
        };

        window.addEventListener("resize", handleResize);

        animate();
      }
    };

    // Try to initialize if scripts are already loaded
    initWebGL();

    // Also set up the global callback for when scripts load
    window.initWebGL = initWebGL;

    // In the cleanup function, the delete will now work without TypeScript errors
    return () => {
      // Cleanup
      scriptsLoaded.current = false;
      if (window.initWebGL) {
        delete window.initWebGL;
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        onLoad={() => window.initWebGL && window.initWebGL()}
        strategy="afterInteractive"
      />
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none" }}
      />
    </>
  );
};

export default WebGLBackground;
