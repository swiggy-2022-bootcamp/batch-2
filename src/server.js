import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import { authControllers } from './utils/auth'
import { User } from './resources/user/user.model'
import { Restaurant } from './resources/restaurant/restaurant.model'
import foodRouter from './resources/food/food.router'
import restaurantRouter from './resources/restaurant/restaurant.router'
import userRouter from './resources/user/user.router'
import orderRouter from './resources/order/order.router'

// Create an Express App and add middlewares

const app = express()
app.disable('x-powered-by')

app.use(cors()) // Use this to allow CORS
app.use(json()) // Use this to convert the requests coming through api calls to JSON Objects
app.use(urlencoded({ extended: true })) // use this to encode api's and getch params
app.use(morgan('dev')) // use this for checking response times of api's in cli

// Create Authentication controllers for User and Restaurant
const restaurantAuthControllers = authControllers(Restaurant) 
const userAuthControllers = authControllers(User)

// Add POST Controllers to User SignUp and SignIn Routes
app.post('/userSignUp', userAuthControllers.signUp)
app.post('/userSignIn', userAuthControllers.signIn)

// Add POST Controllers to Restaurant SignUp and SignIn Routes
app.post('/restaurantSignUp', restaurantAuthControllers.signUp)
app.post('/restaurantSignIn', restaurantAuthControllers.signIn)

// Mount all available SubRoutes
app.use('/api/food', foodRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/user', userRouter)
app.use('/api/order', orderRouter)

let apiPort = 3000 // Default API Port
export const start = async() => {
    try{
        await connect() // Connect to DB
        app.listen(apiPort, () => { // Start Express Server
            console.log(`REST API available at http://localhost:${apiPort}`)
        })
    }catch(e){
        console.log(e)
    }
}
