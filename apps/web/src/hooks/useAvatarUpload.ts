import { useFileUploadMutation } from './useFileUploadMutation'

export function useAvatarUpload() {
  const uploadFileMutaion = useFileUploadMutation()

  return async function (image?: null | File) {
    // TODO: if it is null, it will delete the old file if it exists
    if (!image) {
      return image
    }
    return (
      await uploadFileMutaion.mutateAsync({
        file: image,
        type: 'avatar',
      })
    ).url
  }
}
