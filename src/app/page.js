"use client";

import { Card } from "@/components/ui/card";
import { ChatInterface } from "@/components/chat-interface";
import { PersonaSelector } from "@/components/persona-selector";
import { useState } from "react";

export default function Home() {
  const [selectedPersona, setSelectedPersona] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            GenAI Persona Chai Chat
          </h1>
          <p className="text-muted-foreground text-lg">
            Chat with different Personas that embody different personalities and characters
          </p>
        </div>

        {!selectedPersona ? (
          <PersonaSelector onSelectPersona={setSelectedPersona} />
        ) : (
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <ChatInterface
              persona={selectedPersona}
              onChangePersona={() => setSelectedPersona("")}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
