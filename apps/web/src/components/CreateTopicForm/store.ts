import type { FileUploadStore } from '@/types/fileupload.types'
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
