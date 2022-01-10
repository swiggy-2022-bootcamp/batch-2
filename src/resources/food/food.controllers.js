import { Food } from "./food.model"
import { crudControllers } from "../../utils/crud"

export const foodControllers = crudControllers(Food) // Import Generic Crud Controllers

foodControllers.updateRating = async (req, res) => {
    try{
        const updatedFood = await Food.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.entity._id
            },
            {
                avgRating: req.params.avgRating
            },
            { new: true }
        )
        .lean()
        .exec()
    
        if(!updatedFood){
            return res.status(400).end()
        }
        return res.status(201).json({ avgRating: updatedFood.avgRating })
    }catch(e){
        return res.status(400).end()
    }
}

foodControllers.getByRestaurant = async (req, res) => {
    try {
    const docs = await Food
      .find({ createdBy: req.params.id })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}