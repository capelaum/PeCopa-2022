import Avvvatars from 'avvvatars-react'

interface AvatarDefaultProps {
  value: string
  size?: number
  border?: boolean
  avatarUrl?: string | null
  alt?: string
  width?: number
  height?: number
}

export default function AvatarDefault({
  value,
  size = 32,
  border,
  avatarUrl,
  width = 32,
  height = 32,
  alt = 'Avatar',
}: AvatarDefaultProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={alt}
        className={`object-cover rounded-full w-[${width}px] h-[${height}px]`}
      />
    )
  }

  return (
    <Avvvatars
      value={value}
      size={size}
      borderSize={2}
      border={border}
      style="character"
    />
  )
}
