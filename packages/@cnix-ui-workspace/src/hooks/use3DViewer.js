// @ts-check
/** @typedef {import('../gl/create3DViewer').ViewerOptions} ViewerOptions */
// import { useEffect, useRef } from 'react';
import { useMemo } from 'react';
import create3DViewer from '../gl/create3DViewer';
import useWebGLRenderer from './useWebGLRenderer';

/**
 * 3DViewer hook memoization parameters
 *
 * @param {ViewerOptions} [options]
 */
const use3DViewer = (options) => {
  const setup = useMemo(() => create3DViewer(options), []);

  return useWebGLRenderer(setup);
};

export default use3DViewer;
