import { RouterContext } from '@koa/router'
import { NewGuess } from '../../../@types/guesses'
import { prisma } from '../../../database/prismaClient'

export const validateCreateGuessRequest = async (ctx: RouterContext) => {
  const { matchId } = ctx.request.body as NewGuess

  if (!matchId) {
    ctx.status = 400

    ctx.body = {
      message: 'Dados inválidos.',
    }

    return false
  }

  if (!validateTeamsScores(ctx)) {
    return false
  }

  if (!validateMatchExistsAndIsNotFinished(ctx)) {
    return false
  }

  return true
}

export const validateGuessDoesNotExists = async (
  ctx: RouterContext,
  userId: string
) => {
  const { matchId } = ctx.request.body as NewGuess

  try {
    const guessExists = await prisma.guess.findFirst({
      where: {
        user_id: userId,
        match_id: matchId,
      },
    })

    if (guessExists) {
      ctx.status = 400
      ctx.body = {
        message: 'Você já fez uma palpite para esse jogo.',
      }
      return false
    }

    return true
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
    return false
  }
}

const validateTeamsScores = (ctx: RouterContext) => {
  const { homeTeamScore, awayTeamScore } = ctx.request.body as NewGuess

  if (
    typeof homeTeamScore !== 'number' ||
    typeof awayTeamScore !== 'number' ||
    homeTeamScore < 0 ||
    awayTeamScore < 0 ||
    homeTeamScore > 30 ||
    awayTeamScore > 30 ||
    (!homeTeamScore && homeTeamScore !== 0) ||
    (!awayTeamScore && awayTeamScore !== 0)
  ) {
    ctx.status = 400

    ctx.body = {
      message: 'Scores inválidos.',
    }

    return false
  }
}

const validateMatchExistsAndIsNotFinished = async (ctx: RouterContext) => {
  const { matchId } = ctx.request.body as NewGuess

  try {
    const matchExistsAndIsNotFinished = await prisma.match.findFirst({
      where: {
        id: matchId,
        match_time: {
          gte: new Date(),
        },
      },
    })

    if (!matchExistsAndIsNotFinished) {
      ctx.status = 400

      ctx.body = {
        message: 'Jogo não existe ou já terminou.',
      }

      return false
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }

    return false
  }
}
