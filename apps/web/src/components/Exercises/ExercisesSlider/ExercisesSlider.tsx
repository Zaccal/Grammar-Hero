import { useDidUpdate } from '@/hooks'
import { ExercisesContext } from '../ExercisesContext'
import { useExercisesSliderContext } from './ExercisesSliderContext'
import type { ReactNode } from 'react'
import { ExercisesStore } from '../store'

interface ExercisesSliderProps {
  children: (exercisesIndex: number) => ReactNode
}

export function ExercisesSlider({ children }: ExercisesSliderProps) {
  const [emblaRef, emblaApi] = useExercisesSliderContext()
  const exercises = ExercisesContext.useSelect(state => state.exercises)

  useDidUpdate(() => {
    if (!emblaApi) return

    ExercisesStore.set(state => ({
      ...state,
      currentExerciseState: emblaApi.selectedScrollSnap(),
    }))
  }, [emblaApi?.selectedScrollSnap, emblaRef])

  return (
    <div className="embla mb-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container gap-8">
          {exercises.map((_, index) => (
            <div className="embla__slide" key={index}>
              {children(index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
