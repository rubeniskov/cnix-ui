import { RenderCallback } from './glShell';
import createBackground from './createBackground';

import Geometry from 'gl-geometry';
import fit from 'canvas-fit';
import glShader from 'gl-shader';
import mat4 from 'gl-mat4';
import normals from 'normals';
import glslify from 'glslify';
import bunny from 'bunny';
import createOrbitCamera from 'canvas-orbit-camera';

const vert = glslify('./shaders/bunny.vert');
const frag = glslify('./shaders/bunny.frag');

/**
 * @typedef ViewerOptions
 * @prop {Boolean} disabled
 * @prop {String[]} [background] background [color1, color2]
 */

/**
 * Creates a 3D space for load 3d objects
 * @param {ViewerOptions} [options]
 */
const create3DViewer = (gl: WebGLRenderingContext): RenderCallback => {
    const canvas = gl.canvas;
    window.addEventListener('resize', fit(canvas), false);
    const camera = createOrbitCamera(canvas);
    const geometry = Geometry(gl);
    const background = createBackground(gl);
    // const bounds = [[-5, -5, -5], [5, 5, 5]];

    geometry.attr('aPosition', bunny.positions);
    geometry.attr('aNormal', normals.vertexNormals(bunny.cells, bunny.positions));

    geometry.faces(bunny.cells);

    // Create the base matrices to be used
    // when rendering the bunny. Alternatively, can
    // be created using `new Float32Array(16)`
    const projection = mat4.create();
    const model = mat4.create();
    const view = mat4.create();

    const shader = glShader(gl, vert, frag);

    return () => {
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        camera.view(view);

        camera.tick();

        const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        const fieldOfView = Math.PI / 4;
        const near = 0.01;
        const far = 100;

        mat4.perspective(projection, fieldOfView, aspectRatio, near, far);

        // Sets the viewport, i.e. tells WebGL to draw the
        // scene across the full canvas.
        gl.viewport(0, 0, width, height);

        // gl.clearColor(0, 0, 0, 1);
        // set some flags before drawing
        // gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        // setup some fancy style (optional)
        const radius = Math.max(width, height) * 1.05;

        background.style({
            // xy scale
            scale: [(1 / width) * radius, (1 / height) * radius],
            // aspect ratio for vignette
            aspect: 1,
            // radial gradient colors A->B
            color1: [1, 1, 1],
            color2: [0.5, 0.5, 0.5],
            // smoothstep low/high input
            smoothing: [-0.5, 1.0],
            // % opacity of noise grain (0 -> disabled)
            noiseAlpha: 0.35,
            // whether or not the noise is monochromatic
            coloredNoise: true,
            // offset the vignette
            offset: [-0.05, -0.15]
        });
        background.draw();

        // Enables depth testing, which prevents triangles
        // from overlapping.
        gl.enable(gl.DEPTH_TEST);

        // Enables face culling, which prevents triangles
        // being visible from behind.
        gl.enable(gl.CULL_FACE);

        // gl.clearColor(0.145, 0.145, 0.145, 1);
        // Clear the context with the newly set color. This is
        // the function call that actually does the drawing.
        // gl.clear(gl.COLOR_BUFFER_BIT);
        // Binds the geometry and sets up the shader's attribute
        // locations accordingly.
        geometry.bind(shader);

        // Updates our model/view/projection matrices, sending them
        // to the GPU as uniform variables that we can use in
        // `shaders/bunny.vert` and `shaders/bunny.frag`.
        shader.uniforms.uProjection = projection;
        shader.uniforms.uView = view;
        shader.uniforms.uModel = model;

        // Finally: draws the bunny to the screen! The rest is
        // handled in our shaders.
        // axes.draw({
        //   projection,
        //   view,
        // });
        geometry.draw(gl.TRIANGLES);
    };
};

export default create3DViewer;
