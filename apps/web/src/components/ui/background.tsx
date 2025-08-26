import { useTheme } from '@/hooks'

interface BackgroundProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function Background({ children }: BackgroundProps) {
  const { theme } = useTheme()

  if (theme !== 'light') {
    return (
      <div className="min-h-screen w-full bg-[#0f0f0f] relative text-white">
        {/* Small Grid Pattern */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #262626 1px, transparent 1px),
        linear-gradient(to bottom, #262626 1px, transparent 1px)
      `,
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative">{children}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Top Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: '20px 30px',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
