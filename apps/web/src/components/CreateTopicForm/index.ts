import { CreateTopicForm as Root } from './CreateTopicForm'
import { createTopicFormContext } from './CreateTopicFormContext'
import { CreateTopicFormDescription } from './CreateTopicFormDescription'
import { CreateTopicFormDuration } from './CreateTopicFormDuration'
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
  Context: createTopicFormContext,
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
}
