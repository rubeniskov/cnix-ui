// @ts-check
/** @typedef {import(".").Props} Props */
import React, { forwardRef, useRef } from 'react';
import makeStyles from '@cnix-ui/styles/makeStyles';
import useIsolatedScroll from '@cnix-ui/hooks/useIsolateScroll';
import useCombineRefs from '@cnix-ui/hooks/useCombinedRefs';
import use3DViewer from '../../hooks/use3DViewer';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    // pointerEvents: ({ disabled }) => (disabled ? 'none' : 'unset'),
  },
});

/**
 * Renders a canvas with a WebGL capability for visualize 3D Objects
 *
 * @param {Props} props
 */
const Workspace3DViewer = forwardRef((props, ref) => {
  const classes = useStyles(props);
  const containerRef = useRef();
  const canvasRef = use3DViewer();
  const innerRef = useCombineRefs(ref, containerRef);

  useIsolatedScroll(containerRef);

  return (
    <div ref={innerRef} className={classes.root}>
      <canvas
        ref={canvasRef}
      />
    </div>
  );
});

export default Workspace3DViewer;
