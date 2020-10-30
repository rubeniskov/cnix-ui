/**
 * Creates WebGL context using fallback pattern
 *
 * @param {HTMLCanvasElement} canvas
 * @param {WebGLRenderingContext} [options]
 * @returns {WebGLRenderingContextç}
 */

const createContext = (canvas, options) => canvas.getContext('webgl', options)
|| canvas.getContext('webgl-experimental', options)
|| canvas.getContext('experimental-webgl', options);

export default createContext;
