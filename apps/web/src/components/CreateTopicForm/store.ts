import type { FileUploadStore } from '@/types/fileupload.file'
import { createStore } from '@/hooks/createStore'

export const fileUploadStore = createStore<FileUploadStore>({
  file: null,
})

interface AlertDialogCreateTopicStore {
  open: boolean
}

export const alertDialogCreateTopicStore =
  createStore<AlertDialogCreateTopicStore>({
    open: false,
  })
