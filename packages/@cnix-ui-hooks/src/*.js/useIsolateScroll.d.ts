export default useIsolatedScroll;
export type HTMLElementRef = import("react").MutableRefObject<HTMLElement>;
/**
 * Prevent scroll events from bubbling up to parent elements
 *
 * @param {HTMLElementRef} dom
 */
declare function useIsolatedScroll(dom: import("react").MutableRefObject<HTMLElement>): void;
