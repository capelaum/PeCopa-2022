import { Match } from '@/@types/match'
import { BetScore } from '@/components/BetScore'
import { TeamCard } from '@/components/TeamCard'
import { format } from 'date-fns'

interface BetCardProps {
  match: Match
}

export function BetCard({ match }: BetCardProps) {
  const { matchTime, homeTeam, awayTeam } = match

  return (
    <div className="w-full rounded-xl border border-gray-300 p-4 gap-4 flex flex-col items-center">
      <span className="font-bold text-gray-700">
        {format(new Date(matchTime), 'H:mm')}
      </span>

      <div className="flex items-start justify-between gap-4 sm:gap-6">
        <TeamCard team={homeTeam} />

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <BetScore />

          <span className="text-red-500 font-bold text-sm md:text-base">X</span>

          <BetScore />
        </div>

        <TeamCard team={awayTeam} />
      </div>
    </div>
  )
}
