// @ts-check
// import glslify from 'glslify';
import createQuad from 'gl-quad';
import createShader from 'gl-shader';
import identity4x4 from 'gl-mat4/identity';
import glslify from 'glslify';

const vert = glslify('./shaders/bg.vert');
const frag = glslify('./shaders/bg.frag');

// // smoothstep low/high input
// smoothing: [-0.5, 1.0],
// // % opacity of noise grain (0 -> disabled)
// noiseAlpha: 0.35,
// // whether or not the noise is monochromatic
// coloredNoise: true,
// // offset the vignette
// offset: [-0.05, -0.15],

// Color

/**
 * @typedef {Number[]} Color 4 vector array with float values beetween 0 to 1 rgba
 */

/**
 * @typedef {Object} Options
 * @param {Number[]} [scale] 2 vector array [x, y] with float values beetween 0 to 1
 * @param {Number} [aspect] Aspect ration factor height/width
 * @param {Color} [color1] Start background color gradient
 * @param {Color} [color2] End Background color gradient
 */

function style(shader, opt?: any) {
    if (!opt) {
        return;
    }

    shader.bind();
    const { uniforms } = shader;

    const entries = Object.keys(opt);
    for (let i = 0; i < entries.length; i += 1) {
        const key = entries[i];
        if (
            Object.prototype.hasOwnProperty.call(opt, key) &&
            (opt[key] || typeof opt[key] === 'number' || typeof opt[key] === 'boolean')
        ) {
            uniforms[key] = opt[key];
        }
    }
}

/**
 * Creates a background
 *
 * @param {WebGLRenderingContext} gl
 * @param {Options} options
 */
const createBackground = (gl, options?) => {
    const attribs = [
        { name: 'position', location: 0, type: 'vec4' },
        { name: 'uv', location: 1, type: 'vec2' }
    ];

    const shader = createShader(gl, vert, frag, null, attribs);
    const quad = createQuad(gl);
    const matrix = identity4x4([]);

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    // some defaults
    style(shader, {
        aspect: width / height,
        smoothing: [-0.4, 0.8],
        noiseAlpha: 0.04,
        coloredNoise: true,
        offset: [0, 0],
        resolution: [width, height],
        color1: [1, 1, 1],
        color2: [0, 0, 0],
        scale: [1.0, 1.0],
        projection: matrix,
        view: matrix,
        model: matrix,
        ...options
    });

    function draw() {
        shader.bind();
        quad.draw();
    }

    function dispose() {
        shader.dispose();
        quad.dispose();
    }

    return {
        draw,
        dispose,
        style: style.bind(null, shader)
    };
};

export default createBackground;
