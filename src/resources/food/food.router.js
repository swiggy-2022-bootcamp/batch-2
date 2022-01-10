import { Router } from "express";
import { foodControllers } from './food.controllers'
import { protect } from '../../utils/auth'
import { Restaurant } from "../restaurant/restaurant.model";

const protectRestaurant = protect(Restaurant)

const router = Router() // Create a Sub Route

router
    .route('/')
    .post(protectRestaurant, foodControllers.createOne) // Route for Creating a Food entity

router
    .route('/:id')
    .put(protectRestaurant, foodControllers.updateOne) // for Updating a Food entity
    .delete(protectRestaurant, foodControllers.removeOne) // for Deleting a Food entity

router.put('/updateRating/:id/:avgRating', protectRestaurant, foodControllers.updateRating) // for Updating Rating for a Food item
router.get('/getMenu/:id', foodControllers.getByRestaurant) // for getting list of all Food Items in a Restaurant

export default router