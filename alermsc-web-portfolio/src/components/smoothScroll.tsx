/* eslint-disable camelcase */
'use client';

import { ReactLenis } from 'lenis/react';
import React, { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default function SmoothScroll({ children }: PropsWithChildren) {
  return (
    <ReactLenis options={{ infinite: false }} root>
      {children}
    </ReactLenis>
  );
}
