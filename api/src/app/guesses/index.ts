import { RouterContext } from '@koa/router'
import jwt from 'jsonwebtoken'
import { NewGuess } from '../../@types/guesses'
import { prisma } from '../../database/prismaClient'

export const create = async (ctx: RouterContext) => {
  const { matchId, homeTeamScore, awayTeamScore } = ctx.request.body as NewGuess

  if (!validateCreateGuessRequest(ctx)) {
    return
  }

  const userId = verifyToken(ctx)

  if (!userId) {
    return
  }

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
        message: 'Palpite já existe.',
      }
      return
    }

    const guess = await prisma.guess.create({
      data: {
        match_id: matchId,
        user_id: userId,
        home_team_score: homeTeamScore,
        away_team_score: awayTeamScore,
      },
    })

    ctx.status = 201
    ctx.body = guess
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}

const validateCreateGuessRequest = async (ctx: RouterContext) => {
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

const verifyToken = (ctx: RouterContext) => {
  if (!ctx.headers.authorization) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return false
  }

  try {
    const [type, accessToken] = ctx.headers.authorization.split(' ')
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!)

    if (!decodedToken || !decodedToken.sub) {
      ctx.status = 401
      ctx.body = {
        message: 'Não autorizado.',
      }
      return
    }

    const userId = decodedToken.sub.toString()

    return userId
  } catch (error) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return false
  }
}
