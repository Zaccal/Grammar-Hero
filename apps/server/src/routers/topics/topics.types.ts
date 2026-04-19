import type { inferRouterOutputs } from '@trpc/server'
import type { Prisma } from 'prisma/generated/client'
import type { AppRouter } from '..'
import type { TOPICS_SELECT } from './constants'

export type Topic = inferRouterOutputs<AppRouter>['topics']['getById']
export type Topics = inferRouterOutputs<AppRouter>['topics']['getAll']

export type TopicPayload = Prisma.TopicsGetPayload<{
  select: typeof TOPICS_SELECT
}>

export type Exercise = Prisma.ExerciseGetPayload<{
  select: {
    id: true
    question: true
    explanation: true
    isMultipleChoice: true
    hint: true
    answers: {
      select: {
        id: true
        text: true
        isCorrect: true
      }
    }
  }
}>
