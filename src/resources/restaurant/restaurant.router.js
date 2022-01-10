import { Router } from "express";
import { protect } from '../../utils/auth'
import { Restaurant } from "../restaurant/restaurant.model";
import { restaurantControllers } from "./restaurant.controllers";

const protectRestaurant = protect(Restaurant)


const router = Router()

router
    .route('/:id')
    .put(protectRestaurant, restaurantControllers.updateOne)
    .delete(protectRestaurant, restaurantControllers.removeOne)
    .get(restaurantControllers.getOne)

router.put('/updateRating/:id/:avgRating', protectRestaurant, restaurantControllers.updateRating)

export default router