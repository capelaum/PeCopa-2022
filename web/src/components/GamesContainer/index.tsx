import { getfilteredGamesByDate } from '@/libs/gamesLib/gamesApi'
import { Game } from '@/libs/gamesLib/gameTypes'
import { useEffect, useState } from 'react'
import { DatePicker } from '../DatePicker'
import { GameCard } from '../GameCard'

interface GamesContainerProps {
  isAllBetsDisabled?: boolean
  games: Game[]
  gamesDates: Date[]
}

export function GamesContainer({
  isAllBetsDisabled,
  games,
  gamesDates,
}: GamesContainerProps) {
  const [gameDateIndex, setGameDateIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(gamesDates[gameDateIndex])
  const [filteredGames, setFilteredGames] = useState(
    getfilteredGamesByDate(games, selectedDate)
  )

  const firstGameDate = gamesDates[0]
  const lastGameDate = gamesDates[gamesDates.length - 1]

  useEffect(() => {
    const gamesFilteredByDate = getfilteredGamesByDate(games, selectedDate)

    setFilteredGames(gamesFilteredByDate)
  }, [selectedDate, games, gameDateIndex])

  useEffect(() => {
    setSelectedDate(gamesDates[gameDateIndex])
  }, [gameDateIndex])

  function prevDay() {
    setGameDateIndex((gameDateIndex) => gameDateIndex - 1)
  }

  function nextDay() {
    setGameDateIndex((gameDateIndex) => gameDateIndex + 1)
  }

  return (
    <>
      <DatePicker
        prevDay={prevDay}
        nextDay={nextDay}
        selectedDate={selectedDate}
        firstGameDate={firstGameDate}
        lastGameDate={lastGameDate}
      />

      <section className="w-full flex flex-col items-center gap-5">
        {filteredGames.map((game) => {
          const gameHasGuesses = game.guesses.length > 0

          return (
            <GameCard
              key={game.id}
              game={game}
              guess={gameHasGuesses ? game.guesses[0] : null}
              isAllBetsDisabled={isAllBetsDisabled}
            />
          )
        })}
      </section>
    </>
  )
}
