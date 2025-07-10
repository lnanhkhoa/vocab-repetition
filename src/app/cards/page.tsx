"use client"

import { useState } from "react"
import { useFlashcards } from "@/hooks/use-flashcards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function CardsPage() {
  const { cards } = useFlashcards()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const categories = ["All", ...Array.from(new Set(cards.map((card) => card.category)))]
  const statuses = ["All", "New", "Learning", "Mastered"]

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.back.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || card.category === selectedCategory

    let matchesStatus = true
    if (selectedStatus === "New") matchesStatus = card.repetitions === 0
    else if (selectedStatus === "Learning")
      matchesStatus = card.repetitions > 0 && card.repetitions < 3
    else if (selectedStatus === "Mastered") matchesStatus = card.repetitions >= 3

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (card: any) => {
    if (card.repetitions === 0) return <Badge variant="secondary">New</Badge>
    if (card.repetitions < 3) return <Badge variant="outline">Learning</Badge>
    return <Badge className="bg-green-100 text-green-800">Mastered</Badge>
  }

  const getDifficultyColor = (easeFactor: number) => {
    if (easeFactor >= 2.5) return "text-green-600"
    if (easeFactor >= 2.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Card Library</h1>
          <p className="text-muted-foreground">Manage your vocabulary cards</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCards.length} of {cards.length} cards
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((card) => (
          <Card key={card.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{card.front}</CardTitle>
                {getStatusBadge(card)}
              </div>
              <Badge variant="outline" className="w-fit text-xs">
                {card.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{card.back}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Reviews:
                  </span>
                  <span className="font-medium">{card.repetitions}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Interval:
                  </span>
                  <span className="font-medium">{card.interval} days</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Difficulty:
                  </span>
                  <span className={`font-medium ${getDifficultyColor(card.easeFactor)}`}>
                    {card.easeFactor.toFixed(1)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Next Review:</span>
                  <span className="font-medium">
                    {new Date(card.nextReview).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cards found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
