import { LoginFormValues, RegisterFormValues } from '@/@types/form'
import { ResponseData } from '@/@types/response'
import { api } from '@/services/api'
import { Buffer } from 'buffer'
import { toast } from 'react-toastify'

export const register = async (values: RegisterFormValues) => {
  try {
    const response: ResponseData = await api.post('/users', values)

    const { data } = response

    toast.success(data.message)

    return data
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}

export const login = async (values: LoginFormValues) => {
  try {
    const encodedAuth = Buffer.from(
      `${values.email}:${values.password}`
    ).toString('base64')

    const response: ResponseData = await api.get('/login', {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
      },
    })

    const { data } = response

    toast.success(data.message)

    return data
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}
