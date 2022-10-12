import Router from '@koa/router'
import * as guesses from './app/guesses'
import * as matches from './app/matches'
import * as users from './app/users'

export const router = new Router()

router.get('/login', users.login)

router.get('/users', users.list)
router.post('/users', users.create)

router.post('/guesses', guesses.create)

router.get('/matches', matches.list)
