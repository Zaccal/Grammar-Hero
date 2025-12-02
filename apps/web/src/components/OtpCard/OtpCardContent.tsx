interface OtpCardContentProps {
  children: React.ReactNode
}

function OtpCardContent({ children }: OtpCardContentProps) {
  return (
    <div className="mt-6 mx-auto w-fit">
      {children}
    </div>
  )
}

export default OtpCardContent
