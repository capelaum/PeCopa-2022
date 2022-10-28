export type User = {
  id: string
  name: string
  username: string
  email: string
  guessesCount?: number
  avatarUrl?: string | null
  createdAt: Date
  updatedAt: Date
}

export type UpdateProfileFormValues = {
  name: string
  username: string
  email: string
  password?: string
  confirmPassword?: string
  avatar?: File | string | null
}
