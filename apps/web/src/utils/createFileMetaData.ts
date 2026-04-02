export function createFileMetaData(url: string) {
  const fileName = url.split('/').pop() || 'file'

  const getMimeType = (name: string) => {
    if (name.endsWith('.png')) {
      return 'image/png'
    }
    if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
      return 'image/jpeg'
    }
    if (name.endsWith('.gif')) {
      return 'image/gif'
    }
    if (name.endsWith('.webp')) {
      return 'image/webp'
    }
    return 'application/octet-stream'
  }

  return {
    id: crypto.randomUUID(),
    name: fileName,
    size: 0,
    type: getMimeType(fileName),
    url,
  }
}
