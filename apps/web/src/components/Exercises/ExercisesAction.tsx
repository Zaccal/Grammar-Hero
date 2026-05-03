import type { ButtonProps } from '../ui/button'
import { useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ExercisesContext } from './ExercisesContext'
import { useExercisesSliderContext } from './ExercisesSlider/ExercisesSliderContext'
import { ExercisesStore } from './store'

interface ExercisesActionProps extends ButtonProps {
  action: 'next' | 'prev'
}

export function ExercisesAction({ action, ...props }: ExercisesActionProps) {
  const [_, emblaApi] = useExercisesSliderContext()
  const [isDisabledNext, setIsDisabledNext] = useState(false)
  const [isDisabledPrev, setIsDisabledPrev] = useState(true)
  const selectedAnswers = ExercisesStore.use(state => state.selectedAnswers)
  const topicId = ExercisesContext.useSelect(state => state.id)
  const exercises = ExercisesContext.useSelect(state => state.exercises)
  const router = useRouter()

  function updateButtonStates() {
    if (!emblaApi) {
      return
    }
    setIsDisabledNext(!emblaApi.canScrollNext())
    setIsDisabledPrev(!emblaApi.canScrollPrev())
  }

  useEffect(() => {
    emblaApi?.on('select', updateButtonStates)
    return () => {
      emblaApi?.off('select', updateButtonStates)
    }
  }, [emblaApi])

  function onFinish() {
    if (selectedAnswers.length !== exercises.length) {
      toast.error('You must answer all questions before finishing')
      return
    }

    router.navigate({
      to: '/topic/exercises/result',
      state: {
        quizResults: {
          selectedAnswers,
          topicId,
        },
      },
    })

    ExercisesStore.set({
      currentExerciseState: 0,
      selectedAnswers: [],
    })
  }

  function handleClick() {
    if (!emblaApi) {
      return
    }

    if (action === 'next') {
      if (isDisabledNext) {
        onFinish()
        return
      }
      emblaApi.scrollNext()
    }
 else {
      emblaApi.scrollPrev()
    }
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={action === 'next' ? false : isDisabledPrev}
    >
      {action === 'next'
        ? isDisabledNext
          ? 'Finish'
          : props.children
        : props.children}
    </Button>
  )
}
