export const getTopicImage = (image: string | null) => {
  return image !== '/default.png'
    ? import.meta.env.VITE_SERVER_URL + '/api/' + image
    : image
}
