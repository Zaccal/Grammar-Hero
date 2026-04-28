import type { Topic } from '@server/routers/topics/topics.types'
import useEmblaCarousel from 'embla-carousel-react'
import { ExercisesContext } from './ExercisesContext'
import { ExercisesSliderContext } from './ExercisesSlider/ExercisesSliderContext'

interface ExercisesProps {
  children?: React.ReactNode | React.ReactNode[]
  topic: Topic
  className?: string
}

export function Exercises({ children, topic, className }: ExercisesProps) {
  const embla = useEmblaCarousel({
    watchDrag: false,
    loop: false,
  })

  return (
    <ExercisesSliderContext.Provider value={embla}>
      <ExercisesContext.Provider initialValue={topic}>
        <section className={className}>{children}</section>
      </ExercisesContext.Provider>
    </ExercisesSliderContext.Provider>
  )
}
