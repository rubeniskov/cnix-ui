import React, { useRef, useEffect } from 'react';
import makeStyles from '@cnix-ui/styles/makeStyles';

import glViewer from '@cnix-ui/gl/glViewer';
import glContext from '@cnix-ui/gl/glContext';
import glShell from '@cnix-ui/gl/glShell';
import glReset from '@cnix-ui/gl/glReset';

const useStyles = makeStyles({
    root: `
        width: 100vw;
        height: 100vh;
    `
});

const Workspace: React.FC<any> = (props) => {
    const canvasRef = useRef();
    const classes = useStyles(props);

    useEffect(() => {
        if (canvasRef.current) {
            const gl = glContext(canvasRef.current);
            const shell = glShell(gl);
            const viewer = glViewer(gl);

            shell.add(viewer);

            return () => {
                shell.detach();
                glReset(gl);
            };
        }
    }, [canvasRef]);

    return (
        <div className={classes.root}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default Workspace;
