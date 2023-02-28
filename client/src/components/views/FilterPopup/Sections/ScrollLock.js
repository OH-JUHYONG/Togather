import { useCallback, useState } from 'react';

export function useBodyScrollLock() {
  let [scrollPosition,setScrollPosition] = useState(0);
  const lockScroll = useCallback(() => {
    // for IOS safari
    setScrollPosition(window.pageYOffset);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }, [scrollPosition]);

  const openScroll = useCallback(() => {
    // for IOS safari
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
  },[scrollPosition]);

  return { lockScroll, openScroll };
}