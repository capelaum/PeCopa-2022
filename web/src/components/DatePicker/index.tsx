import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface DatePickerProps {
  prevDay: () => void
  nextDay: () => void
  selectedDate: Date
  firstGameDate: Date
  lastGameDate: Date
}

export function DatePicker({
  prevDay,
  nextDay,
  selectedDate,
  firstGameDate,
  lastGameDate,
}: DatePickerProps) {
  const isPrevButtonDisabled = selectedDate <= firstGameDate

  const isNextButtonDisabled = selectedDate >= lastGameDate

  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={prevDay}
        disabled={isPrevButtonDisabled}
        className="date-picker-button"
      >
        <MdChevronLeft
          size={40}
          color={isPrevButtonDisabled ? '#91949D' : '#AF053F'}
        />
      </button>

      <span className="text-red-700 font-bold text-lg sm:text-xl">
        {format(selectedDate, "dd 'de' MMMM", {
          locale: ptBR,
        })}
      </span>

      <button
        onClick={nextDay}
        disabled={isNextButtonDisabled}
        className="date-picker-button"
      >
        <MdChevronRight
          size={40}
          color={isNextButtonDisabled ? '#91949D' : '#AF053F'}
        />
      </button>
    </div>
  )
}
