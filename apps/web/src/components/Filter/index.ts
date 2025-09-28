import { SheetBody, SheetFooter } from '../ui/Sheet'
import { FilterRoot } from './Filter'
import { FilterActions } from './FilterActions'
import { FilterDuration } from './FilterDuration'
import { FilterForm } from './FilterForm'
import { FilterLevel } from './FilterLevel'
import { FilterSearch } from './FilterSearch'
import { FilterSheet } from './FilterSheet'
import { FilterSort } from './FilterSort'

export const Filter = {
  Root: FilterRoot,
  Form: FilterForm,
  Sheet: FilterSheet,
  SheetBody,
  SheetFooter,
  Search: FilterSearch,
  Sort: FilterSort,
  Level: FilterLevel,
  Actions: FilterActions,
  Duration: FilterDuration,
}
