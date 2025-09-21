import { useMutation, useMutationState } from '@tanstack/react-query'

export const USE_FILE_UPLOAD_MUTATION_KEY = 'use-file-upload-mutation'

export const useFileUploadMutation = () => {
  return useMutation({
    mutationKey: [USE_FILE_UPLOAD_MUTATION_KEY],
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/upload`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      )
      return response.json()
    },
  })
}

export const useFileUploadMutationState = () => {
  const state = useMutationState({
    filters: {
      mutationKey: [USE_FILE_UPLOAD_MUTATION_KEY],
    },
  })

  const firstState = state[0]

  return {
    isPending: firstState?.status === 'pending',
    data: firstState?.data,
    error: firstState?.error,
    isError: firstState?.status === 'error',
    isSuccess: firstState?.status === 'success',
  }
}
