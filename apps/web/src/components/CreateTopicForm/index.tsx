import type { ButtonProps } from '../ui/button'
import type { CreateTopicFormMarkdownEditorProps } from './CreateTopicFormMarkdownEditor'
import { lazy, Suspense } from 'react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
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
import {
  CreateTopicFormMarkdownHint,
  CreateTopicFormMarkdownHintLink,
} from './CreateTopicFormMarkdownHint'
import { CreateTopicFormShortDescription } from './CreateTopicFormShortDescription'
import { CreateTopicFormTitle } from './CreateTopicFormTitle'
import { CreateTopicFormPublishWrapper } from './CreateTopicFormPublishWrapper'
import { CreateTopicFormMarkdownEditorWrapper } from './CreateTopicFormMarkdownEditorWrapper'

export const CreateTopicForm = {
  Root,
  Context: CreateTopicFormContext,
  MarkdownEditor: CreateTopicFormMarkdownEditorWrapper,
  MarkdownHint: CreateTopicFormMarkdownHint,
  MarkdownHintLink: CreateTopicFormMarkdownHintLink,
  FileUpload: CreateTopicFormFileUpload,
  Title: CreateTopicFormTitle,
  ShortDescription: CreateTopicFormShortDescription,
  Description: CreateTopicFormDescription,
  Level: CreateTopicFormLevel,
  Duration: CreateTopicFormDuration,
  Publish: CreateTopicFormPublishWrapper,
  Exercises: CreateTopicFormExercises,
  ExercisesList: CreateTopicFormExercisesList,
  ExercisesItem: CreateTopicFormExercisesItem,
  CreateExercises: CreateTopicFormExercisesCreateExercises,
  ExercisesEmpty: CreateTopicFormExercisesEmpty,
}
