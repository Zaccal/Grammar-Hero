import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

function SignInFormFooter() {
  return (
    <div className="p-3">
      <p className="text-accent-foreground text-center text-sm">
        Don't have an account ?
        <Button asChild variant="link" className="px-2">
          <Link to="/sign-up">Create account</Link>
        </Button>
      </p>
    </div>
  )
}

export default SignInFormFooter
