interface ShareModalGridProps {
  children?: React.ReactElement | React.ReactElement[]
}

export function ShareModalGrid({ children }: ShareModalGridProps) {
  return (
    <div
      className="
        md:grid
        md:grid-cols-4
        md:gap-x-4
        md:gap-y-6
        md:place-items-center
        md:overflow-visible
        mt-2

        flex
        overflow-x-auto
        overflow-y-hidden
        gap-6
      "
    >
      {children}
    </div>
  )
}
