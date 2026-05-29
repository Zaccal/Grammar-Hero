import type { ButtonProps } from '../ui/button'
import type { EditTopicMarkdownEditorProps } from './EditTopicMarkdownEditor'
import { lazy, Suspense } from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
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
import { EditTopicShortDescription } from './EditTopicShortDescription'
import { EditTopicTitle } from './EditTopicTitle'
import '@mdxeditor/editor/style.css'
import EditTopicPublishWrapper from './EditTopicPublishWrapper'
import EditTopicMarkdownEditorWrapper from './EditTopicMarkdownEditorWrapper'

export const EditTopic = {
  Root,
  Image: EditTopicImage,
  Title: EditTopicTitle,
  ShortDescription: EditTopicShortDescription,
  Description: EditTopicDescription,
  Level: EditTopicLevel,
  Duration: EditTopicDuration,
  MarkdownEditor: EditTopicMarkdownEditorWrapper,
  Publish: EditTopicPublishWrapper,
  Exercises: EditTopicFormExercises,
  ExercisesList: EditTopicFormExercisesList,
  ExercisesItem: EditTopicFormExercisesItem,
  CreateExercises: EditTopicFormExercisesCreateExercises,
  ExercisesEmpty: EditTopicFormExercisesEmpty,
  MarkdownHint: EditTopicFormMarkdownHint,
  MarkdownHintLink: EditTopicFormMarkdownHintLink,
}
