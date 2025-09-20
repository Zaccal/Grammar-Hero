import { useSession, useTheme } from '@/hooks'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Skeleton } from '../ui/skeleton'
import { toast } from 'sonner'
import { getUserImageFallbackText } from '@/utils/getUserImageFallbackText'
import { LogOut, Moon, Plus, User } from 'lucide-react'
import { useSignOut } from '@/hooks/useSignOut'
import { Switch } from '../ui/switch'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const UserDropdown = () => {
  const { data, isLoading, isError, error } = useSession()
  const { mutate: signOut } = useSignOut()
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme === 'dark')

  if (isLoading) return <Skeleton className="size-10 rounded-full" />
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
        <Avatar>
          <AvatarImage src={user.image || ''} alt={user.displayUsername!} />
          <AvatarFallback>
            {getUserImageFallbackText(user.displayUsername!)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-[200px]">
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
            size={'sm'}
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
