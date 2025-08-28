import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const SignUpFormFooter = () => {
  return (
    <>
      <div className="p-3">
        <p className="text-accent-foreground text-center text-sm">
          Have an account ?
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </p>
      </div>
    </>
  )
}

export default SignUpFormFooter
