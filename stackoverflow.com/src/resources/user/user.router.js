import express from 'express'
import {me, updateMe} from './user.controller.js'
const router = express.Router()


router.get('/', me)
router.put('/', updateMe)

export default router