"use client";

import { motion, animate } from "framer-motion";
import { useState } from "react";
import { Person } from "../types";
import WheelSegment from "./WheelSegment";
import { AlertCircle } from "lucide-react";

interface WheelProps {
  people: Person[];
  onSpinComplete: (winner: Person) => void;
  isSpinning: boolean;
  setIsSpinning: (value: boolean) => void;
}

export default function Wheel({ people, onSpinComplete, isSpinning, setIsSpinning }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const activePeople = people.filter(p => !p.isPaused);

  const spinWheel = () => {
    if (isSpinning || activePeople.length < 2) return;

    setIsSpinning(true);
    const spins = 5;
    const extraDegrees = Math.random() * 360;
    const totalDegrees = spins * 360 + extraDegrees;

    animate(rotation, rotation + totalDegrees, {
      duration: 5,
      ease: [0.2, 0.8, 0.2, 0.8],
      onComplete: () => {
        setIsSpinning(false);
        const normalizedDegrees = extraDegrees % 360;
        const segmentSize = 360 / activePeople.length;
        const winnerIndex = Math.floor(normalizedDegrees / segmentSize);
        onSpinComplete(activePeople[winnerIndex]);
      },
      onUpdate: (latest) => setRotation(latest),
    });
  };

  if (activePeople.length < 2) {
    return (
      <div className="w-[500px] h-[500px] rounded-full border-8 border-primary/20 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-16 h-16 text-primary/50 mx-auto mb-4" />
          <p className="text-xl font-semibold text-primary/70">
            Add at least 2 active participants to spin the wheel
          </p>
        </div>
      </div>
    );
  }

  const segmentSize = 360 / activePeople.length;

  return (
    <div className="relative w-[500px] h-[500px]">
      {/* Outer ring decoration */}
      <div className="absolute inset-0 rounded-full border-8 border-primary/20" />
      <div className="absolute inset-2 rounded-full border-4 border-primary/10" />
      
      {/* Spinning wheel */}
      <motion.div
        className="absolute w-full h-full"
        style={{ rotate: rotation }}
      >
        {activePeople.map((person, index) => (
          <WheelSegment
            key={person.id}
            person={person}
            index={index}
            totalSegments={activePeople.length}
            segmentSize={segmentSize}
          />
        ))}
      </motion.div>

      {/* Center button */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={spinWheel}
          disabled={isSpinning}
          className="bg-primary text-primary-foreground rounded-full w-24 h-24 flex items-center justify-center text-xl font-bold disabled:opacity-50 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          SPIN
        </motion.button>
      </div>

      {/* Pointer */}
      <div className="absolute top-1/2 right-0 w-8 h-12 bg-primary transform -translate-y-1/2 -translate-x-1/2 clip-pointer z-20" />
      
      {/* CSS for pointer shape */}
      <style jsx>{`
        .clip-pointer {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
      `}</style>
    </div>
  );
}