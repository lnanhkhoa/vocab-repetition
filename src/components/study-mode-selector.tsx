"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Zap, Target, Clock } from "lucide-react"

interface StudyModeSelectorProps {
  onSelectMode: (mode: string) => void
  dueCards: number
}

export function StudyModeSelector({ onSelectMode, dueCards }: StudyModeSelectorProps) {
  const studyModes = [
    {
      id: "review",
      title: "Review Due Cards",
      description: `Study ${dueCards} cards that are due for review`,
      icon: BookOpen,
      color: "bg-blue-500",
      disabled: dueCards === 0,
    },
    {
      id: "quick",
      title: "Quick Session",
      description: "Study 10 random cards for a quick practice",
      icon: Zap,
      color: "bg-green-500",
      disabled: false,
    },
    {
      id: "focused",
      title: "Focused Practice",
      description: "Study cards you've marked as difficult",
      icon: Target,
      color: "bg-orange-500",
      disabled: false,
    },
    {
      id: "timed",
      title: "Timed Challenge",
      description: "5-minute speed review session",
      icon: Clock,
      color: "bg-purple-500",
      disabled: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Study Mode</h1>
        <p className="text-muted-foreground">Select how you'd like to study today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {studyModes.map((mode) => {
          const Icon = mode.icon
          return (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                mode.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
              onClick={() => !mode.disabled && onSelectMode(mode.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${mode.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span>{mode.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{mode.description}</p>
                <Button
                  className="w-full"
                  disabled={mode.disabled}
                  variant={mode.id === "review" ? "default" : "outline"}
                >
                  {mode.disabled ? "No cards available" : "Start Studying"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
