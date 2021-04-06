// @ts-check
/** @typedef {import('@cnix-ui/gl/types/createShell').ShellOptions} ShellOptions */
import { useEffect } from 'react';
import createShell from '@cnix-ui/gl/createShell';
import useWebGL from './useWebGL';

/**
 * Given a setup and render function returned by the setup uses request animation frame
 * to create a infitite loop, for each cycle the render will be called
 * with the gl context and canvas parameters.
 *
 * @param {ShellOptions} [options]
 */
const useWebGlRenderer = (options) => {
  const { canvasRef, glRef } = useWebGL(options);

  useEffect(() => {
    if (glRef.current) {
      const setup = createShell(options);
      const shell = setup(glRef.current);
      return shell.detach
    }
  }, [canvasRef, glRef]);

  return canvasRef;
};

export default useWebGlRenderer;
