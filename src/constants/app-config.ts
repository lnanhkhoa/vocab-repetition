enum Category {
  advancedVocabulary = 'advanced-vocabulary',
  phrasalVerbs = 'phrasal-verbs',
  idioms = 'idioms',
  businessEnglish = 'business-english',
  academicVocabulary = 'academic-vocabulary',
  toeflielts = 'toefl-ielts',
  grammarConcepts = 'grammar-concepts',
  commonMistakes = 'common-mistakes',
  descriptiveAdjectives = 'descriptive-adjectives'
}

const categoryLabels = {
  [Category.advancedVocabulary]: 'Advanced Vocabulary',
  [Category.phrasalVerbs]: 'Phrasal Verbs',
  [Category.idioms]: 'Idioms',
  [Category.businessEnglish]: 'Business English',
  [Category.academicVocabulary]: 'Academic Vocabulary',
  [Category.toeflielts]: 'TOEFL/IELTS',
  [Category.grammarConcepts]: 'Grammar Concepts',
  [Category.commonMistakes]: 'Common Mistakes',
  [Category.descriptiveAdjectives]: 'Descriptive Adjectives'
}

export const CATEGORIES = [
  { id: Category.advancedVocabulary, count: 5, color: 'bg-purple-500', description: 'Sophisticated words for fluent speakers' },
  { id: Category.phrasalVerbs, count: 5, color: 'bg-blue-500', description: 'Essential multi-word verbs' },
  { id: Category.idioms, count: 5, color: 'bg-green-500', description: 'Common English expressions' },
  { id: Category.businessEnglish, count: 5, color: 'bg-orange-500', description: 'Professional vocabulary' },
  { id: Category.academicVocabulary, count: 5, color: 'bg-red-500', description: 'University-level terms' },
  { id: Category.toeflielts, count: 5, color: 'bg-indigo-500', description: 'Test preparation words' },
  { id: Category.grammarConcepts, count: 5, color: 'bg-yellow-500', description: 'Important grammar rules' },
  { id: Category.commonMistakes, count: 5, color: 'bg-rose-500', description: 'Frequently confused words' }
].map(i => ({ ...i, label: categoryLabels[i.id] }))

export const CATEGORY_COLORS: Record<string, string> = {
  [Category.advancedVocabulary]: 'bg-purple-100 text-purple-800',
  [Category.phrasalVerbs]: 'bg-blue-100 text-blue-800',
  [Category.idioms]: 'bg-green-100 text-green-800',
  [Category.businessEnglish]: 'bg-orange-100 text-orange-800',
  [Category.academicVocabulary]: 'bg-red-100 text-red-800',
  [Category.toeflielts]: 'bg-indigo-100 text-indigo-800',
  [Category.grammarConcepts]: 'bg-yellow-100 text-yellow-800',
  [Category.commonMistakes]: 'bg-rose-100 text-rose-800',
  [Category.descriptiveAdjectives]: 'bg-teal-100 text-teal-800'
}
