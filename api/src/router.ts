import Router from '@koa/router'
import { createGuess } from './app/guesses/useCases/createGuess'
import { listGuesses } from './app/guesses/useCases/listGuesses'
import * as matches from './app/matches'
import { createUser } from './app/users/useCases/createUser'
import { getUser } from './app/users/useCases/getUser'
import { listUsers } from './app/users/useCases/listUsers'
import { login } from './app/users/useCases/login'
import { updateUser } from './app/users/useCases/updateUser'

export const router = new Router()

router.get('/login', login)

router.get('/users', listUsers)
router.post('/users', createUser)
router.put('/users', updateUser)
router.get('/users/:username', getUser)

router.post('/guesses', createGuess)
router.get('/guesses/:username', listGuesses)

router.get('/matches', matches.list)
