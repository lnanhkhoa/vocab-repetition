import type { Flashcard } from "@/types/flashcard"

export const sampleCards: Omit<
  Flashcard,
  "id" | "easeFactor" | "interval" | "repetitions" | "nextReview"
>[] = [
  {
    front: "Serendipity",
    back: "The occurrence of events by chance in a happy or beneficial way",
    category: "Advanced Vocabulary",
  },
  {
    front: "Ubiquitous",
    back: "Present, appearing, or found everywhere",
    category: "Advanced Vocabulary",
  },
  {
    front: "Ephemeral",
    back: "Lasting for a very short time",
    category: "Advanced Vocabulary",
  },
  {
    front: "Procrastinate",
    back: "To delay or postpone action; put off doing something",
    category: "Common Verbs",
  },
  {
    front: "Meticulous",
    back: "Showing great attention to detail; very careful and precise",
    category: "Descriptive Adjectives",
  },
  {
    front: "Ambiguous",
    back: "Open to more than one interpretation; having a double meaning",
    category: "Advanced Vocabulary",
  },
  {
    front: "Resilient",
    back: "Able to withstand or recover quickly from difficult conditions",
    category: "Descriptive Adjectives",
  },
  {
    front: "Eloquent",
    back: "Fluent or persuasive in speaking or writing",
    category: "Communication",
  },
  {
    front: "Perseverance",
    back: "Persistence in doing something despite difficulty or delay in achieving success",
    category: "Character Traits",
  },
  {
    front: "Contemplate",
    back: "To think about something deeply and thoroughly",
    category: "Common Verbs",
  },
  {
    front: "Inevitable",
    back: "Certain to happen; unavoidable",
    category: "Advanced Vocabulary",
  },
  {
    front: "Articulate",
    back: "Having or showing the ability to speak fluently and coherently",
    category: "Communication",
  },
  {
    front: "Diligent",
    back: "Having or showing care and conscientiousness in one's work or duties",
    category: "Character Traits",
  },
  {
    front: "Scrutinize",
    back: "To examine or inspect closely and thoroughly",
    category: "Common Verbs",
  },
  {
    front: "Pragmatic",
    back: "Dealing with things sensibly and realistically",
    category: "Descriptive Adjectives",
  },
  {
    front: "Benevolent",
    back: "Well-meaning and kindly; charitable",
    category: "Character Traits",
  },
  {
    front: "Synthesize",
    back: "To combine elements to form a connected whole",
    category: "Academic Vocabulary",
  },
  {
    front: "Paradox",
    back: "A seemingly contradictory statement that may nonetheless be true",
    category: "Academic Vocabulary",
  },
  {
    front: "Advocate",
    back: "To publicly recommend or support; a person who supports a cause",
    category: "Academic Vocabulary",
  },
  {
    front: "Comprehensive",
    back: "Complete and including everything that is necessary",
    category: "Academic Vocabulary",
  },
]
