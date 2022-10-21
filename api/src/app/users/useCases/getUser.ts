import { RouterContext } from '@koa/router'
import { prisma } from '../../../database/prismaClient'

export const getUser = async (ctx: RouterContext) => {
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

    ctx.status = 200
    ctx.body = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
