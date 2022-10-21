import { RouterContext } from '@koa/router'
import { NewGuess } from '../../../@types/guesses'
import { prisma } from '../../../database/prismaClient'
import { verifyToken } from '../../auth/tokenValidation'

export const createGuess = async (ctx: RouterContext) => {
  const { matchId, homeTeamScore, awayTeamScore } = ctx.request.body as NewGuess

  if (!matchId) {
    ctx.status = 400

    ctx.body = {
      message: 'Dados inválidos.',
    }

    return
  }

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

    return
  }

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

      return
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }

    return
  }

  const userId = verifyToken(ctx)

  if (!userId) {
    return
  }

  // validateGuessDoesNotExists
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
      return
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
    return
  }

  try {
    const guess = await prisma.guess.create({
      data: {
        match_id: matchId,
        user_id: userId,
        home_team_score: homeTeamScore,
        away_team_score: awayTeamScore,
      },
    })

    ctx.status = 201
    ctx.body = {
      message: 'Aposta realizada com sucesso!',
      guess: {
        id: guess.id,
        matchId: guess.match_id,
        userId: guess.user_id,
        homeTeamScore: guess.home_team_score,
        awayTeamScore: guess.away_team_score,
        createdAt: guess.created_at,
        updatedAt: guess.updated_at,
      },
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
