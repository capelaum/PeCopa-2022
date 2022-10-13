import { RouterContext } from '@koa/router'
import { prisma } from '../../../database/prismaClient'

export const listUsers = async (ctx: RouterContext) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    })

    const formatedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      }
    })

    ctx.status = 200
    ctx.body = formatedUsers
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
