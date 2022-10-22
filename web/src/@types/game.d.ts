export type Team = {
  slug: string
  name: string
}

export type Game = {
  id: string
  group: string
  round: string
  homeTeam: Team
  awayTeam: Team

  gameTime: string
}
