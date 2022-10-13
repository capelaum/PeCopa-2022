import { Match } from '@/@types/match'
import { BetScore } from '@/components/BetScore'
import { TeamCard } from '@/components/TeamCard'
import { format } from 'date-fns'
import { useState } from 'react'

interface BetCardProps {
  match: Match
  isAllBetsDisabled?: boolean
}

export function BetCard({ match, isAllBetsDisabled }: BetCardProps) {
  const { matchTime, homeTeam, awayTeam, group, round } = match
  const isBetDisabled =
    new Date(matchTime) < new Date() ||
    new Date(matchTime) > new Date(2022, 11, 18) ||
    homeTeam.slug === '?' ||
    awayTeam.slug === '?' ||
    isAllBetsDisabled

  const [homeTeamScore, setHomeTeamScore] = useState<number | null>(null)
  const [awayTeamScore, setAwayTeamScore] = useState<number | null>(null)

  const handleSetHomeTeamScore = (isIncrease = true) => {
    setHomeTeamScore((score) => {
      if (score === null) return 0

      if (score === 0 && !isIncrease) return 0

      if (score === 30 && isIncrease) return 30

      return isIncrease ? score + 1 : score - 1
    })
  }

  const handleSetAwayTeamScore = (isIncrease = true) => {
    setAwayTeamScore((score) => {
      if (score === null) return 0

      if (score === 0 && !isIncrease) return 0

      if (score === 30 && isIncrease) return 30

      return isIncrease ? score + 1 : score - 1
    })
  }

  return (
    <div className="w-full rounded-xl border border-gray-300 p-4 gap-4 flex flex-col items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-red-500 text-md text-center sm:text-xl">
          {homeTeam.name} x {awayTeam.name}
        </h1>

        <h2 className="font-bold text-red-500 text-md text-center">
          {group ? `Grupo ${group} - ` : ''} {round}
        </h2>

        <span className="font-bold text-gray-700 ">
          {format(new Date(matchTime), 'HH:mm')}
        </span>
      </div>

      <div
        className={`flex ${
          isBetDisabled ? 'items-end' : 'items-start'
        } justify-between gap-4 sm:gap-6`}
      >
        <TeamCard team={homeTeam} />

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <BetScore
            isBetDisabled={isBetDisabled}
            score={homeTeamScore}
            setScore={handleSetHomeTeamScore}
          />

          <span className="text-red-500 font-bold text-sm md:text-base">X</span>

          <BetScore
            isBetDisabled={isBetDisabled || isAllBetsDisabled}
            score={awayTeamScore}
            setScore={handleSetAwayTeamScore}
          />
        </div>

        <TeamCard team={awayTeam} />
      </div>

      {!isBetDisabled && (
        <button className="button button-primary w-full mt-5">Apostar</button>
      )}
    </div>
  )
}
