import { crudControllers } from "../../utils/crud";
import { Restaurant } from "./restaurant.model";

export const restaurantControllers = crudControllers(Restaurant)


restaurantControllers.updateRating = async (req, res) => {
    try{
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                avgRating: req.params.avgRating
            },
            { new: true }
        )
        .lean()
        .exec()
    
        if(!updatedRestaurant){
            return res.status(400).send({ message: "No Restaurant found" })
        }
        return res.status(201).json({ avgRating: updatedRestaurant.avgRating })
    }catch(e){
        console.log(e)
        return res.status(400).end()
    }
}