export function getMinMax() {
  const ranges = [
    { min: '00:05:00', max: '00:10:00' },
    { min: '00:10:00', max: '00:15:00' },
    { min: '00:15:00', max: '00:20:00' },
    { min: '00:20:00', max: '00:25:00' },
    { min: '00:25:00', max: '00:30:00' },
    { min: '00:30:00', max: '00:35:00' },
    { min: '00:35:00', max: '00:59:00' },
  ]
  const randomRange = ranges[Math.floor(Math.random() * ranges.length)]
  return randomRange
}
