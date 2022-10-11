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

    ctx.status = 200
    ctx.body = matches
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
