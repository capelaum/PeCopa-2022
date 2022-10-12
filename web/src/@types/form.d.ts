export type RegisterFormValues = {
  name: string
  username: string
  email: string
  password: string
}

export type LoginFormValues = Omit<RegisterFormValues, 'name' | 'username'>
