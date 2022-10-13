import { RouterContext } from '@koa/router'

export const list = (ctx: RouterContext) => {
  ctx.body = {
    message: 'Hello World!',
  }
}
