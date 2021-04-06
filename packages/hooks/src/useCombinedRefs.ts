/* eslint-disable no-param-reassign */
// @ts-check
/** @typedef {import('react').MutableRefObject<any>} MutableRefObject */
/** @typedef {import('react').RefCallback<any>} RefCallback */
import { useCallback } from 'react';

/**
 *
 * @param  {...(RefCallback | MutableRefObject)} refs
 */
const useCombinedRefs = (...refs) => useCallback((el) => {
  refs.filter(Boolean).forEach((ref) => {
    if (typeof ref === 'function') {
      ref(el);
    } else {
      ref.current = el;
    }
  });
}, refs);

export default useCombinedRefs;
