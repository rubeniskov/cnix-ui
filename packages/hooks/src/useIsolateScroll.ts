/** @typedef {import('react').MutableRefObject<HTMLElement>} HTMLElementRef */
import { useLayoutEffect } from 'react';
import isolatedScroll from 'isolated-scroll';

/**
 * Prevent scroll events from bubbling up to parent elements
 *
 * @param {HTMLElementRef} dom
 */
const useIsolatedScroll = (dom) => {
  useLayoutEffect(() => dom.current && isolatedScroll(dom.current), [dom]);
};

export default useIsolatedScroll;
