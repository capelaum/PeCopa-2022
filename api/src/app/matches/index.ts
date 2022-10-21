import { RouterContext } from '@koa/router'
import { addDays, formatISO } from 'date-fns'
import { prisma } from '../../database/prismaClient'

export const list = async (ctx: RouterContext) => {
  const currentDate = ctx.request.query.matchTime as string

  try {
    let matches = await prisma.match.findMany()

    if (currentDate) {
      matches = await prisma.match.findMany({
        where: {
          match_time: {
            gte: currentDate,
            lt: formatISO(addDays(new Date(currentDate), 1)),
          },
        },
      })
    }

    const formatedMatches = matches.map((match) => {
      return {
        id: match.id,
        group: match.group,
        round: match.round,
        matchTime: match.match_time,
        homeTeam: {
          slug: match.home_team_slug,
          name: match.home_team_name,
        },
        awayTeam: {
          slug: match.away_team_slug,
          name: match.away_team_name,
        },
      }
    })

    formatedMatches.sort((a, b) => {
      return new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime()
    })

    ctx.status = 200
    ctx.body = formatedMatches
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
