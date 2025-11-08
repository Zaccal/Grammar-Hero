import type { FileUploadMutation } from '@/types/fileupload.types'
import { useMutation } from '@tanstack/react-query'

export const USE_FILE_UPLOAD_MUTATION_KEY = 'use-file-upload-mutation'

export function useFileUploadMutation() {
  return useMutation({
    mutationKey: [USE_FILE_UPLOAD_MUTATION_KEY],
    mutationFn: async (data: FileUploadMutation | File) => {
      const formData = new FormData()
      if (data instanceof File) {
        formData.append('file', data)
      }
 else {
        formData.append('file', data.file)
        if (data.exchangeFile) {
          formData.append('exchangeFile', data.exchangeFile)
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
  })
}
