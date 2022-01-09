import express from 'express'
import {displayUserInfo, updateUserIndo} from '../controller/user.controller.js'
const router = express.Router()

//get user info
router.get('/', displayUserInfo)

//update user info
router.put('/', updateUserIndo)

export default router
