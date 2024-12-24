"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { Person } from "../types";
import ImageUpload from "./ImageUpload";

interface AddPersonFormProps {
  onAdd: (person: Omit<Person, "id" | "isPaused">) => void;
}

export default function AddPersonForm({ onAdd }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && image && bio) {
      onAdd({ name, image, bio });
      setName("");
      setImage("");
      setBio("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <ImageUpload onImageSelect={setImage} />
      </div>
      <div>
        <Textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        <UserPlus className="mr-2 h-4 w-4" />
        Add Person
      </Button>
    </form>
  );
}