enum Category {
  AdvancedVocabulary = 'Advanced Vocabulary',
  PhrasalVerbs = 'Phrasal Verbs',
  Idioms = 'Idioms',
  BusinessEnglish = 'Business English',
  AcademicVocabulary = 'Academic Vocabulary',
  TOEFLIELTS = 'TOEFL/IELTS',
  GrammarConcepts = 'Grammar Concepts',
  CommonMistakes = 'Common Mistakes',
  DescriptiveAdjectives = 'Descriptive Adjectives'
}

export const CATEGORIES = [
  { name: Category.AdvancedVocabulary, count: 5, color: 'bg-purple-500', description: 'Sophisticated words for fluent speakers' },
  { name: Category.PhrasalVerbs, count: 5, color: 'bg-blue-500', description: 'Essential multi-word verbs' },
  { name: Category.Idioms, count: 5, color: 'bg-green-500', description: 'Common English expressions' },
  { name: Category.BusinessEnglish, count: 5, color: 'bg-orange-500', description: 'Professional vocabulary' },
  { name: Category.AcademicVocabulary, count: 5, color: 'bg-red-500', description: 'University-level terms' },
  { name: Category.TOEFLIELTS, count: 5, color: 'bg-indigo-500', description: 'Test preparation words' },
  { name: Category.GrammarConcepts, count: 5, color: 'bg-yellow-500', description: 'Important grammar rules' },
  { name: Category.CommonMistakes, count: 5, color: 'bg-rose-500', description: 'Frequently confused words' }
]

export const CATEGORY_COLORS: Record<string, string> = {
  [Category.AdvancedVocabulary]: 'bg-purple-100 text-purple-800',
  [Category.PhrasalVerbs]: 'bg-blue-100 text-blue-800',
  [Category.Idioms]: 'bg-green-100 text-green-800',
  [Category.BusinessEnglish]: 'bg-orange-100 text-orange-800',
  [Category.AcademicVocabulary]: 'bg-red-100 text-red-800',
  [Category.TOEFLIELTS]: 'bg-indigo-100 text-indigo-800',
  [Category.GrammarConcepts]: 'bg-yellow-100 text-yellow-800',
  [Category.CommonMistakes]: 'bg-rose-100 text-rose-800',
  [Category.DescriptiveAdjectives]: 'bg-teal-100 text-teal-800'
}
