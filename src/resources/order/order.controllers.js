import { crudControllers } from "../../utils/crud"
import { Order } from "./order.model"

export const orderControllers = crudControllers(Order)

orderControllers.updateStatus = async (req, res) => {
    try{
        const updatedOrder = await Order.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                status: req.params.status
            },
            { new: true }
        )
        .lean()
        .exec()
    
        if(!updatedOrder){
            return res.status(400).send({ message: "No Order found" })
        }
        return res.status(201).json({ status: updatedOrder.status })
    }catch(e){
        console.log(e)
        return res.status(400).end()
    }
}

orderControllers.getStatus = async (req, res) => {
    try{
        const order = await Order.findOne(
            { 
                _id: req.params.id,
                createdBy: req.entity._id
            }
        ).lean()
        .exec()
    
        if(!order){
            return res.status(400).send({ message: "No Order found" })
        }
        return res.status(201).json({ status: order.status, estimateTime: order.estimateTime })
    }catch(e){
        console.log(e)
        return res.status(400).end()
    }
}