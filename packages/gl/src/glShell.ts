import raf from 'raf';

export type GLContext = WebGL2RenderingContext | WebGLRenderingContext;
export type RenderCallback = (gl?: GLContext) => void;

export type Noop = () => void;
export type RemoveCallback = Noop;
export type Remove = (cb: RenderCallback) => boolean;
export type Add = (cb: RenderCallback) => RemoveCallback;

export type ShellOptions = {
    init?: boolean;
};

export interface Drawable {
    draw: () => void;
    dispose: () => void;
}

export interface Shell {
    attach: Noop;
    detach: Noop;
    add: Add;
    remove: Remove;
}

/**
 * Creates a webgl shell for managin gl-objects
 */
const createShell = (gl: GLContext, opts?: ShellOptions): Shell => {
    const { init = true } = { ...opts };

    const renders: Array<RenderCallback> = [];

    const render: RenderCallback = (gl) => {
        const len = renders.length;
        for (let i = 0; i < len; i += 1) {
            renders[i](gl);
        }
    };

    let rafTick: number;

    /**
     * Request animation frame recursive loop
     */
    const tick: Noop = () => {
        render(gl);
        rafTick = raf(tick);
    };

    /**
     * Enable the render cycle
     */
    const attach = () => {
        tick();
    };

    /**
     * Disable the render cycle
     */
    const detach = () => {
        raf.cancel(rafTick);
    };

    /**
     * Adds renderable object to shell
     */
    const add = (cb: RenderCallback): RemoveCallback => {
        const index = renders.push(cb);
        return () => {
            renders.splice(index, 1);
        };
    };

    const remove = (cb: RenderCallback): boolean => {
        const idx = renders.indexOf(cb);
        if (idx !== -1) {
            renders.splice(idx, 1);
            return true;
        }
        return false;
    };

    if (init) {
        attach();
    }

    return {
        attach,
        detach,
        add,
        remove
    };
};

export default createShell;
