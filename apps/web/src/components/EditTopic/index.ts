import { EditTopic as Root } from './EditTopic'
import { EditTopicDescription } from './EditTopicDescription'
import { EditTopicDuration } from './EditTopicDuration'
import { EditTopicFormExercises } from './EditTopicFormExercises'
import { EditTopicFormExercisesCreateExercises } from './EditTopicFormExercisesCreateExercises'
import { EditTopicFormExercisesEmpty } from './EditTopicFormExercisesEmpty'
import { EditTopicFormExercisesItem } from './EditTopicFormExercisesItem/EditTopicFormExercisesItem'
import { EditTopicFormExercisesList } from './EditTopicFormExercisesList'
import {
  EditTopicFormMarkdownHint,
  EditTopicFormMarkdownHintLink,
} from './EditTopicFormMarkdownHint'
import { EditTopicImage } from './EditTopicImage'
import { EditTopicLevel } from './EditTopicLevel'
import { EditTopicMarkdownEditor } from './EditTopicMarkdownEditor'
import { EditTopicPublish } from './EditTopicPublish'
import { EditTopicShortDescription } from './EditTopicShortDescription'
import { EditTopicTitle } from './EditTopicTitle'

export const EditTopic = {
  Root,
  Image: EditTopicImage,
  Title: EditTopicTitle,
  ShortDescription: EditTopicShortDescription,
  Description: EditTopicDescription,
  Level: EditTopicLevel,
  Duration: EditTopicDuration,
  MarkdownEditor: EditTopicMarkdownEditor,
  Publish: EditTopicPublish,
  Exercises: EditTopicFormExercises,
  ExercisesList: EditTopicFormExercisesList,
  ExercisesItem: EditTopicFormExercisesItem,
  CreateExercises: EditTopicFormExercisesCreateExercises,
  ExercisesEmpty: EditTopicFormExercisesEmpty,
  MarkdownHint: EditTopicFormMarkdownHint,
  MarkdownHintLink: EditTopicFormMarkdownHintLink,
}
