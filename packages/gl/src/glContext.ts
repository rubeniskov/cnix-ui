/**
 * Creates WebGL context using fallback pattern
 */
const createContext = (
    canvas: HTMLCanvasElement,
    options?: any
): WebGL2RenderingContext | WebGLRenderingContext => {
    const ctx =
        canvas.getContext('webgl2', options) ||
        canvas.getContext('webgl', options) ||
        canvas.getContext('webgl-experimental', options) ||
        canvas.getContext('experimental-webgl', options);

    if (!(ctx instanceof WebGL2RenderingContext || ctx instanceof WebGLRenderingContext)) {
        throw new Error('Webgl Not supported');
    }

    return ctx;
};

export default createContext;
