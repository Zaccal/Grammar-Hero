import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SCROLL_VISIBLE } from '@/lib/constants'
import { Button } from '../ui/button'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_VISIBLE)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed right-5 bottom-5 size-12"
    >
      <ChevronUp size={32} />
    </Button>
  )
}

export default ScrollToTopButton
