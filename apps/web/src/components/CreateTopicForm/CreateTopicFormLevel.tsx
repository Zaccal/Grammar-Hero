import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export const CreateTopicFormLevel = () => {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Levels</SelectItem>
          <SelectItem value="Basic">Basic</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
