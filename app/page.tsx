"use client";

import { useState } from "react";
import { Person } from "./types";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";
import Wheel from "./components/Wheel";
import WinnerModal from "./components/WinnerModal";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Person | null>(null);

  const handleAddPerson = (newPerson: Omit<Person, "id" | "isPaused">) => {
    setPeople([
      ...people,
      { ...newPerson, id: Math.random().toString(), isPaused: false },
    ]);
  };

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
  };

  const handleTogglePause = (id: string) => {
    setPeople(
      people.map((p) =>
        p.id === id ? { ...p, isPaused: !p.isPaused } : p
      )
    );
  };

  const handleSpinComplete = (winner: Person) => {
    const newPeople = [
      winner,
      ...people.filter(person => person.id !== winner.id)
    ];
    setPeople(newPeople);
    setWinner(winner);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">UFC SPINNING</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Add Player</h2>
              <AddPersonForm onAdd={handleAddPerson} />
            </div>
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Player List</h2>
              <PersonList
                people={people}
                onRemove={handleRemovePerson}
                onTogglePause={handleTogglePause}
              />
            </div>
          </div>
          
          {/* Right Column - Wheel */}
          <div className="flex items-center justify-center order-1 lg:order-2 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            <div className="w-full max-w-[500px] aspect-square">
              <Wheel
                people={people}
                onSpinComplete={handleSpinComplete}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
              />
            </div>
          </div>
        </div>
      </div>
      <WinnerModal winner={winner} onClose={() => setWinner(null)} />
      <Toaster />
    </div>
  );
}