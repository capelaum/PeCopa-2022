import { RouterContext } from '@koa/router'
import { NewGuess } from '../../../@types/guesses'
import { prisma } from '../../../database/prismaClient'
import { verifyToken } from '../../auth/tokenValidation'

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

  const isValidMatch = await validateMatchExistsAndIsNotFinished(ctx)

  if (!isValidMatch) {
    return false
  }

  const userId = verifyToken(ctx)

  if (!userId) {
    return false
  }

  const isGuessAlreadyNotCreated = await validateGuessDoesNotExists(ctx, userId)

  if (!isGuessAlreadyNotCreated) {
    return false
  }

  return userId
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

  return true
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
        home_team_slug: {
          not: '?',
        },
      },
    })

    if (!matchExistsAndIsNotFinished) {
      ctx.status = 400

      ctx.body = {
        message: 'Aposta inválida! Partida não encontrada ou já finalizada.',
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
