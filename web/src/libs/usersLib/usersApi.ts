import { api } from '@/services/api'
import { toast } from 'react-toastify'
import { Auth } from '../authLib/authTypes'
import { User } from './userTypes'

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

export const updateUser = async (updatedUser: FormData, auth: Auth) => {
  try {
    const response: { data: User } = await api.post(
      `/users/${auth.user.id}?_method=PUT`,
      updatedUser,
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
