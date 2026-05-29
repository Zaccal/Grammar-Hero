import { Link } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const TextEffect = lazy(() =>
  import('../ui/text-effect').then(mod => ({
    default: mod.TextEffect,
  }))
)

export function Logo() {
  return (
    <>
      <Link to="/" className="text-lg md:text-xl font-black flex items-center ">
        <img src="/Logo.webp" alt="Logo" className="w-20" />
        <Suspense fallback={<></>}>
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
        </Suspense>
      </Link>
    </>
  )
}
