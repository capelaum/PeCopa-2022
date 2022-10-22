import { api } from '@/services/api'
import { format } from 'date-fns'
import { Game } from './gameTypes'

export const getfilteredGamesByDate = (games: Game[], date: Date) => {
  return games.filter((game) =>
    game.gameTime.includes(format(date, 'yyyy-MM-dd'))
  )
}

export const getGamesDates = (games: Game[]) => {
  const dates = games.reduce((acc, game) => {
    const date = game.gameTime.split(' ')[0]

    if (!acc.includes(date)) {
      acc.push(date)
    }

    return acc
  }, [] as string[])

  const datesWithHour = dates.map((date) => `${date} 01:00:00`)

  return datesWithHour.map((date) => new Date(date))
}

export const getGames = async (username: string) => {
  const { data: games }: { data: Game[] } = await api.get(`/games/${username}`)

  return games
}
