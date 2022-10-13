import { AuthData, MatchesData } from '@/@types/response'
import { BetsContainer } from '@/components/BetsContainer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { addDays, subDays } from 'date-fns'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAsync, useLocalStorage } from 'react-use'

export function Guesses() {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 10, 20))

  const [auth] = useLocalStorage('@pecopa-2022:auth', {} as AuthData)

  const matches = useAsync(async () => {
    const { data }: MatchesData = await api.get(
      `/matches?matchTime=${new Date(selectedDate).toISOString()}`
    )

    return data
  }, [selectedDate])

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

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
