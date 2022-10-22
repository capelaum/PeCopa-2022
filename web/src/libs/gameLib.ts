import { Game } from '@/@types/game'
import { format } from 'date-fns'

export const getfilteredGamesByDate = (games: Game[], date: Date) => {
  return games.filter((game) =>
    game.gameTime.includes(format(date, 'yyyy-MM-dd'))
  )
}
