export function createFileMetaData(input: string | File) {
  let fileName: string
  let size = 0
  let type: string
  let url: string

  if (typeof input === 'string') {
    url = input
    fileName = input.split('/').pop() || 'file'

    const getMimeType = (name: string) => {
      if (name.endsWith('.png')) return 'image/png'
      if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg'
      if (name.endsWith('.gif')) return 'image/gif'
      if (name.endsWith('.webp')) return 'image/webp'
      return 'application/octet-stream'
    }

    type = getMimeType(fileName)
  } else {
    fileName = input.name
    size = input.size
    type = input.type || 'application/octet-stream'

    url = URL.createObjectURL(input)
  }

  return {
    id: crypto.randomUUID(),
    name: fileName,
    size,
    type,
    url,
    original: input,
  }
}
