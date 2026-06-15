import type { FileUploadActions, FileUploadState } from '@/hooks'

export interface FileUploadProps {
  className?: string
  maxSizeMb?: number
  options: [FileUploadState, FileUploadActions]
}

export interface FileUploadStore {
  file: File | null
}

export interface FileUploadMutation {
  file: File
  type: 'avatar' | 'preview'
  topicId?: string
}
