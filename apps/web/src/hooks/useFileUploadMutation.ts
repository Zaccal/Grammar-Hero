import type { UseMutationOptions } from '@tanstack/react-query'
import type { FileUploadMutation } from '@/types/fileupload.types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const USE_FILE_UPLOAD_MUTATION_KEY = 'use-file-upload-mutation'

export function useFileUploadMutation(options?: UseMutationOptions) {
  return useMutation({
    mutationKey: [USE_FILE_UPLOAD_MUTATION_KEY],
    mutationFn: async (data: FileUploadMutation | File) => {
      const formData = new FormData()
      if (data instanceof File) {
        formData.append('file', data)
        formData.append('type', 'avatar')
      }
 else {
        formData.append('file', data.file)
        formData.append('type', data.type)
        if (data.topicId) {
          formData.append('topicId', data.topicId)
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      )
      return response.json() as Promise<{ url: string }>
    },
    ...options?.onSuccess,
    onError: () => {
      toast.error('Failed to upload file')
    },
  })
}
