# Batch 2 : Swiggy i++ 

## Author: Shriyadita Roy

## Food App API

The "Food App" is a web application that facilitates users to order food online from different restaurants using the web-app to cater their needs. This solution has been built in accordance to the [second problem statement](batch-2/food-app-api/Problem_Statement_2_Food_App.pdf) out of given 3 problem statements for Swiggy i++. This app uses Node and Express to handle backend API endpoints, with MongoDB as the database. 

### Requirements to run in local system

1. node.js
2. MongoDB

### Usage

To use the app locally in your system, follow these steps:

1. Clone the source folder **food-app-api**
2. Open a terminal in the same directory.
3. Run `npm install`.
4. If aforementioned command runs successfully, then run `npm start`. Do not close this window unless you want to shut down the Food App.
5. Use [localhost:8000](https://localhost:8000) domain for testing all API endpoints.

>#### User routes:
>* [/api/register [POST]](https://localhost:8000/api/register)
>* [/api/authenticate [POST]](https://localhost:8000/api/authenticate)
>* [/api/users [GET]](https://localhost:8000/api/users)
>* [/api/users/:userID [GET]](https://localhost:8000/api/users/)
>* [/api/users/:userID [PUT]](https://localhost:8000/api/users/test1)
>* [/api/users/:userID [DELETE]](https://localhost:8000/api/users/test1)


>#### Food routes:
>* [/api/food/ [POST]](https://localhost:8000/api/food)
>* [/api/food/:foodID [GET]](https://localhost:8000/api/food/1)
