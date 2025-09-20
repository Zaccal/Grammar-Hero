import { durationOptions } from '@/schemas/filter.schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export const CreateTopicFormDuration = () => {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(durationOptions).map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
