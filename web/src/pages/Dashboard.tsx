import { BetCard } from '@/components/BetCard'
import { DatePicker } from '@/components/DatePicker'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { addDays, subDays } from 'date-fns'
import { useState } from 'react'

const matches = [
  {
    id: 1,
    matchTime: '13:00',
    teamA: {
      name: 'Brazil',
      slug: 'BRA',
    },
    teamB: {
      name: 'Argentina',
      slug: 'ARG',
    },
  },
  {
    id: 2,
    matchTime: '13:00',
    teamA: {
      name: 'Catar',
      slug: 'CAT',
    },
    teamB: {
      name: 'Equador',
      slug: 'EQU',
    },
  },
]

export function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date('2022-11-20T00:00:00.000Z')
  )

  function prevDay() {
    const prevDate = subDays(selectedDate, 1)

    setSelectedDate(prevDate)
  }

  function nextDay() {
    const nextDate = addDays(selectedDate, 1)

    setSelectedDate(nextDate)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full">
          <span className="text-base text-white">Olá, Fulano!</span>
          <h1 className="text-2xl font-bold mt-4">Qual é o seu palpite?</h1>
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <DatePicker
          prevDay={prevDay}
          nextDay={nextDay}
          selectedDate={selectedDate}
        />

        <div className="w-full flex flex-col items-center gap-5">
          {matches.map((match) => (
            <BetCard key={match.id} match={match} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
