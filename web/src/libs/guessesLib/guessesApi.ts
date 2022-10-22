import { api } from '@/services/api'
import { CreateGuessRequest, CreateGuessResponse } from './guessTypes'

export const createGuess = async (createGuessRequest: CreateGuessRequest) => {
  try {
    const { data: newGuess }: { data: CreateGuessResponse } = await api.post(
      '/guesses',
      createGuessRequest,
      {
        headers: {
          Authorization: `Bearer ${createGuessRequest.token}`,
        },
      }
    )

    return newGuess
  } catch (error) {
    console.log('🚀 ~ error', error)
    return null
  }
}
