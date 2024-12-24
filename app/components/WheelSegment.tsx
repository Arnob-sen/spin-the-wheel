"use client";

import { Person } from "../types";
import { motion } from "framer-motion";

interface WheelSegmentProps {
  person: Person;
  index: number;
  totalSegments: number;
  segmentSize: number;
}

export default function WheelSegment({ person, index, totalSegments, segmentSize }: WheelSegmentProps) {
  const angle = index * segmentSize;
  const color = `hsl(${(index * 360) / totalSegments}, 70%, 50%)`;
  const textRotation = angle + (segmentSize / 2);

  return (
    <div
      className="absolute w-full h-full origin-center"
      style={{
        transform: `rotate(${angle}deg)`,
        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((Math.PI / 180) * -segmentSize/2)}% ${50 + 50 * Math.sin((Math.PI / 180) * -segmentSize/2)}%, ${50 + 50 * Math.cos((Math.PI / 180) * segmentSize/2)}% ${50 + 50 * Math.sin((Math.PI / 180) * segmentSize/2)}%)`
      }}
    >
      <motion.div 
        className="w-full h-full relative"
        style={{ backgroundColor: color }}
        whileHover={{ brightness: 1.2 }}
      >
        <div 
          className="absolute left-1/2 text-center whitespace-nowrap"
          style={{ 
            top: '30%',
            width: '200px',
            marginLeft: '-100px',
            transform: `rotate(${90 - textRotation}deg)`,
            transformOrigin: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            backfaceVisibility: 'visible',
            WebkitBackfaceVisibility: 'visible'
          }}
        >
          <span className="text-white font-bold text-2xl">
            {person.name}
          </span>
        </div>
      </motion.div>
    </div>
  );
}