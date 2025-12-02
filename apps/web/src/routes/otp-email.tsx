import { createFileRoute } from '@tanstack/react-router'
import OtpCard from '@/components/OtpCard/OtpCard'
import { Background } from '@/components/ui/background'

export const Route = createFileRoute('/otp-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Background>
      <div className="container flex justify-center items-center min-h-screen">
        <OtpCard />
      </div>
    </Background>
  )
}
