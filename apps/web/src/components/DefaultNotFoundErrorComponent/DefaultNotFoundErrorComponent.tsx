import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../ui/button'

export default function DefaultNotFoundErrorComponent() {
  return (
    <div className="h-[80vh] flex items-center justify-center ">
      <div className="container">
        <h1 className="text-9xl font-black text-primary text-center mb-8">
          404
        </h1>
        <h2 className="uppercase text-center text-3xl font-bold mb-4">ERROR</h2>
        <p className="text-center">
          Sorry, a little dino is lost in the forest.
        </p>
        <div className="w-full flex flex-col justify-center items-center mt-8">
          <Button size="lg" asChild>
            <Link to="/">
              <ArrowLeft /> GO BACK HOME
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
