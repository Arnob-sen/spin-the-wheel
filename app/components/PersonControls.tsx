"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface PersonControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onRemove: () => void;
}

export default function PersonControls({ isPaused, onTogglePause, onRemove }: PersonControlsProps) {
  return (
    <div className="flex space-x-2">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePause}
          className={`${
            isPaused ? "text-yellow-500" : "text-green-500"
          } hover:bg-secondary/80`}
        >
          {isPaused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:bg-secondary/80"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}