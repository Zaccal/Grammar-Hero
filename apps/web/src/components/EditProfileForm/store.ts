import type { FileUploadStore } from '@/types/fileupload.types'
import { createStore } from '@/hooks/createStore'

interface FileUploadStoreExtended extends FileUploadStore {
  isDeleted: boolean
}

export const fileUploadStore = createStore<FileUploadStoreExtended>({
  file: null,
  isDeleted: false,
})
