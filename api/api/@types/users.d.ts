export type User = {
  id: string | number
  username: string
  name: string
  email: string
  password: string
}

export type NewUser = Omit<User, 'id'>
