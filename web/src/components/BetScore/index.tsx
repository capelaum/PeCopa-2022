import { TbChevronDown, TbChevronUp } from 'react-icons/tb'

interface BetScoreProps {
  score: number | null
  isBetDisabled: boolean
  setScore: (isIncrease: boolean) => void
}

export function BetScore({ score, isBetDisabled, setScore }: BetScoreProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {!isBetDisabled && (
        <button className="bet-button" onClick={() => setScore(true)}>
          <TbChevronUp size={32} color="#AF053F" />
        </button>
      )}

      <div className="bet-number">
        <span>{score ?? '-'}</span>
      </div>

      {!isBetDisabled && (
        <button className="bet-button" onClick={() => setScore(false)}>
          <TbChevronDown size={32} color="#AF053F" />
        </button>
      )}
    </div>
  )
}
