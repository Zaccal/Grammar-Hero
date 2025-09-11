import { FilterIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet'

interface FilterSheetProps {
  children: React.ReactNode
}

export function FilterSheet({ children }: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} type="button">
          <FilterIcon />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent aria-description={'Filter'} className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export function FilterSheetFooter({ children }: FilterSheetProps) {
  return <SheetFooter>{children}</SheetFooter>
}

export function FilterSheetBody({ children }: FilterSheetProps) {
  return <SheetBody className="grow">{children}</SheetBody>
}
