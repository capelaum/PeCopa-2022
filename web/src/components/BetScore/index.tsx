import { TbChevronDown, TbChevronUp } from 'react-icons/tb'

export function BetScore() {
  return (
    <div className="flex flex-col items-center gap-2">
      <button className="bet-button">
        <TbChevronUp size={32} color="#AF053F" />
      </button>

      <div className="bet-number">
        <span>-</span>
      </div>

      <button className="bet-button">
        <TbChevronDown size={32} color="#AF053F" />
      </button>
    </div>
  )
}
