import { Link } from '@tanstack/react-router'
import { TextEffect } from '../ui/text-effect'

export function Logo() {
  return (
    <>
      <Link to="/" className="text-lg md:text-xl font-black flex items-center ">
        <img src="/Logo.png" alt="Logo" className="w-20" />
        <TextEffect
          per="char"
          speedReveal={1.1}
          speedSegment={0.3}
          preset="fade"
          delay={0.7}
          className="xs:inline hidden"
        >
          Grammar Hero
        </TextEffect>
      </Link>
    </>
  )
}
