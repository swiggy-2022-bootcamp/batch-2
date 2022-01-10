import { Router } from "express";
import { foodControllers } from './food.controllers'
import { protect } from '../../utils/auth'
import { Restaurant } from "../restaurant/restaurant.model";

const protectRestaurant = protect(Restaurant)

const router = Router()

router
    .route('/')
    .post(protectRestaurant, foodControllers.createOne)

router
    .route('/:id')
    .put(protectRestaurant, foodControllers.updateOne)
    .delete(protectRestaurant, foodControllers.removeOne)

router.put('/updateRating/:id/:avgRating', protectRestaurant, foodControllers.updateRating)
router.get('/getMenu/:id', foodControllers.getByRestaurant)

export default router