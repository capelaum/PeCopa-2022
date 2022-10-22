import { Game } from '../gamesLib/gameTypes'

export type Guess = {
  id: string
  gameId: string
  game: Game
  userId: string
  homeTeamScore: number
  awayTeamScore: number
  createdAt: string
}

export type CreateGuessRequest = {
  userId: string
  gameId: string
  homeTeamScore: number
  awayTeamScore: number
  token: string
}

export type CreateGuessResponse = {
  guess: Guess
  message: string
}
