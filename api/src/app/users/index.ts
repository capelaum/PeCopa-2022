import { RouterContext } from '@koa/router'
import { hash } from 'bcrypt'
import { NewUser } from '../../@types/users'
import { prisma } from '../../database/prismaClient'

export const create = async (ctx: RouterContext) => {
  const { name, username, email, password } = ctx.request.body as NewUser

  const hashPassword = await hash(password, 10)

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() },
        ],
      },
    })

    if (userExists) {
      ctx.status = 400
      ctx.body = {
        message: 'Email ou username já cadastrado.',
      }
      return
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashPassword,
      },
    })

    ctx.body = user
    ctx.status = 201
  } catch (error) {
    console.log('🚀 ~ error', error)
    ctx.body = error
    ctx.status = 500
  }
}

export const list = async (ctx: RouterContext) => {
  try {
    const users = await prisma.user.findMany()

    ctx.body = users
    ctx.status = 200
  } catch (error) {
    console.log('🚀 ~ error', error)
    ctx.body = error
    ctx.status = 500
  }
}
