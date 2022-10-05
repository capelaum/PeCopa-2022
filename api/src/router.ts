import Router from '@koa/router'
import { User } from './@types/users'

export const router = new Router()

const users: User[] = []

router.get('/users', async (ctx) => {
  ctx.body = users
})

router.post('/users', async (ctx) => {
  const { username, name, email, password } = ctx.request.body as User

  const user = {
    username,
    name,
    email,
    password,
  }

  users.push(user)

  ctx.body = user
})
