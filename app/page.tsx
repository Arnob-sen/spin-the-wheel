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
    // Move winner to top of the list
    const newPeople = [
      winner,
      ...people.filter(person => person.id !== winner.id)
    ];
    setPeople(newPeople);
    setWinner(winner);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">UFC SPINNING</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Add Player</h2>
              <AddPersonForm onAdd={handleAddPerson} />
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Player List</h2>
              <PersonList
                people={people}
                onRemove={handleRemovePerson}
                onTogglePause={handleTogglePause}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Wheel
              people={people}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
            />
          </div>
        </div>
      </div>
      <WinnerModal winner={winner} onClose={() => setWinner(null)} />
      <Toaster />
    </div>
  );
}