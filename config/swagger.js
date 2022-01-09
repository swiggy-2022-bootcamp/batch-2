const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'config/swiggy-backend-api-v0.0.1.json'
const endpointsFiles = ['routes/user.router.js', 'routes/food.router.js']

const doc = {
    info: {
        version: "0.0.1",
        title: "Swiggy Backend API",
        description: "Online Food Ordering Platform."
    },
    host: "localhost:3200",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        },
        {
            "name": "Food",
            "description": "Endpoints"
        }
    ],
    definitions: {
        User: {
            "id": 1,
            "username": "achilles",
            "email": "achilles98@gmail.com",
            "password": "nicetry",
            "phone": 987654321,
            "address": {
                "id": 1,
                "house_no": 1,
                "street": "Brooklyn Avenue",
                "city": "NY",
                "state": "New York",
                "zip": 11201
            }
        },
        UpdateUser: {
            "username": "achilles",
            "email": "achilles98@gmail.com",
            "password": "nicetrybro",
            "phone": 987654312,
            "address": {
                "house_no": 1,
                "street": "First Avenue",
                "city": "NY",
                "state": "New York",
                "zip": 11201
            }
        },
        Users: [{
            "id": 1,
            "username": "achilles",
            "email": "achilles98@gmail.com",
            "password": "nicetry",
            "phone": 987654321,
            "address": {
                "id": 1,
                "house_no": 1,
                "street": "Brooklyn Avenue",
                "city": "NY",
                "state": "New York",
                "zip": 11201
            }
        },
        {
            "id": 2,
            "username": "ron",
            "email": "ron@gmail.com",
            "password": "anothernicetry",
            "phone": 987456321,
            "address": {
                "id": 1,
                "house_no": 95,
                "street": "Second Avenue",
                "city": "NY",
                "state": "New York",
                "zip": 11203
            }
        }],
        UserProfile: {
            "status": "true",
            "user": {
                "username": "achilles",
                "email": "achilles98@gmail.com",
                "phone": 987654321,
                "address": {
                    "id": 1,
                    "house_no": 1,
                    "street": "Brooklyn Avenue",
                    "city": "NY",
                    "state": "New York",
                    "zip": 11201
                }
            }
        },
        Food: {
            "id": 1,
            "food_id": 10,
            "food_name": "Chicken Barbeque Pizza",
            "food_cost": 50,
            "food_type": "Non-Veg Pizza"
        },
        UpdatedFood: {
            "id": 1,
            "food_id": 10,
            "food_name": "Chicken Barbeque Pizza",
            "food_cost": 70,
            "food_type": "Non-Veg Pizza"
        },
        Foods: [{
            "id": 1,
            "food_id": 10,
            "food_name": "Chicken Barbeque Pizza",
            "food_cost": 50,
            "food_type": "Non-Veg Pizza"
        },
        {
            "id": 2,
            "food_id": 11,
            "food_name": "Chicken Special Pizza",
            "food_cost": 60,
            "food_type": "Non-Veg Pizza"
        }],
        UserAuthDtls: {
            "username": "achilles",
            "password": "nicetry"
        },
        LoginSuccessResponse: {
            "message": "User logged in successfully!",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ4NjFiNzNkN2UwMzYzZDlmNGY0YjkiLCJpYXQiOjE2NDE1NzA3OTMsImV4cCI6MTY0MTU3MTM5M30.NbPF0xEtsYSvYopE9nD5FDMbqmCqoi_ZO4NhLj2yN2E"
        },
        Login401ErrorResponse: {
            "message": "User Name is not registered!"
        },
        RegisterSuccessResponse: {
            "message": "User Registered Successfully!",
            "user": this.User
        },
        Register409UsernameErrorResponse: {
            "message": "Username already registered!"
        },
        Register409EmailErrorResponse: {
            "message": "Email already registered!"
        },
        Register409PhoneNumberErrorResponse: {
            "message": "Phone number already registered!"
        },
        ChangeUsername409ErrorResponse: {
            "message": "Username can't be changed!"
        },
        FetchUser404ErrorResponse: {
            "message": "Sorry, user with id: 10 not found!"
        },
        UserDeletedSuccessMessage: {
            "message": "User deleted successfully!"
        },
        FoodDeletedSuccessMessage: {
            "message": "Food deleted successfully!"
        },
        FetchFood404ErrorResponse: {
            "message": "Sorry, Food with Food ID: 10 not found!"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)