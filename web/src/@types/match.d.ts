export type Team = {
  slug: string
  name: string
}

export type Match = {
  id: string
  group: string
  round: string
  homeTeam: Team
  awayTeam: Team

  matchTime: string
}
