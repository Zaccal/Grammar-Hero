import type { UseEmblaCarouselType } from 'embla-carousel-react'
import { createContext, use } from 'react'

export const ExercisesSliderContext =
  createContext<UseEmblaCarouselType | null>(null)

export function useExercisesSliderContext() {
  const context = use(ExercisesSliderContext)
  if (!context) {
    throw new Error(
      'useExercisesSlider must be used within an ExercisesSliderProvider'
    )
  }
  return context
}
