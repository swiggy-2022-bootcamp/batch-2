# Meeting Application - Case Study Problem

## Overview

The application that maintains meetings for a user (say, yourself). 

This application helps you manage your meetings - you can filter to view meetings (past, present and future), or
search for meetings based on the meetings description. 

You can add (i.e. create) meetings. You will by default be part of a meeting you create. The users added when creating a meeting will automatically be part of the meeting (no concept of accepting a meeting!). 

However, they can excuse themselves from the meeting (drop off from a scheduled meeting). 

## Table of Contents
* [Features](#features)
* [Additional Features](#additional-features)
* [Technologies & Libraries](#technologies-and-libraries)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)

## Features

1. User Registration
2. User Login to access the APIs.
3. Allows User to Create a Meeting.
4. Allows User to View Meetings.
5. Allows User to Search for Meeting by ID.
6. Allows User to Drop-Off from the Meeting.

## Additional features

1. Implemented JWT (Token Based Authentication) to prevent user from login again and again to access Protected APIs.
2. Allows User to View Past, Present & Future Meetings.
3. Allows User to Search for Meetings by Title & Description.
4. Allows User to Delete a Meeting.
5. Allows User to Add Users to a Meeting.
6. Allows User to Remove Users from a Meeting.
7. Allows User to Create a Team.
8. Allows User to View All Teams.
9. Allows User to Leave a Team.
10. Allows User to add a Member to a Team.
11. Allows User to remove a Member from a Team.
12. Allows User to add a Team to the Meeting

## Technologies and libraries

* [Node JS](https://nodejs.org/en/)
* [Express JS](https://expressjs.com/)
* [JWT](https://github.com/auth0/node-jsonwebtoken)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
* [MySQL](https://www.mysql.com/)
* [Moment JS](https://momentjs.com/)
* [Sequelize](https://sequelize.org/)

## Getting Started

### Pre-requisites

1. [Node JS](https://nodejs.org/en/)
2. [MySQL](https://www.mysql.com/)
3. [Postman](https://www.postman.com/) (Optional)

### Setup Instructions

- Clone the repository & checkout branch ```rahulpanchal```
```
git clone https://github.com/iamrahulpanchal/batch-2.git
cd batch-2
git switch rahulpanchal
```
- Install dependencies
```
cd meeting-app
npm i
```
- Configure MySQL Database
```
Create .env file under config/ folder and setup all the required variables
```
- Start Application
```
npm start
```
* Finally, import the postman collection in your local postman and test the APIs: <br/> 
[Meeting-App.postman_collection.json](https://raw.githubusercontent.com/iamrahulpanchal/batch-2/rahulpanchal/Meeting-App/Meeting-App.postman_collection.json)

## Project Structure
| Name | Description |
| ------------------------ | ---------------------------------------------------------------------------------------------
| **node_modules**         | Contains all required npm dependencies.                                                            |
| **src**                  | Contains all the app source code.                             |
| **src/config**           | Contains configuration files for Database & Sequelize Connection                          |
| **src/controllers**       | Contains all the handler for the requests.
| **src/middleware**              | Contains middleware for authenticating user before accessing protected routes                                           |
| **src/routes**           | Contains all the routes in the application.                                    
| **src/models**           | Contains all the sequelize schemas.
| **src/service**           | Contains all the code to interact with the database.
| app.ts        | Entry Point for the Node JS Application. Registers the routes and loads the configurations.                                                              
| package.json             | Contains npm dependencies as well as start scripts
