import { api } from '@/services/api'
import { toast } from 'react-toastify'
import {
  LoginFormValues,
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
} from './authTypes'

export const register = async (values: RegisterFormValues) => {
  try {
    const response: RegisterResponse = await api.post('/register', values)

    const { data } = response

    toast.success(
      `Um email de verificação foi enviado para ${data.user.email}.`
    )

    return data
  } catch (error) {
    console.error('🚀 ~ error', error)
    toast.error((error as any).response.data.message)
  }
}

export const login = async (values: LoginFormValues) => {
  try {
    const response: LoginResponse = await api.post('/login', values)

    const { data } = response

    toast.success(data.message)

    return data
  } catch (error) {
    console.error('🚀 ~ error', error)
    toast.error((error as any).response.data.message)
  }
}
