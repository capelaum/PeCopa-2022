import { MatchesData } from '@/@types/response'
import { BetsContainer } from '@/components/BetsContainer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { addDays, subDays } from 'date-fns'
import { useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { useAsync } from 'react-use'

export function Bets() {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 10, 20))

  const matches = useAsync(async () => {
    const { data }: MatchesData = await api.get(
      `/matches?matchTime=${new Date(selectedDate).toISOString()}`
    )

    return data
  }, [selectedDate])

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
        <section className="text-white w-full flex gap-4 items-center">
          <NavLink to="/palpites" title="Fazer palpites">
            <MdArrowBack size={32} color="#F4F6FF" />
          </NavLink>

          <h1 className="text-xl sm:text-2xl font-bold">
            Luís Vinicius Capelletto
          </h1>
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <h2 className="w-full text-red-500 font-bold text-2xl">
          Seus palpites
        </h2>

        <BetsContainer
          matches={matches}
          selectedDate={selectedDate}
          prevDay={prevDay}
          nextDay={nextDay}
        />
      </main>

      <Footer />
    </div>
  )
}
