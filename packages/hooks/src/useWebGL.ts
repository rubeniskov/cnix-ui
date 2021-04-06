// @ts-check
/** @typedef {import('react').MutableRefObject<HTMLCanvasElement>} WebGLCanvasRef */
/** @typedef {import('react').MutableRefObject<WebGLRenderingContext>} WebGLRef */
import { useLayoutEffect, useRef } from 'react';
import glReset from '@cnix-ui/gl/reset';
import glContext from '@cnix-ui/gl/createContext';

/**
 * Creates a webgl context using a react ref
 *
 * @returns {[WebGLCanvasRef, WebGLRef]}
 */
const useWebGL = (options?: any) => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement> = useRef();
  const glRef: React.MutableRefObject<RenderingContext> = useRef();

  useLayoutEffect(() => {
    const {
      current: canvas = null,
    } = canvasRef;

    if (canvas) {
      glRef.current = glContext(canvas, options);

      if (!glRef.current) {
        throw new Error('useWebGL: unable to initialize WebGL');
      }
    }
    return () => {
      if (glRef.current) {
        glReset(glRef.current);
      }
    };
  }, [canvasRef.current, ...Object.values(options || {})]);

  return { canvasRef, glRef };
};

export default useWebGL;
