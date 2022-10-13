import { RouterContext } from '@koa/router'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../database/prismaClient'

export const login = async (ctx: RouterContext) => {
  const userTokenData = getUserTokenData(ctx)

  if (!userTokenData) {
    return
  }

  const { email, plainTextPassword } = userTokenData

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      ctx.status = 401
      ctx.body = {
        message: 'Email não está cadastrado.',
      }
      return
    }

    const passwordMatch = await compare(plainTextPassword, user.password)

    if (!passwordMatch) {
      ctx.status = 401
      ctx.body = {
        message: 'Senha incorreta.',
      }
      return
    }

    const { password, ...userWithoutPassword } = user

    const token = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        expiresIn: '7d',
      },
      process.env.JWT_SECRET!
    )

    ctx.status = 200
    ctx.body = {
      token,
      user: userWithoutPassword,
      message: 'Login realizado com sucesso.',
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}

const getUserTokenData = (ctx: RouterContext) => {
  if (!ctx.headers.authorization) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return
  }

  try {
    const [type, accessToken] = ctx.headers.authorization.split(' ')
    const decodedToken = Buffer.from(accessToken, 'base64').toString('ascii')
    const [email, plainTextPassword] = decodedToken.split(':')

    if (!email || !plainTextPassword) {
      ctx.status = 401
      ctx.body = {
        message: 'Não autorizado.',
      }
      return
    }

    return { email, plainTextPassword }
  } catch (error) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return
  }
}
