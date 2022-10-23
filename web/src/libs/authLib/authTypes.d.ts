import { User } from '../usersLib/userTypes'

export type Auth = {
  message?: string
  user: User
  token: string
}

export type RegisterResponse = {
  data: {
    user: User
  }
}

export type LoginResponse = {
  data: Auth
}

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

export type ResetPasswordFormValues = {
  email: string
  password: string
  confirmPassword: string
  token: string
}
