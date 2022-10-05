export type Team = {
  slug: string
  name: string
}

export type Match = {
  id: string | number
  matchTime: string
  teamA: Team
  teamB: Team
}
