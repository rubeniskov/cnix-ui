// @ts-check
import raf from 'raf-component';
import { useEffect } from 'react';
import useWebGL from './useWebGL';

/**
 * Called each time the renderer has to paint a cycle.
 * @callback renderCallback
 * @param {WebGLRenderingContext} gl
 * @param {HTMLCanvasElement} canvas
 */

/**
 * Called once when the renderer is initialized.
 *
 * @callback setupCallback
 * @param {WebGLRenderingContext} gl
 * @param {HTMLCanvasElement} canvas
 * @returns {renderCallback}
 */

/**
 * Given a setup and render function returned by the setup uses request animation frame
 * to create a infitite loop, for each cycle the render will be called
 * with the gl context and canvas parameters.
 *
 * @param {setupCallback} setup
 * @param {any} [options]
 */
const useWebGlRenderer = (setup, options) => {
  const [canvasRef, glRef] = useWebGL(options);

  useEffect(() => {
    let rafTick;
    if (glRef.current && typeof setup === 'function') {
      const render = setup(glRef.current, canvasRef.current);
      const tick = () => {
        render(glRef.current, canvasRef.current);
        rafTick = raf(tick);
      };

      if (typeof render === 'function') {
        rafTick = raf(tick);
      }
    }

    return () => raf.cancel(rafTick);
  }, [canvasRef, glRef, setup]);

  return canvasRef;
};

export default useWebGlRenderer;
