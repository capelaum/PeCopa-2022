export type RegisterFormValues = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginFormValues = Omit<
  RegisterFormValues,
  'name' | 'username' | 'confirmPassword'
>

export type UpdateProfileFormValues = {
  name: string
  username: string
  email: string
  password?: string
}
