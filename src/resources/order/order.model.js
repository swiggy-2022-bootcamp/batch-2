import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        foodId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'food'
        },
        restaurantId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'restaurant'
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'user'
        },
        status: {
            type: String,
            enum: ['Order Placed', 'Order Accepted', 'Preparing', 'In Transit', 'Delivered', 'Cancelled'],
            default: 'Order Placed'
        },
        orderedTime: {
            type: Date,
            default: Date.now()
        },
        estimateTime: {
            type: Number,
            default: 30
        }
    },
    {timestamps: true}
)

export const Order = mongoose.model('order', orderSchema)