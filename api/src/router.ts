import Router from '@koa/router'
import * as guesses from './app/guesses'
import * as users from './app/users'

export const router = new Router()

router.get('/users', users.list)
router.post('/users', users.create)

router.post('/guesses', guesses.create)
