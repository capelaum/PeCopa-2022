import { Guess } from './guess'
import { Match } from './match'
import { User } from './user'

export type AuthResponseData = {
  data: AuthData
}

export type AuthData = {
  message?: string
  user: User
  token: string
}

export type UpdateProfileResponse = {
  data: {
    message: string
    user: User
  }
}

export type MatchesData = {
  data: Match[]
}

export type NewGuessResponse = {
  guess: Guess
  message: string
}

export type GuessesData = {
  data: Guess[]
}

export type UserData = {
  data: User
}

export type UsersData = {
  data: User[]
}
