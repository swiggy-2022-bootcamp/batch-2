import { Router } from 'express'
import { protect } from '../../utils/auth'
import { User } from './user.model'
import { userControllers } from './user.controllers'

const protectUser = protect(User)

const router = Router()

router
    .route('/:id')
    .put(protectUser, userControllers.updateOne)

export default router
