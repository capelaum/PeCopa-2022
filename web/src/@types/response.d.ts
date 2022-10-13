import { User } from './user'

export type ResponseData = {
  data: AuthData
}

export type AuthData = {
  message: string
  user: User
  token: string
}

export type MatchesData = {
  data: Match[]
}
