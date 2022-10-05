import Router from '@koa/router'

export const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = {
    message: 'Hello World!',
  }
})

router.get('/users', async (ctx) => {
  ctx.body = {
    message: 'Users!',
  }
})
