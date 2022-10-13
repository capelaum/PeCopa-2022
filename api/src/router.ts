import Router from '@koa/router'
import { createGuess } from './app/guesses/useCases/createGuess'
import { listGuesses } from './app/guesses/useCases/listGuesses'
import * as matches from './app/matches'
import * as users from './app/users'

export const router = new Router()

router.get('/login', users.login)

router.get('/users', users.list)
router.post('/users', users.create)

router.get('/guesses', listGuesses)
router.post('/guesses', createGuess)

router.get('/matches', matches.list)
