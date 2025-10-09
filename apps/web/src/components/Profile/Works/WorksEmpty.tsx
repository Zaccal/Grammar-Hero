import { Link } from '@tanstack/react-router'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WorksEmpty() {
  return (
    <div className="text-center">
      <Upload className="mx-auto" size={30} />
      <h3 className="mt-2 font-bold text-lg">Upload your first topic!</h3>
      <p className="text-muted-foreground text-sm mt-4 max-w-lg mx-auto">Share your knowledge and help others learn! Upload your first topic and become a contributor to our growing community</p>
      <Button asChild className="mt-4">
        <Link to="/createTopic">
          Let's uplaod!
        </Link>
      </Button>
    </div>
  )
}
