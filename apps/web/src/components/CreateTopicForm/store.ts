import { createStore } from '@/hooks/createStore'

interface FileUploadStore {
  file: File | null
}

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
