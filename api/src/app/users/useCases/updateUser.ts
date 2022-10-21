import { RouterContext } from '@koa/router'
import { hash } from 'bcrypt'
import { User } from '../../../@types/users'
import { prisma } from '../../../database/prismaClient'
import { verifyToken } from '../../auth/tokenValidation'

export const updateUser = async (ctx: RouterContext) => {
  const {
    username,
    name,
    email,
    password: passwordRequest,
  } = ctx.request.body as User

  const isPasswordChanged = passwordRequest.length > 0

  const userId = verifyToken(ctx)

  if (!userId) {
    return
  }

  if (
    (isPasswordChanged && passwordRequest.length < 8) ||
    passwordRequest.length > 255
  ) {
    ctx.status = 400

    ctx.body = {
      message: 'A senha deve ter no mínimo 8 caracteres.',
    }

    return
  }

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!findUser) {
      ctx.status = 404
      ctx.body = { message: 'Usuário não encontrado.' }
      return
    }

    const findUserWithSameUsernameOrEmail = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (
      findUserWithSameUsernameOrEmail &&
      username !== findUser.username &&
      email !== findUser.email
    ) {
      ctx.status = 400
      ctx.body = {
        message: 'Já existe um usuário com esse nome de usuário ou e-mail.',
      }
      return
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        name,
        email,
        password: isPasswordChanged
          ? await hash(passwordRequest, 10)
          : findUser.password,
      },
    })

    ctx.status = 200
    ctx.body = {
      message: 'Usuário atualizado com sucesso!',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.created_at,
        updatedAt: updatedUser.updated_at,
      },
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = { message: (error as Error).message }
  }
}
