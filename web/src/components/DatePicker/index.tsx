import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface DatePickerProps {
  prevDay: () => void
  nextDay: () => void
  selectedDate: Date
}

export function DatePicker({
  prevDay,
  nextDay,
  selectedDate,
}: DatePickerProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={prevDay}
        className="
              flex items-center justify-center
              transition-all duration-300
            bg-white rounded-xl hover:bg-red-100
            "
      >
        <MdChevronLeft size={40} color="#AF053F" />
      </button>

      <span className="text-red-700 font-bold text-lg sm:text-xl">
        {format(selectedDate, "dd 'de' MMMM", {
          locale: ptBR,
        })}
      </span>

      <button
        onClick={nextDay}
        className="
              flex items-center justify-center
              transition-all duration-300
            bg-white rounded-xl hover:bg-red-100
            "
      >
        <MdChevronRight size={40} color="#AF053F" />
      </button>
    </div>
  )
}
