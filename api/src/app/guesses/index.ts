import { RouterContext } from '@koa/router'
import { NewGuess } from '../../@types/guesses'
import { prisma } from '../../database/prismaClient'
import {
  validateCreateGuessRequest,
  validateGuessDoesNotExists,
} from './validations/createGuessValidations'
import { verifyToken } from './validations/tokenValidation'

export const create = async (ctx: RouterContext) => {
  const { matchId, homeTeamScore, awayTeamScore } = ctx.request.body as NewGuess

  if (!validateCreateGuessRequest(ctx)) {
    return
  }

  const userId = verifyToken(ctx)

  if (!userId) {
    return
  }

  const isGuessAlreadyNotCreated = await validateGuessDoesNotExists(ctx, userId)

  if (!isGuessAlreadyNotCreated) {
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
