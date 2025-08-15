"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const personas = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    description: "The legendary entrepreneur and educator",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    description: "Founder & CEO @Teachyst",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
];

export function PersonaSelector({ onSelectPersona }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {personas.map((persona) => (
        <Card
          key={persona.id}
          className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md"
          onClick={() => onSelectPersona(persona.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {persona.name}
              </CardTitle>
              <Badge className={persona.color}>
                {persona.name.split(" ")[0]}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {persona.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full b-0 group-hover:bg-primary hover:bg-primary cursor-pointer group-hover:text-primary-foreground hover:text-primary-foreground transition-all bg-transparent"
              variant="outline"
            >
              Start Conversation
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
