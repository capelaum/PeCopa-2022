import { RouterContext } from '@koa/router'
import { prisma } from '../../../database/prismaClient'

export const listGuesses = async (ctx: RouterContext) => {
  const username = ctx.params.username as string

  if (!username) {
    ctx.status = 400
    ctx.body = {
      message: 'Dados inválidos.',
    }
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      ctx.status = 404
      ctx.body = {
        message: 'Usuário não encontrado.',
      }
      return
    }

    let guesses = await prisma.guess.findMany({
      where: {
        user_id: user.id,
      },
    })

    const formatedGuesses = guesses.map((guess) => {
      return {
        id: guess.id,
        matchId: guess.match_id,
        homeTeamScore: guess.home_team_score,
        awayTeamScore: guess.away_team_score,
        createdAt: guess.created_at,
        updatedAt: guess.updated_at,
      }
    })

    ctx.status = 200
    ctx.body = formatedGuesses
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
