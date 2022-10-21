import { UpdateProfileFormValues } from '@/@types/form'
import { UpdateProfileResponse, UsersData } from '@/@types/response'
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

    toast.success(data.message)

    return data
  } catch (error) {
    console.log('🚀 ~ error', error)
    toast.error((error as any).response.data.message)
  }
}

export const getUsers = async () => {
  try {
    const { data }: UsersData = await api.get('/users')

    return data
  } catch (error) {
    console.log('🚀 ~ error', error)
  }
}
