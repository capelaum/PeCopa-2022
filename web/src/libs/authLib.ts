import { LoginFormValues, RegisterFormValues } from '@/@types/form'
import { AuthResponseData } from '@/@types/response'
import { EmailIcon } from '@/components/Icons/EmailIcon'
import { api } from '@/services/api'
import { toast } from 'react-toastify'

export const register = async (values: RegisterFormValues) => {
  try {
    const response: AuthResponseData = await api.post('/register', values)
    console.log('🚀 ~ response', response)

    const { data } = response

    toast.success(
      `Um email de verificação foi enviado para ${data.user.email}.`,
      {
        icon: EmailIcon,
      }
    )

    return data
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}

export const login = async (values: LoginFormValues) => {
  try {
    const response: AuthResponseData = await api.post('/login', values)

    const { data } = response
    console.log('🚀 ~ data', data)

    toast.success(data.message)

    return data
  } catch (error) {
    toast.error((error as any).response.data.message)
  }
}
