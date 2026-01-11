export function getServerImage(image: string | null) {
  const isGoogleProfileImage = /^https?:\/\/lh\d+\.googleusercontent\.com\/.+/

  if (image !== null) {
    if (isGoogleProfileImage.test(image)) {
      return image
    }
  }

  return image !== '/default.png'
    ? `${import.meta.env.VITE_SERVER_URL}/api/${image}`
    : image
}
