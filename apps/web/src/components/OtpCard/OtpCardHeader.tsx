interface OtpCardHeaderProps {
  description?: string
}

function OtpCardHeader({ description }: OtpCardHeaderProps) {
  return (
    <div>
      <div className="">
        <h1 className="mb-1 mt-4 text-xl font-semibold">Enter OTP</h1>
        <p className="text-sm">{description ?? 'Enter the OTP sent to your email for verification'}</p>
      </div>
    </div>
  )
}

export default OtpCardHeader
