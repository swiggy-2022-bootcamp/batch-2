<<<<<<< HEAD
# swiggy-backend-api
 Backend APIs for an online Food Ordering Platform.

# Swiggy

## Problem Statement Overview

It is known fact that in today’s work-from-home world, people prefer ordering food that can be delivered at the comfort of their home. So most of the times people end up ordering food from restaurants that have delivery services. The objective of this problem statement is to come up with a solution for people to order food online and get prompt delivery.
We need to solve the given problem by developing a web application, that should facilitate users to order food online from different restaurants using the web-app to cater their needs.

## Features

1. A new user may register in the system using a valid email.
2. The user may login to the system to access the platform features.
3. The user may add a new food.
4. The user may browse through the foods on the platform.
5. The user may update his profile.
6. The user may delete his profile.
7. User profiles can be fetched all at once or by IDs.

## Additional features

1. On login, user receives a time-limited token to access the platform features without re-entering the login credentials everytime.
2. The user may fetch his profile by the JSON Web Token.
3. The user may update existing food.
4. Developers of the platform can browse and test the APIs through Swagger-UI.

## Technologies and libraries

1. [NodeJs](https://nodejs.org/en/)
2. [ExpressJs](https://expressjs.com/)
3. [PassportJS](https://www.passportjs.org/)
4. [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
5. [MongoDB](https://www.mongodb.com/)
6. [Mongoose](https://mongoosejs.com/)
7. [Swagger-UI](https://swagger.io/tools/swagger-ui/)

## Code Structure

* <strong>app.js</strong>: Entry point for the nodejs application. Registers the routes and loads the configurations. Creates a listener for incoming requests.

* <strong>config</strong>: This module contains all the app configurations and the platform api swagger contract.

* <strong>routes</strong>: This module contains all the request routes of the app.

* <strong>controller</strong>: This module contains all the handlers for the requests.

* <strong>model</strong>: This module contains all the MongoDb schemas.

* <strong>utils</strong>: This module contains all the app util implementations.

### Developed by [Ranajoy Hajra](mailto:ranajoyhajra@gmail.com), a software developer by profession and web app development connoiseur by heart!
=======
# batch-2
>>>>>>> 9e415dacc8d26b0beb82ee8cd7fa882a40ee5c65
