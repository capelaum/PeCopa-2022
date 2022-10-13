import { RouterContext } from '@koa/router'
import { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NewUser } from '../../../@types/users'
import { prisma } from '../../../database/prismaClient'
import { validateCreateUserRequest } from '../validations/createUserValidations'

export const createUser = async (ctx: RouterContext) => {
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

    const token = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        expiresIn: '7d',
      },
      process.env.JWT_SECRET!
    )

    ctx.status = 201
    ctx.body = {
      token,
      user,
      message: 'Conta criada com sucesso!',
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
