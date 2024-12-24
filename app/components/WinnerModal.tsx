"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Person } from "../types";
import { Trophy, Star } from "lucide-react";

interface WinnerModalProps {
  winner: Person | null;
  onClose: () => void;
}

export default function WinnerModal({ winner, onClose }: WinnerModalProps) {
  if (!winner) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-card p-4 sm:p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-auto"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[...Array(8)].map((_, i) => (
                  <Star
                    key={i}
                    className="absolute text-yellow-500"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-2rem) scale(${window.innerWidth < 640 ? 0.8 : 1})`,
                    }}
                    size={20}
                  />
                ))}
              </motion.div>
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-4" />
            </div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
            >
              We Have a GOAT!
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative inline-block"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-primary mx-auto mb-4">
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-4"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{winner.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{winner.bio}</p>
            </motion.div>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-6 sm:mt-8 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}