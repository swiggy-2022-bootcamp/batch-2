import { Router } from "express";
import { protect } from '../../utils/auth'
import { Restaurant } from "../restaurant/restaurant.model";
import { User } from "../user/user.model";
import { orderControllers } from "./order.controllers";

const userProtect = protect(User)
const restaurantProtect = protect(Restaurant)

const router = Router()

router
    .route('/')
    .post(userProtect, orderControllers.createOne)

router
    .route('/:id')
    .get(userProtect, orderControllers.getOne)

router.put('/status/:id/:status', userProtect, orderControllers.updateStatus)
router.get('/status/:id', userProtect, orderControllers.getStatus)

export default router