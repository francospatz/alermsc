/* eslint-disable @typescript-eslint/naming-convention */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Carousel3D = () => {
  return (
    <div className='bg-neutral-800'>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

  return (
    <section ref={targetRef} className='relative h-[300vh] bg-neutral-900'>
      <div className='sticky top-0 flex h-screen items-center rotate-[-55deg]'>
        <motion.div style={{ x }} className='flex gap-4'>
          {cards.map((card, index) => {
            return <Card card={card} index={index} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, index }: { card: any; index: number }) => {
  return (
    <div
      key={card.id}
      style={{ zIndex: cards.length - index }}
      className='group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rotate-[55deg] opacity-100'
    >
      <div
        style={{
          backgroundColor: `${card.color}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110'
      ></div>
      <div className='absolute inset-0 z-10 grid place-content-center'>
        <p className='bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg'>
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Carousel3D;

const cards = [
  {
    color: '#242038',
    title: 'Card 1',
    id: 1,
  },
  {
    color: '#9067C6',
    title: 'Card 2',
    id: 2,
  },
  {
    color: '#8D86C9',
    title: 'Card 3',
    id: 3,
  },
  {
    color: '#CAC4CE',
    title: 'Card 4',
    id: 4,
  },
  {
    color: '#F7ECE1',
    title: 'Card 5',
    id: 5,
  },
  {
    color: '#E1D8D8',
    title: 'Card 6',
    id: 6,
  },
  {
    color: '#F7ECE1',
    title: 'Card 7',
    id: 7,
  },
];
