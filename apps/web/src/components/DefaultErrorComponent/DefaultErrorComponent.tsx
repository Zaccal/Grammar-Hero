import type { ErrorComponentProps } from '@tanstack/router-core'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Info } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Button } from '../ui/button'

export default function DefaultErrorComponent({
  error,
  reset,
}: ErrorComponentProps) {
  return (
    <div className="container h-full flex items-center justify-center mt-12">
      <div className="flex justify-center flex-col items-center gap-8">
        <img
          src="/dino-sad.webp"
          alt="Sad Dino"
          className="size-70 xs:size-96"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-center">Oh no!</h1>
          <p className="text-center text-muted-foreground mt-2">
            Something went wrong, <br /> please try again later.
          </p>
        </div>
        <div className="space-y-2 flex flex-col">
          <Button size="lg" asChild>
            <Link to="/">
              <ArrowLeft /> GO BACK HOME
            </Link>
          </Button>
          <Button size="lg" onClick={reset} variant="link">
            Try Again
          </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="details"
          className="max-w-lg mt-8"
        >
          <AccordionItem value="details">
            <AccordionTrigger className="text-muted-foreground">
              Error Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 py-2 bg-destructive rounded-md text-destructive-foreground">
                <div className="flex items-center gap-2">
                  <Info size={20} />
                  <span>{error.message}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
