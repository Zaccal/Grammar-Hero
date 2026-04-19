export const TOPICS_SELECT = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  shortDescription: true,
  description: true,
  content: true,
  level: true,
  durationMin: true,
  durationMax: true,
  user: true,
  image: true,
  exercises: {
    select: {
      id: true,
      question: true,
      explanation: true,
      isMultipleChoice: true,
      hint: true,
      answers: {
        select: {
          id: true,
          text: true,
          isCorrect: true,
        },
      },
    },
  },
  _count: true,
} as const
