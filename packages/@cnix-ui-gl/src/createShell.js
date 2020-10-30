// @ts-check
import raf from 'raf-component';

/**
 * Executed each time the render is called
 * @typedef {(gl: WebGLRenderingContext) => void} RenderCallback
 */

/**
 * Executed once at initialization stage
 * @typedef {(gl: WebGLRenderingContext) => RenderCallback} SetupCallback
 */

/**
 * @typedef {Object} ShellOptions
 * @prop {boolean} [init] Attach the renderer by default
 */

/**
 * @typedef {Object} Shell
 * @prop {function} attach
 * @prop {function} detach
 * @prop {(mixed: SetupCallback) => Function} add
 */

/**
 * Executed once at initialization stage
 * @typedef {(gl: WebGLRenderingContext) => Shell} ShellSetupCallback
 */

/**
 * Creates a webgl shell for managin gl-objects
 *
 * @param {ShellOptions} options
 * @returns {ShellSetupCallback}
 */
const createShell = ({
  init = true,
} = {}) => {
  /** @type {RenderCallback[]} */
  const renders = [];

  /** @type {RenderCallback} */
  const render = (gl) => {
    const len = renders.length;
    for (let i = 0; i < len; i += 1) {
      renders[i](gl);
    }
  };

  /**
   * Initialize shell passing webgl context
   * @param {WebGLRenderingContext} gl
   * @returns {Shell}
   */
  const setup = (gl) => {
    /** @type {Number} */
    let rafTick;

    /**
     * Request animation frame recursive loop
     */
    const tick = () => {
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
     * @param {SetupCallback} cb
     */
    const add = (cb) => {
      const index = renders.push(cb(gl));
      return () => {
        renders.splice(index, 1);
      };
    };

    if (init) {
      attach();
    }

    return {
      attach,
      detach,
      add,
    };
  };

  return setup;
};

export default createShell;
