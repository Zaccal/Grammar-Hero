import { CreateTopicForm as Root } from './CreateTopicForm'
import { CreateTopicFormContext } from './CreateTopicFormContext'
import { CreateTopicFormDescription } from './CreateTopicFormDescription'
import { CreateTopicFormDuration } from './CreateTopicFormDuration'
import { CreateTopicFormExercises } from './CreateTopicFormExercises'
import { CreateTopicFormExercisesCreateExercises } from './CreateTopicFormExercisesCreateExercises'
import { CreateTopicFormExercisesEmpty } from './CreateTopicFormExercisesEmpty'
import { CreateTopicFormExercisesItem } from './CreateTopicFormExercisesItem/CreateTopicFormExercisesItem'
import { CreateTopicFormExercisesList } from './CreateTopicFormExercisesList'
import { CreateTopicFormFileUpload } from './CreateTopicFormFileUpload'
import { CreateTopicFormLevel } from './CreateTopicFormLevel'
import { CreateTopicFormMarkdownEditor } from './CreateTopicFormMarkdownEditor'
import {
  CreateTopicFormMarkdownHint,
  CreateTopicFormMarkdownHintLink,
} from './CreateTopicFormMarkdownHint'
import { CreateTopicFormPublish } from './CreateTopicFormPublish'
import { CreateTopicFormShortDescription } from './CreateTopicFormShortDescription'
import { CreateTopicFormTitle } from './CreateTopicFormTitle'

export const CreateTopicForm = {
  Root,
  Context: CreateTopicFormContext,
  MarkdownEditor: CreateTopicFormMarkdownEditor,
  MarkdownHint: CreateTopicFormMarkdownHint,
  MarkdownHintLink: CreateTopicFormMarkdownHintLink,
  FileUpload: CreateTopicFormFileUpload,
  Title: CreateTopicFormTitle,
  ShortDescription: CreateTopicFormShortDescription,
  Description: CreateTopicFormDescription,
  Level: CreateTopicFormLevel,
  Duration: CreateTopicFormDuration,
  Publish: CreateTopicFormPublish,
  Exercises: CreateTopicFormExercises,
  ExercisesList: CreateTopicFormExercisesList,
  ExercisesItem: CreateTopicFormExercisesItem,
  CreateExercises: CreateTopicFormExercisesCreateExercises,
  ExercisesEmpty: CreateTopicFormExercisesEmpty,
}
