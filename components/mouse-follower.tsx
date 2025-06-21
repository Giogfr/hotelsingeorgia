"use client"

import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseFollower = () => {
  const [isPointer, setIsPointer] = useState(false);

  const mouse = {
    x: useSpring(0, { stiffness: 500, damping: 50 }),
    y: useSpring(0, { stiffness: 500, damping: 50 }),
  };

  const scale = useSpring(1, { stiffness: 700, damping: 30 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointer(hasFinePointer);

    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - 15);
      mouse.y.set(e.clientY - 15);
    };

    const handleMouseDown = () => {
        scale.set(1.5);
    };

    const handleMouseUp = () => {
        scale.set(1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouse.x, mouse.y, scale]);

  if (!isPointer) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-white/20 backdrop-blur-sm"
      style={{
        x: mouse.x,
        y: mouse.y,
        scale: scale,
        width: '30px',
        height: '30px',
      }}
    />
  );
};

export default MouseFollower; 