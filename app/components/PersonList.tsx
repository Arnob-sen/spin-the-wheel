"use client";

import { Person } from "../types";
import PersonControls from "./PersonControls";
import { motion } from "framer-motion";

interface PersonListProps {
  people: Person[];
  onRemove: (id: string) => void;
  onTogglePause: (id: string) => void;
}

export default function PersonList({ people, onRemove, onTogglePause }: PersonListProps) {
  return (
    <div className="space-y-4">
      {people.map((person, index) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center space-x-4 p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors ${
            person.isPaused ? "opacity-50" : ""
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{person.bio}</p>
          </div>
          <PersonControls
            isPaused={person.isPaused}
            onTogglePause={() => onTogglePause(person.id)}
            onRemove={() => onRemove(person.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}