import { useEffect, useState } from 'react';

// Extender la interfaz Navigator para incluir msMaxTouchPoints
interface NavigatorExtended extends Navigator {
  msMaxTouchPoints?: number;
}

/**
 * @name useIsTouchDevice
 * @description A React hook that detects if the device supports touch.
 * @returns {boolean} Whether the device supports touch or not.
 */

export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    function onResize(): void {
      const navigatorExtended = navigator as NavigatorExtended;
      setIsTouchDevice(
        'ontouchstart' in window ||
          (navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 0) ||
          (navigatorExtended.msMaxTouchPoints !== undefined &&
            navigatorExtended.msMaxTouchPoints > 0)
      );
    }

    window.addEventListener('resize', onResize, false);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return isTouchDevice;
}
