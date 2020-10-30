export default useWebGL;
export type WebGLCanvasRef = import("react").MutableRefObject<HTMLCanvasElement>;
export type WebGLRef = import("react").MutableRefObject<WebGLRenderingContext>;
/**
 * Creates a webgl context using a react ref
 *
 * @param {Object} [options] webgl context options
 * @returns {[WebGLCanvasRef, WebGLRef]}
 */
declare function useWebGL(options?: any): [import("react").MutableRefObject<HTMLCanvasElement>, import("react").MutableRefObject<WebGLRenderingContext>];
