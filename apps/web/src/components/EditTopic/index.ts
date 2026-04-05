import { EditTopic as Root } from './EditTopic'
import { EditTopicDescription } from './EditTopicDescription'
import { EditTopicDuration } from './EditTopicDuration'
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
}
