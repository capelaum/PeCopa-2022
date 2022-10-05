import { Match } from '@/@types/team'
import { BetScore } from '@/components/BetScore'
import { TeamCard } from '@/components/TeamCard'

interface BetCardProps {
  match: Match
}

export function BetCard({ match }: BetCardProps) {
  const { matchTime, teamA, teamB } = match
  return (
    <div className="w-full rounded-xl border border-gray-300 p-4 gap-4 flex flex-col items-center">
      <span className="font-bold text-gray-700">{matchTime}</span>

      <div className="flex items-start justify-between gap-4 sm:gap-6">
        <TeamCard team={teamA} />

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <BetScore />

          <span className="text-red-500 font-bold text-sm md:text-base">X</span>

          <BetScore />
        </div>

        <TeamCard team={teamB} />
      </div>
    </div>
  )
}
