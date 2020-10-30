export default useWebGlRenderer;
export type ShellOptions = {
    init?: boolean;
};
/**
 * Given a setup and render function returned by the setup uses request animation frame
 * to create a infitite loop, for each cycle the render will be called
 * with the gl context and canvas parameters.
 *
 * @param {ShellOptions} [options]
 */
declare function useWebGlRenderer(options?: ShellOptions): import("react").MutableRefObject<HTMLCanvasElement>;
