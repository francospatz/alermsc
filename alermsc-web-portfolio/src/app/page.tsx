/* eslint-disable @typescript-eslint/naming-convention */
'use client';
//import MarqueeTest from '@/components/MarqueeTest';
import dynamic from 'next/dynamic';

const Marquee = dynamic(() => import('@/components/MarqueeTest'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Scene = dynamic(() => import('@/components/Scene'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <main className='flex justify-center items-center h-screen w-screen relative'>
      <Marquee />
      {/* <Scene /> */}
    </main>
  );
}
