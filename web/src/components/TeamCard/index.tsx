import { Team } from '@/@types/game'

interface TeamCardProps {
  team: Team
}

export function TeamCard({ team }: TeamCardProps) {
  const { slug, name } = team

  const teamImgPath =
    team.slug === '?'
      ? '/assets/flags/undefined.png'
      : `/assets/flags/${team.slug.toLowerCase()}.png`

  return (
    <div className="flex flex-col justify-between items-center gap-2">
      <span className="text-gray-700 font-bold uppercase">{team.slug}</span>
      <img
        src={teamImgPath}
        alt={`Bandeira de ${name}`}
        className="w-10 sm:w-14"
      />
    </div>
  )
}
