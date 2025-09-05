import { Github } from 'lucide-react'
import { Logo } from './logo'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="text-foreground py-2 bg-white/25 dark:bg-card backdrop-blur-sm border-b border-border/50 dark:border-border sticky top-0 z-20">
      <nav className="container flex items-center justify-between mx-auto ">
        <Logo />
        <ul className="flex items-center gap-8 px-1">
          <li title="Source Code">
            <a target="_blank" href="https://github.com/Zaccal/Grammar-Hero">
              <Github />
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}
