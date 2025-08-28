interface GreetingProps {
  children: React.ReactNode[] | React.ReactNode
}

export function Greeting({ children }: GreetingProps) {
  return (
    <div className="w-full hero-background text-white py-20">
      <div className="container text-center space-y-3">{children}</div>
    </div>
  )
}

export function GreetingTitle({ children }: GreetingProps) {
  return <h1 className="text-4xl font-black">{children}</h1>
}

export function GreetingDescription({ children }: GreetingProps) {
  return <p className="max-w-3xl mx-auto">{children}</p>
}
