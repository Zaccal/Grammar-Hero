import { CreateTopicFormMarkdownEditor } from './CreateTopicFormMarkdownEditor'
import { CreateTopicFormMarkdownHint } from './CreateTopicFormMarkdownHint'
import { CreateTopicFormMarkdownHintLink } from './CreateTopicFormMarkdownHint'
import {
  CreateTopicForm as Root,
  createTopicFormContext,
} from './CreateTopicForm'
import { CreateTopicFormFileUpload } from './CreateTopicFormFileUpload'
import { CreateTopicFormTitle } from './CreateTopicFormTitle'
import { CreateTopicFormShortDescription } from './CreateTopicFormShortDescription'
import { CreateTopicFormDescription } from './CreateTopicFormDescription'
import { CreateTopicFormLevel } from './CreateTopicFormLevel'
import { CreateTopicFormDuration } from './CreateTopicFormDuration'

export const CreateTopicForm = {
  Root: Root,
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
}
