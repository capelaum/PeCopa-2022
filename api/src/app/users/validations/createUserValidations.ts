import { RouterContext } from '@koa/router'
import { NewUser } from '../../../@types/users'

export const validateCreateUserRequest = (ctx: RouterContext) => {
  const { name, username, email, password } = ctx.request.body as NewUser

  if (!name || !username || !email || !password) {
    ctx.status = 400

    ctx.body = {
      message: 'Dados inválidos.',
    }

    return false
  }

  if (password.length < 8 || password.length > 255) {
    ctx.status = 400

    ctx.body = {
      message: 'A senha deve ter no mínimo 8 caracteres.',
    }

    return false
  }

  return true
}
