import { RouterContext } from '@koa/router'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NewUser } from '../../@types/users'
import { prisma } from '../../database/prismaClient'

export const create = async (ctx: RouterContext) => {
  const {
    name,
    username,
    email,
    password: passwordRequest,
  } = ctx.request.body as NewUser

  if (!validateCreateUserRequest(ctx)) {
    return
  }

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
        message: 'Email ou nome de usuário já cadastrado.',
      }
      return
    }

    const { password, ...user } = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: await hash(passwordRequest, 10),
      },
    })

    ctx.status = 201
    ctx.body = {
      user,
      message: 'Conta criada com sucesso!',
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}

export const list = async (ctx: RouterContext) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    })

    ctx.status = 200
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}

export const validateCreateUserRequest = (ctx: RouterContext) => {
  const { name, username, email, password } = ctx.request.body as NewUser

  if (!name || !username || !email || !password) {
    ctx.status = 400

    ctx.body = {
      message: 'Dados inválidos.',
    }

    return false
  }

  if (password.length < 8) {
    ctx.status = 400

    ctx.body = {
      message: 'A senha deve ter no mínimo 8 caracteres.',
    }

    return false
  }

  return true
}

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
