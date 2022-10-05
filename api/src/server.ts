import Router from '@koa/router'
import Koa from 'koa'

const app = new Koa()
const router = new Router()

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

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3333, () => console.log('Server running on port 3333'))
