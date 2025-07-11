import type { Flashcard } from '@/types/flashcard'

export const comprehensiveCards: Omit<Flashcard, 'id' | 'easeFactor' | 'interval' | 'repetitions' | 'nextReview'>[] = [
  // Advanced Vocabulary
  {
    front: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy or beneficial way.',
    example: [
      'Finding that book was pure serendipity — it had exactly the information I needed.',
      'I ran into my old classmate at a café in Paris — it was pure serendipity.',
      'They met on a delayed flight and ended up getting married — a true story of serendipity.'
    ],
    category: 'Advanced Vocabulary'
  },
  {
    front: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
    example: [
      'Smartphones have become ubiquitous in modern society.',
      'Social media platforms are ubiquitous among teenagers today.',
      'The use of the internet is now ubiquitous in both work and leisure.'
    ],
    category: 'Advanced Vocabulary'
  },
  {
    front: 'Ephemeral',
    definition: 'Lasting for a very short time; transitory.',
    example: [
      'The beauty of cherry blossoms is ephemeral, lasting only a few weeks.',
      'Fame can be ephemeral, disappearing as quickly as it arrives.',
      'The rainbow was ephemeral, vanishing just minutes after the rain stopped.'
    ],
    category: 'Advanced Vocabulary'
  },
  {
    front: 'Quintessential',
    definition: 'Representing the most perfect example of a quality or class.',
    example: [
      'She is the quintessential professional—always prepared and courteous.',
      'Paris is the quintessential city of romance.',
      'His performance was the quintessential example of dedication and skill.'
    ],
    category: 'Advanced Vocabulary'
  },
  {
    front: 'Paradoxical',
    definition: 'Seemingly contradictory but actually revealing a deeper truth.',
    example: [
      "It's paradoxical that social media connects us yet makes us feel more isolated.",
      'The medicine had a paradoxical effect, making him feel more awake instead of sleepy.',
      'Her calm reaction in a crisis is paradoxical given her usual anxiety.'
    ],
    category: 'Advanced Vocabulary'
  },

  // Phrasal Verbs
  {
    front: 'Break down',
    definition: '1. To stop working (machine) 2. To analyze into parts 3. To lose emotional control.',
    example: [
      'The car broke down on the highway.',
      'Let\'s break down this problem step by step.',
      'She broke down in tears during the meeting.'
    ],
    category: 'Phrasal Verbs'
  },
  {
    front: 'Bring up',
    definition: '1. To raise or care for a child 2. To mention a topic.',
    example: [
      'She was brought up by her grandparents.',
      'Don\'t bring up politics at dinner.',
      'He brought up an interesting point during the discussion.'
    ],
    category: 'Phrasal Verbs'
  },
  {
    front: 'Come across',
    definition: '1. To find by chance 2. To seem or appear in a certain way.',
    example: [
      'I came across an old photo while cleaning.',
      'He comes across as very confident.',
      'I came across a great little café yesterday.'
    ],
    category: 'Phrasal Verbs'
  },
  {
    front: 'Put off',
    definition: '1. To postpone 2. To discourage someone from doing something.',
    example: [
      'We had to put off the meeting until next week.',
      'Don\'t let failure put you off trying again.',
      'The bad weather put us off our plans for a picnic.'
    ],
    category: 'Phrasal Verbs'
  },
  {
    front: 'Run into',
    definition: '1. To meet unexpectedly 2. To encounter a problem.',
    example: [
      'I ran into my old teacher at the store.',
      'We ran into some technical difficulties.',
      'You might run into traffic on your way to work.'
    ],
    category: 'Phrasal Verbs'
  },

  // Idioms
  {
    front: 'Break the ice',
    definition: 'To initiate conversation in a social setting; to make people feel more comfortable.',
    example: [
      'He told a joke to break the ice at the beginning of the presentation.',
      'Asking about the weather is a common way to break the ice.',
      'Games are often used to break the ice at team meetings.'
    ],
    category: 'Idioms'
  },
  {
    front: 'Hit the nail on the head',
    definition: 'To describe exactly what is causing a situation or problem.',
    example: [
      'You hit the nail on the head when you said the issue was poor communication.',
      'Her analysis of the problem really hit the nail on the head.',
      'When he suggested more training, he hit the nail on the head.'
    ],
    category: 'Idioms'
  },
  {
    front: 'Spill the beans',
    definition: 'To reveal a secret or disclose confidential information.',
    example: [
      'Don\'t spill the beans about the surprise party!',
      'She accidentally spilled the beans and told everyone the news.',
      'He promised not to spill the beans about the plan.'
    ],
    category: 'Idioms'
  },
  {
    front: 'Bite the bullet',
    definition: 'To face a difficult situation with courage; to do something unpleasant but necessary.',
    example: [
      'I need to bite the bullet and tell my boss about the mistake.',
      'She decided to bite the bullet and go to the dentist.',
      'Sometimes you just have to bite the bullet and accept change.'
    ],
    category: 'Idioms'
  },
  {
    front: 'Cut corners',
    definition: 'To do something in the easiest or cheapest way, often compromising quality.',
    example: [
      'The company cut corners on safety training to save money.',
      'If you cut corners when building a house, it might not be safe.',
      'Students sometimes cut corners on their assignments to finish quickly.'
    ],
    category: 'Idioms'
  },

  // Business English
  {
    front: 'Leverage',
    definition: 'To use something to maximum advantage; to use borrowed capital for investment.',
    example: [
      'We can leverage our existing customer base to launch the new product.',
      'She leveraged her connections to get the job done faster.',
      'The company leveraged technology to improve productivity.'
    ],
    category: 'Business English'
  },
  {
    front: 'Synergy',
    definition: 'The interaction of elements that when combined produce a total effect greater than the sum of individual parts.',
    example: [
      'The merger created synergy between the two companies\' technologies.',
      'There was great synergy among the project team members.',
      'Good synergy between departments leads to better results.'
    ],
    category: 'Business English'
  },
  {
    front: 'Stakeholder',
    definition: 'A person or group that has an investment, share, or interest in something.',
    example: [
      'We need to consider all stakeholders before making this decision.',
      'Every stakeholder attended the annual meeting.',
      'The company aims to satisfy all its stakeholders.'
    ],
    category: 'Business English'
  },
  {
    front: 'Benchmark',
    definition: 'A standard or point of reference against which things may be compared.',
    example: [
      'Our customer service response time is the benchmark for the industry.',
      'This company sets a benchmark for quality.',
      'We use last year\'s sales as a benchmark for this year\'s performance.'
    ],
    category: 'Business English'
  },
  {
    front: 'Scalable',
    definition: 'Able to be changed in size or scale; capable of being easily expanded.',
    example: [
      'We need a scalable solution that can grow with our business.',
      'Cloud computing offers scalable resources for companies.',
      'The system is scalable and can handle increased demand.'
    ],
    category: 'Business English'
  },

  // Academic Vocabulary
  {
    front: 'Hypothesis',
    definition: 'A proposed explanation for a phenomenon, used as a starting point for investigation.',
    example: [
      'The scientist\'s hypothesis was that increased temperature would accelerate the reaction.',
      'We tested the hypothesis using several experiments.',
      'Her hypothesis was later proven correct by the data.'
    ],
    category: 'Academic Vocabulary'
  },
  {
    front: 'Methodology',
    definition: 'A system of methods used in a particular area of study or activity.',
    example: [
      'The research methodology included both quantitative and qualitative analysis.',
      'We need to update our methodology for this new project.',
      'Their methodology was praised for its thoroughness.'
    ],
    category: 'Academic Vocabulary'
  },
  {
    front: 'Empirical',
    definition: 'Based on observation or experience rather than theory or pure logic.',
    example: [
      'The conclusion was supported by empirical evidence from multiple studies.',
      'Her findings are based on empirical data.',
      'Empirical research is essential in the scientific method.'
    ],
    category: 'Academic Vocabulary'
  },
  {
    front: 'Paradigm',
    definition: 'A typical example or pattern; a framework containing basic assumptions of a theory.',
    example: [
      'The discovery shifted the entire paradigm of how we understand genetics.',
      'The new software introduced a paradigm shift in the industry.',
      'She is considered a paradigm of leadership.'
    ],
    category: 'Academic Vocabulary'
  },
  {
    front: 'Correlation',
    definition: 'A mutual relationship between two or more things.',
    example: [
      'There\'s a strong correlation between education level and income.',
      'Researchers found a correlation between diet and health.',
      'Not all correlations imply causation.'
    ],
    category: 'Academic Vocabulary'
  },

  // TOEFL/IELTS Vocabulary
  {
    front: 'Substantial',
    definition: 'Of considerable importance, size, or worth; significant.',
    example: [
      'The company made substantial improvements to their customer service.',
      'He invested a substantial amount of money in the project.',
      'There was a substantial difference between the two proposals.'
    ],
    category: 'TOEFL/IELTS Vocabulary'
  },
  {
    front: 'Comprehensive',
    definition: 'Complete and including everything that is necessary; thorough.',
    example: [
      'The report provides a comprehensive analysis of market trends.',
      'She gave a comprehensive overview of the topic.',
      'Our course offers a comprehensive approach to language learning.'
    ],
    category: 'TOEFL/IELTS Vocabulary'
  },
  {
    front: 'Inevitable',
    definition: 'Certain to happen; unavoidable.',
    example: [
      'With the current trends, some job losses seem inevitable.',
      'Change is inevitable in every industry.',
      'It was inevitable that they would meet again.'
    ],
    category: 'TOEFL/IELTS Vocabulary'
  },
  {
    front: 'Predominant',
    definition: 'Present as the strongest or main element; most common.',
    example: [
      'English is the predominant language used in international business.',
      'The predominant color in the painting is blue.',
      'Agriculture is the predominant industry in this region.'
    ],
    category: 'TOEFL/IELTS Vocabulary'
  },
  {
    front: 'Versatile',
    definition: 'Able to adapt to many different functions or activities.',
    example: [
      'She\'s a versatile employee who can work in any department.',
      'This tool is versatile and can be used for many purposes.',
      'Versatile players are valuable to any sports team.'
    ],
    category: 'TOEFL/IELTS Vocabulary'
  },

  // Collocations
  {
    front: 'Make a decision',
    definition: 'To choose between alternatives; to decide.',
    example: [
      'We need to make a decision about the budget by Friday.',
      'It\'s important to make a decision quickly in emergencies.',
      'She found it hard to make a decision about her future.'
    ],
    category: 'Collocations'
  },
  {
    front: 'Take responsibility',
    definition: 'To accept that you are in charge of something or accountable for something.',
    example: [
      'The manager took responsibility for the project\'s failure.',
      'Parents must take responsibility for their children\'s education.',
      'He refused to take responsibility for the mistake.'
    ],
    category: 'Collocations'
  },
  {
    front: 'Pay attention',
    definition: 'To focus on or concentrate on something.',
    example: [
      'Please pay attention to the safety instructions.',
      'Children often struggle to pay attention in class.',
      'Pay attention to the details in this contract.'
    ],
    category: 'Collocations'
  },
  {
    front: 'Heavy traffic',
    definition: 'A lot of vehicles on the road causing slow movement.',
    example: [
      'I was late because of heavy traffic on the highway.',
      'Heavy traffic is common during rush hour.',
      'We got stuck in heavy traffic for over an hour.'
    ],
    category: 'Collocations'
  },
  {
    front: 'Strong coffee',
    definition: 'Coffee with a powerful, intense flavor.',
    example: [
      'I need strong coffee to wake up in the morning.',
      'He prefers strong coffee over tea.',
      'This café is famous for its strong coffee.'
    ],
    category: 'Collocations'
  },

  // Grammar Concepts
  {
    front: 'Present Perfect vs Simple Past',
    definition: 'Present Perfect: connects past to present, focuses on result. Simple Past: completed action at specific time.',
    example: [
      'I have lived here for 5 years. (present perfect)',
      'I lived there in 2010. (simple past)',
      'Have you ever visited Japan? (present perfect)'
    ],
    category: 'Grammar Concepts'
  },
  {
    front: 'Conditional Sentences Type 2',
    definition: 'Used for hypothetical/unreal situations in present. Structure: If + past simple, would + base verb.',
    example: [
      'If I won the lottery, I would travel the world.',
      'If she studied harder, she would pass the exam.',
      'If it rained, we would stay indoors.'
    ],
    category: 'Grammar Concepts'
  },
  {
    front: 'Passive Voice',
    definition: 'Used when the action is more important than who does it. Structure: be + past participle.',
    example: [
      'The report was written by the team. (passive)',
      'The cake was eaten before I arrived. (passive)',
      'The team wrote the report. (active)'
    ],
    category: 'Grammar Concepts'
  },
  {
    front: 'Reported Speech',
    definition: 'Used to tell what someone else said. Changes: present→past, will→would, can→could.',
    example: [
      'He said, "I am tired" becomes He said he was tired.',
      'She said, "I will call you" becomes She said she would call me.',
      'They said, "We can help" becomes They said they could help.'
    ],
    category: 'Grammar Concepts'
  },
  {
    front: 'Articles (a, an, the)',
    definition: 'A/An: indefinite, first mention. The: definite, specific/known. No article with general plurals.',
    example: [
      'I saw a dog. The dog was brown.',
      'No article: Dogs are loyal.',
      'She bought an apple and the apple was delicious.'
    ],
    category: 'Grammar Concepts'
  },

  // Common Mistakes
  {
    front: 'Affect vs Effect',
    definition: 'AFFECT = verb (to influence). EFFECT = noun (result). Memory trick: A for Action (affect), E for End result (effect).',
    example: [
      'The rain will affect our plans.',
      'The effect of rain was cancelled plans.',
      'How will this decision affect the outcome?'
    ],
    category: 'Common Mistakes'
  },
  {
    front: "Its vs It's",
    definition: "ITS = possessive (belonging to it). IT'S = contraction (it is/it has). Test: expand 'it's' to 'it is' - if it makes sense, use it's.",
    example: [
      'The dog wagged its tail.',
      "It's raining outside.",
      'The company changed its logo last year.'
    ],
    category: 'Common Mistakes'
  },
  {
    front: 'Then vs Than',
    definition: 'THEN = time sequence. THAN = comparison. Memory: theN = time, thaN = comparison.',
    example: [
      'First we ate, then we left.',
      'She is taller than me.',
      'If you finish your homework, then you can play.'
    ],
    category: 'Common Mistakes'
  },
  {
    front: "Your vs You're",
    definition: "YOUR = possessive (belonging to you). YOU'RE = contraction (you are). Test: expand 'you're' to 'you are' - if it makes sense, use you're.",
    example: [
      'Is this your book?',
      "You're very kind.",
      'Your car is parked outside.'
    ],
    category: 'Common Mistakes'
  },
  {
    front: 'Lose vs Loose',
    definition: "LOSE = verb (to misplace/not win). LOOSE = adjective (not tight). Memory: lose has one 'o' like you lose one thing.",
    example: [
      "Don't lose your keys.",
      'This shirt is too loose.',
      'If you lose the game, try again.'
    ],
    category: 'Common Mistakes'
  },

  // Descriptive Adjectives
  {
    front: 'Meticulous',
    definition: 'Showing great attention to detail; very careful and precise.',
    example: [
      'She\'s meticulous about keeping records—every detail is documented perfectly.',
      'His work is always meticulous and thorough.',
      'You need to be meticulous when proofreading important documents.'
    ],
    category: 'Descriptive Adjectives'
  },
  {
    front: 'Resilient',
    definition: 'Able to withstand or recover quickly from difficult conditions.',
    example: [
      'Despite facing many challenges, she remained resilient and never gave up.',
      'Children are often more resilient than adults realize.',
      'The resilient material returned to its original shape after being bent.'
    ],
    category: 'Descriptive Adjectives'
  },
  {
    front: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing.',
    example: [
      'His eloquent speech moved the entire audience to tears.',
      'She gave an eloquent description of her experiences.',
      'He is known for his eloquent writing style.'
    ],
    category: 'Descriptive Adjectives'
  },
  {
    front: 'Pragmatic',
    definition: 'Dealing with things sensibly and realistically.',
    example: [
      'We need a pragmatic approach to solve this budget problem.',
      'Her pragmatic attitude helped the team succeed.',
      'He offered a pragmatic solution to the issue.'
    ],
    category: 'Descriptive Adjectives'
  },
  {
    front: 'Tenacious',
    definition: 'Holding firmly to something; persistent and determined.',
    example: [
      'Her tenacious attitude helped her overcome every obstacle.',
      'He is tenacious in pursuing his goals.',
      'The tenacious weeds were difficult to remove.'
    ],
    category: 'Descriptive Adjectives'
  }
]
