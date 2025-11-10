import { Link } from '@tanstack/react-router'
import { LogOut, Moon, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSession, useTheme } from '@/hooks'
import { useSignOut } from '@/hooks/useSignOut'
import { getServerImage, getUserImageFallbackText } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import { Switch } from '../ui/switch'

function UserDropdown() {
  const { data, isLoading, isError, error } = useSession()
  const { mutate: signOut } = useSignOut()
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme === 'dark')

  if (isLoading) {
    return <Skeleton className="size-10 rounded-full" />
  }
  if (isError || !data) {
    toast.error('Something went wrong', {
      description: error?.message,
    })
    return null
  }

  const { user } = data!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-12 text-base">
          <AvatarImage src={getServerImage(user.image ?? '')} />
          <AvatarFallback>
            {getUserImageFallbackText(user.displayUsername ?? user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <Link to="/profile">
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={e => {
            e.preventDefault()
          }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Moon />
            <span>Dark mode</span>
          </div>
          <Switch
            size="sm"
            checked={darkMode}
            onCheckedChange={() => {
              setTheme(darkMode ? 'light' : 'dark')
              setDarkMode(!darkMode)
            }}
          />
        </DropdownMenuItem>
        <Link to="/createTopic">
          <DropdownMenuItem>
            <Plus />
            <span>Create topic</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
          variant="destructive"
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
