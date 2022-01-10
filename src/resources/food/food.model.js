import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['Vegetarian', 'Non Vegetarian', 'Eggetarian'],
            default: 'Vegetarian'
        },
        description: String,
        avgRating: {
            type: Number,
            default: 0
        },
        avgPrepTime: {
            type: Number,
            required: true
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'restaurant'
        }
    },
    {timestamps: true}
)

export const Food = mongoose.model('food', foodSchema)