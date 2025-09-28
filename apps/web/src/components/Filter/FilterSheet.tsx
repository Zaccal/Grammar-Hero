import { FilterIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
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
        <Button className="sm:w-auto w-full" variant="outline" type="button">
          <FilterIcon />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent aria-description="Filter" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
