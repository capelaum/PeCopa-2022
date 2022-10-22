export type User = {
  id: string
  name: string
  username: string
  email: string
  guessesCount?: number
  createdAt: Date
  updatedAt: Date
}

export type UpdateProfileFormValues = {
  name: string
  username: string
  email: string
  password?: string
}
