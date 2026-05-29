const IS_GOOGLE_PROFILE_IMAGE = /^https?:\/\/lh\d+\.googleusercontent\.com\/.+/

export function getServerImage(image: string | null) {
  if (image !== null) {
    if (IS_GOOGLE_PROFILE_IMAGE.test(image)) {
      return image
    }
  }

  return image !== '/default.webp'
    ? `${import.meta.env.VITE_SERVER_URL}/api/${image}`
    : image
}
