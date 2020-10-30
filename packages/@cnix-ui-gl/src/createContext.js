/**
 * Creates WebGL context using fallback pattern
 *
 * @param {HTMLCanvasElement} canvas
 * @param {any} [options]
 * @returns {WebGLRenderingContext}
 */

const createContext = (canvas, options) => canvas.getContext('webgl', options)
|| canvas.getContext('webgl-experimental', options)
|| canvas.getContext('experimental-webgl', options);

export default createContext;
