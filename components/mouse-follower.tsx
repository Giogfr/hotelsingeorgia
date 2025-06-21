"use client"

import { useState, useEffect } from 'react';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointer(hasFinePointer);

    if (!hasFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isPointer) {
    return null; 
  }

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-150 ease-out"
      style={{
        width: '30px',
        height: '30px',
        transform: `translate3d(${position.x - 15}px, ${position.y - 15}px, 0)`,
      }}
    />
  );
};

export default MouseFollower; 