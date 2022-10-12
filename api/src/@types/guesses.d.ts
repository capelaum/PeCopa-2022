export type Guess = {
  id: string
  userId: string
  matchId: string
  homeTeamScore: number
  awayTeamScore: number
}

export type NewGuess = Omit<Guess, 'id' | 'userId'>
