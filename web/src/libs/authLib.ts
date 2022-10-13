import { LoginFormValues, RegisterFormValues } from '@/@types/form'
import { api } from '@/services/api'
import { toast } from 'react-toastify'

export const register = async (values: RegisterFormValues) => {
  try {
    const response = await api.post('/users', values)

    toast.success(response.data.message)
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}

export const login = async (values: LoginFormValues) => {
  try {
    const encodedAuth = Buffer.from(
      `${values.email}:${values.password}`
    ).toString('base64')

    const response = await api.get('/login', {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    })

    toast.success(response.data.message)
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}
