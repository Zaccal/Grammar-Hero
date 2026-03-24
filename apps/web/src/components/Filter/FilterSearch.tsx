import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounceCallback } from '@/hooks'
import { Button } from '../ui/button'
import { Input, InputGroup } from '../ui/input'
import { FilterContext } from './FilterContext'

export function FilterSearch() {
  const { searchParams, navigate } = FilterContext.useSelect(state => state)
  const [query, setQuery] = useState(searchParams.query)

  function searchHandler() {
    navigate({
      search: {
        query,
      },
      replace: true,
    })
  }

  function reset() {
    setQuery('')
    navigate({
      search: {
        query: '',
      },
      replace: true,
    })
  }

  const debounceReset = useDebounceCallback(reset, 300)

  return (
    <InputGroup className="max-w-lg w-full">
      <Input
        placeholder="What do you want to learn?"
        value={query}
        onChange={e => {
          if (!e.target.value.length) {
            debounceReset()
          }
          setQuery(e.target.value)
        }}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            searchHandler()
          }
        }}
      />
      <Button className="min-w-10" size="icon" onClick={searchHandler}>
        <Search color="#fff" />
      </Button>
    </InputGroup>
  )
}
