import { TbChevronDown, TbChevronUp } from 'react-icons/tb'

interface GameScoreProps {
  score: number | null
  isGameDisabled?: boolean
  setScore: (isIncrease: boolean) => void
}

export function GameScore({ score, isGameDisabled, setScore }: GameScoreProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {!isGameDisabled && (
        <button className="bet-button" onClick={() => setScore(true)}>
          <TbChevronUp size={32} color="#AF053F" />
        </button>
      )}

      <div className="bet-number">
        <span>{score ?? '-'}</span>
      </div>

      {!isGameDisabled && (
        <button className="bet-button" onClick={() => setScore(false)}>
          <TbChevronDown size={32} color="#AF053F" />
        </button>
      )}
    </div>
  )
}
