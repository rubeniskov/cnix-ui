export default useCombinedRefs;
export type MutableRefObject = import("react").MutableRefObject<any>;
export type RefCallback = (instance: any) => void;
/**
 *
 * @param  {...(RefCallback | MutableRefObject)} refs
 */
declare function useCombinedRefs(...refs: (RefCallback | import("react").MutableRefObject<any>)[]): (el: any) => void;
