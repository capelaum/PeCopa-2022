import Avvvatars from 'avvvatars-react'

interface AvatarDefaultProps {
  value: string
  size?: number
  border?: boolean
  avatarUrl?: string | null
  alt?: string
  isHeader?: boolean
}

export default function AvatarDefault({
  value,
  size = 32,
  border,
  avatarUrl,
  alt = 'Avatar',
  isHeader,
}: AvatarDefaultProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={alt}
        className={`object-cover rounded-full ${
          isHeader ? 'w-8 h-8' : 'w-full h-full'
        }`}
      />
    )
  }

  return (
    <Avvvatars
      value={value}
      size={size}
      borderSize={2}
      border={border}
      borderColor="#F4F6FF"
      style="character"
    />
  )
}
