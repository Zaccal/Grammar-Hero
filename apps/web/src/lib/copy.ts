export function legacyCopyToClipboard(value: string) {
  const tempTextArea = document.createElement('textarea')
  tempTextArea.value = value
  tempTextArea.readOnly = true
  tempTextArea.style.fontSize = '16px'
  document.body.appendChild(tempTextArea)
  tempTextArea.select()
  document.execCommand('copy')
  document.body.removeChild(tempTextArea)
}

export async function copy(value: string) {
  try {
    try {
      await navigator.clipboard.writeText(value)
    }
 catch {
      return legacyCopyToClipboard(value)
    }
  }
 catch {
    return legacyCopyToClipboard(value)
  }
}
