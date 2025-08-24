import { Link } from '@tanstack/react-router'
import { TextEffect } from './motion-primitives/text-effect'

export function Logo() {
  return (
    <>
      <Link to="/" className="text-xl font-black flex items-center ">
        <img src="/Logo.png" alt="Logo" className="w-20" />
        <TextEffect per="char" preset="scale" delay={0.4}>
          Grammar Hero
        </TextEffect>
      </Link>
    </>
  )
}
