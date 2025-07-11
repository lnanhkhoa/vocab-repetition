export enum Category {
  advancedVocabulary = 'advanced-vocabulary',
  phrasalVerbs = 'phrasal-verbs',
  idioms = 'idioms',
  businessEnglish = 'business-english',
  academicVocabulary = 'academic-vocabulary'
}

const categoryLabels = {
  [Category.advancedVocabulary]: 'Advanced Vocabulary',
  [Category.phrasalVerbs]: 'Phrasal Verbs',
  [Category.idioms]: 'Idioms',
  [Category.businessEnglish]: 'Business English',
  [Category.academicVocabulary]: 'Academic Vocabulary'
}

export const CATEGORIES = [
  { id: Category.advancedVocabulary, count: 5, color: 'bg-purple-500', description: 'Sophisticated words for fluent speakers' },
  { id: Category.phrasalVerbs, count: 5, color: 'bg-blue-500', description: 'Essential multi-word verbs' },
  { id: Category.idioms, count: 5, color: 'bg-green-500', description: 'Common English expressions' },
  { id: Category.businessEnglish, count: 5, color: 'bg-orange-500', description: 'Professional vocabulary' },
  { id: Category.academicVocabulary, count: 5, color: 'bg-red-500', description: 'University-level terms' }
].map(i => ({ ...i, label: categoryLabels[i.id] }))

export const CATEGORY_COLORS: Record<string, string> = {
  [Category.advancedVocabulary]: 'bg-purple-100 text-purple-800',
  [Category.phrasalVerbs]: 'bg-blue-100 text-blue-800',
  [Category.idioms]: 'bg-green-100 text-green-800',
  [Category.businessEnglish]: 'bg-orange-100 text-orange-800',
  [Category.academicVocabulary]: 'bg-red-100 text-red-800'
}

export const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Beginner (A1-A2)' },
  { value: 'intermediate', label: 'Intermediate (B1-B2)' },
  { value: 'advanced', label: 'Advanced (C1-C2)' },
  { value: 'mixed', label: 'Mixed Levels' }
]

export const OPTION_SELECT_ALL = { value: 'all', label: 'All' }
