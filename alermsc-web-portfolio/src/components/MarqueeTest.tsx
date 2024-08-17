/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useWindowSize } from '@react-hook/window-size';
import { motion, MotionValue, useSpring } from 'framer-motion';
import normalizeWheel from 'normalize-wheel';
import { useEffect, useRef, useState, WheelEventHandler } from 'react';
import { useRafLoop } from 'react-use';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

const _ = {
  initialSpeed: 10, // Velocidad inicial rápida
  normalSpeed: 0.4, // Velocidad normal cuando no está en hover
  threshold: 0.014,
  wheelFactor: 1.25,
  dragFactor: 2,
};

interface DataItem {
  image: string;
  title: string;
}

interface SpeedDetails {
  damping: number;
  stiffness: number;
  mass: number;
}

interface MarqueeProps {
  x: React.MutableRefObject<number>;
  direction: 'left' | 'right';
  speedDetails: SpeedDetails;
  cardData: DataItem[];
  isHovered: React.MutableRefObject<boolean>;
}

interface MarqueeItemProps {
  children: React.ReactNode;
  speed: MotionValue<number>;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: DataItem;
  style?: React.CSSProperties;
}
const data: DataItem[] = [
  {
    image: 'https://framerusercontent.com/images/VIqlDWL1UV6azfAV9xBz0MPhw.jpeg?scale-down-to=1024',
    title: 'Petrified Forest',
  },
  {
    image: 'https://framerusercontent.com/images/L1RFqeJ6NviUiTVLT3u2pL6IU.jpeg?scale-down-to=1024',
    title: 'Mountain Valley',
  },
  {
    image:
      'https://framerusercontent.com/images/Q44lHbttA8VG6mS9allIhkYAR8Y.jpeg?scale-down-to=1024',
    title: 'Cannon Beach',
  },
  {
    image: 'https://framerusercontent.com/images/3LKCYdYAgamssbz1JJSOnu8vM.jpg?scale-down-to=1024',
    title: 'Redwood',
  },
  {
    image:
      'https://framerusercontent.com/images/NcLJHjVnMgsxeBqzuinazFIEXoc.jpg?scale-down-to=1024',
    title: 'Brookings',
  },
];

export default function MarqueeTest() {
  const [angle, setAngle] = useState(45);
  const isTouchDevice = useIsTouchDevice();
  const x = useRef(0);

  const isHovered = useRef(false);

  const onWheel: WheelEventHandler<HTMLDivElement> = (e) => {
    const normalized = normalizeWheel(e);
    x.current += normalized.pixelY * _.wheelFactor;
  };

  const [width, height] = useWindowSize();

  useEffect(() => {
    const angleInRadians = Math.atan2(height, width);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    if (angleInDegrees > 50) {
      setAngle(50);
    } else {
      setAngle(Math.round(angleInDegrees));
    }
  }, [width, height]);

  return (
    <div
      className='flex max-w-screen h-screen overflow-hidden items-center justify-center text-center'
      onWheel={onWheel}
    >
      <div className='flex flex-col' style={{ transform: `rotate(${-angle}deg)` }}>
        <MyMarquee
          x={x}
          direction='left'
          speedDetails={{
            damping: 200,
            stiffness: 1000,
            mass: 1,
          }}
          cardData={data}
          isHovered={isHovered}
        />
      </div>
    </div>
  );
}

const MyMarquee: React.FC<MarqueeProps> = ({ x, direction, speedDetails, cardData, isHovered }) => {
  const speed = useSpring(_.initialSpeed, speedDetails);
  const marquee = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);

  useEffect(() => {
    // Después de 1 segundo, disminuye la velocidad a la velocidad normal
    const timer = setTimeout(() => {
      speed.set(_.normalSpeed);
    }, 1000);

    return () => clearTimeout(timer);
  }, [speed]);

  const onDragStart = () => {
    slowDown.current = true;
    if (marquee.current) {
      marquee.current.classList.add('drag');
    }
  };

  const onDrag = (_e: any, info: { delta: { x: number } }) => {
    speed.set(_.dragFactor * -info.delta.x);
  };

  const onDragEnd = (_e: any) => {
    slowDown.current = false;
    if (marquee.current) {
      marquee.current.classList.remove('drag');
    }
    if (isHovered.current) {
      speed.set(0);
    } else {
      x.current = _.normalSpeed;
    }
  };

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < _.threshold) return;

    x.current *= 0.66;

    if (direction === 'right') {
      speed.set((_.normalSpeed + x.current) * -1);
    } else {
      speed.set(_.normalSpeed + x.current);
    }

    if (isHovered.current) {
      speed.set(x.current);
    }
  };

  useRafLoop(loop, true);

  return (
    <motion.div
      className='marquee flex relative flex-row-reverse'
      ref={marquee}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
    >
      {cardData.map((_, index) => (
        <MarqueeItem key={index} speed={speed} isHovered={isHovered}>
          {cardData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </MarqueeItem>
      ))}
    </motion.div>
  );
};

const MarqueeItem: React.FC<MarqueeItemProps & { isHovered: React.MutableRefObject<boolean> }> = ({
  children,
  speed,
  isHovered,
}) => {
  const item = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);
  const x = useRef(0);
  const originalSpeed = useRef(speed.get());

  const [width, height] = useWindowSize();

  const setX = () => {
    if (!item.current || !rect.current) return;

    const xPercentage = (x.current / rect.current.width) * 100;
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;

    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (item.current) {
      rect.current = item.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = (_e: any) => {
    x.current -= speed.get();
    setX();
  };

  useRafLoop(loop, true);

  const handleMouseEnter = () => {
    isHovered.current = true;
    originalSpeed.current = speed.get();
    speed.set(0);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    speed.set(_.normalSpeed); // Restaurar la velocidad normal
  };

  return (
    <div
      draggable={false}
      className='item flex items-center text-white flex-row-reverse whitespace-nowrap'
      ref={item}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const Card: React.FC<CardProps> = ({ item }) => {
  const [angle, setAngle] = useState(45);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const angleInRadians = Math.atan2(height, width);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    if (angleInDegrees > 50) {
      setAngle(50);
    } else {
      setAngle(Math.round(angleInDegrees));
    }
  }, [width, height]);

  return (
    <div className='card-hover-wrapper'>
      <div
        className='card-container mr-[-70px] ml-[-70px] md:mr-[-100px] md:ml-[-100px]'
        style={{
          transform: `rotateZ(${angle}deg)`,
          border: '1px solid #0000003d',
          transition: 'transform 0.3s ease',
          opacity: 0.92,
        }}
      >
        <div className='md:max-h-[300px] max-h-[240px] relative md:max-w-[400px] max-w-[290px] overflow-clip'>
          <img
            alt={item.title}
            src={item.image}
            className='h-full w-full min-h-[240px] md:min-h-[300px] md:min-w-[400px] min-w-[290px] object-cover object-center'
          />
        </div>
      </div>
    </div>
  );
};
