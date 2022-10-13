import { Team } from '@/@types/match'

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  const { slug, name } = team

  return (
    <div className="flex flex-col justify-between items-center gap-2">
      <span className="text-gray-700 uppercase">{team.slug}</span>
      <img
        src={`/assets/flags/${team.slug.toLowerCase()}.png`}
        alt={`Bandeira de ${name}`}
        className="w-10 sm:w-14"
      />
    </div>
  )
}
