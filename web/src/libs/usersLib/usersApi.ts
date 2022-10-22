import { api } from '@/services/api'
import { toast } from 'react-toastify'
import { Auth } from '../authLib/authTypes'
import { UpdateProfileFormValues, User } from './userTypes'

export const getUser = async (username: string) => {
  try {
    const { data } = await api.get(`/users/${username}`)

    return data
  } catch (error) {
    console.error('🚀 ~ error', error)
    return null
  }
}

export const getUsers = async () => {
  try {
    const { data }: { data: User[] } = await api.get('/users')

    return data
  } catch (error) {
    console.error('🚀 ~ error', error)
  }
}

export const updateUser = async (
  values: UpdateProfileFormValues,
  auth: Auth
) => {
  try {
    const response: { data: User } = await api.put(
      `/users/${auth.user.id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )

    const { data } = response

    toast.success('Perfil atualizado com sucesso!')

    return data
  } catch (error) {
    console.error('🚀 ~ error', error)
    toast.error((error as any).response.data.message)
  }
}
