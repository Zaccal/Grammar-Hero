export function getMinMax() {
  const start = Math.floor(Math.random() * 50) + 1
  const end = start + Math.floor(Math.random() * 10) + 1
  const pad = (n: number) => n.toString().padStart(2, '0')
  const min = `00:${pad(start)}:00`
  const max = `00:${pad(end)}:00`
  return { min, max }
}
