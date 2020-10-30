// @ts-check
/** @typedef {import('react').MutableRefObject<HTMLCanvasElement>} WebGLCanvasRef */
/** @typedef {import('react').MutableRefObject<WebGLRenderingContext>} WebGLRef */
import { useLayoutEffect, useRef } from 'react';
import glReset from 'gl-reset';
import glContext from '../gl/createContext';

/**
 * Creates a webgl context using a react ref
 *
 * @param {Object} [options] webgl context options
 * @returns {[WebGLCanvasRef, WebGLRef]}
 */
const useWebGL = (options) => {
  /** @type {WebGLCanvasRef} */
  const canvasRef = useRef();
  /** @type {WebGLRef} */
  const glRef = useRef();

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

  return [canvasRef, glRef];
};

export default useWebGL;
