import { UpdateProfileFormValues } from '@/@types/form'
import { UpdateProfileResponse } from '@/@types/response'
import { api } from '@/services/api'
import { toast } from 'react-toastify'

export const updateUser = async (
  values: UpdateProfileFormValues,
  token: string
) => {
  try {
    const response: UpdateProfileResponse = await api.put('/users', values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = response

    toast.success(`${data.message} Comece a fazer seus palpites!`)

    console.log('🚀 ~ data', data)

    return data
  } catch (error) {
    console.log('🚀 ~ error', error)
    toast.error((error as any).response.data.message)
  }
}
