export function getRandomColor(): string {
  const colors = [
    'bg-red-200/50',
    'bg-green-200/50',
    'bg-blue-200/50',
    'bg-yellow-200/50',
    'bg-purple-200/50',
    'bg-pink-200/50',
    'bg-orange-200/50',
    'bg-teal-200/50',
    'bg-indigo-200/50',
    'bg-gray-200/50',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
