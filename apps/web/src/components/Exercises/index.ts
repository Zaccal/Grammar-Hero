import { Exercises as Root } from './Exercises'
import { ExercisesAction } from './ExercisesAction'
import { ExercisesContent } from './ExercisesContent'
import { ExercisesHint } from './ExercisesHint'
import { ExercisesItem } from './ExercisesItem/ExercisesItem'
import { ExercisesProgress } from './ExercisesProgress'
import { ExercisesSlider } from './ExercisesSlider/ExercisesSlider'

export const Exercises = {
  Root,
  Progress: ExercisesProgress,
  Content: ExercisesContent,
  Item: ExercisesItem,
  Slider: ExercisesSlider,
  Action: ExercisesAction,
  Hint: ExercisesHint,
}
