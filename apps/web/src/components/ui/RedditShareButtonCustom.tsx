interface RedditShareButtonCustomProps {
  url: string
  title: string
  children?: React.ReactNode
}

export default function RedditShareButtonCustom({
  url,
  title,
  children,
}: RedditShareButtonCustomProps) {
  const handleClick = () => {
    const shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`
    window.open(shareUrl, '_blank')
  }

  return <div onClick={handleClick}>{children}</div>
}
