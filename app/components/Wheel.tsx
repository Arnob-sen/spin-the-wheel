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
      <div className="w-full h-full rounded-full border-8 border-primary/20 flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-primary/50 mx-auto mb-4" />
          <p className="text-lg sm:text-xl font-semibold text-primary/70 max-w-[250px] sm:max-w-none">
            Add at least 2 active participants to spin the wheel
          </p>
        </div>
      </div>
    );
  }

  const segmentSize = 360 / activePeople.length;

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-full border-8 border-primary/20" />
      <div className="absolute inset-2 rounded-full border-4 border-primary/10" />
      
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

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={spinWheel}
          disabled={isSpinning}
          className="bg-primary text-primary-foreground rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center text-base sm:text-xl font-bold disabled:opacity-50 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          SPIN
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-0 w-6 sm:w-8 h-8 sm:h-12 bg-primary transform -translate-y-1/2 -translate-x-1/2 clip-pointer z-20" />
      
      <style jsx>{`
        .clip-pointer {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
      `}</style>
    </div>
  );
}