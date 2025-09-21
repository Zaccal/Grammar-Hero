import { createStore } from '@/hooks/createStore'

interface FileUploadStore {
  file: File | null
}

export const fileUploadStore = createStore<FileUploadStore>({
  file: null,
})
