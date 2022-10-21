import { RouterContext } from '@koa/router'
import jwt from 'jsonwebtoken'

export const verifyToken = (ctx: RouterContext) => {
  if (!ctx.headers.authorization) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return false
  }

  try {
    const [type, accessToken] = ctx.headers.authorization.split(' ')
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!)

    if (!decodedToken || !decodedToken.sub) {
      ctx.status = 401
      ctx.body = {
        message: 'Não autorizado.',
      }
      return
    }

    const userId = decodedToken.sub.toString()

    return userId
  } catch (error) {
    ctx.status = 401
    ctx.body = {
      message: 'Não autorizado.',
    }
    return false
  }
}
