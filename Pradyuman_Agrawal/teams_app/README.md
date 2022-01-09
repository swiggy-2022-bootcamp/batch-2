# TEAM_APP

- This repository consists of the codes for the backend of an application to help and manage meetings for a user.


## Setting up environment
- Download the code to your local system using git clone.
- Have a local instance of MYSQL server running on you laptop.
     - You can also spin up a docker container with the official MySQL image to avoid a confusing MySQL setup.

To spin up MYSQL server as a container

```
docker run -p 3306:3306 --name nodejs-mysql 
-e MYSQL_ROOT_PASSWORD=pass 
-e MYSQL_DATABASE=user_db 
-d mysql:5.7
```

To open the container with an interactive shell

```
docker exec -it <container-id> bash
```
 
- Install the npm modules
```
 npm install
 ```
- Start the server using command
```
 node server.js
 ```
- With this the server starts listening for request and API is up and working to test around

## Endpoints

### `POST: /users/`
Result:
Register a new user

### `GET: /users/`
Result:
Get all users

### `GET: /users/:id`
Result:
Find a user with UserId 

### `PUT: /users/id`
Result:
Update user info by UserId

### `DELETE: /users/id`
Result:
Delete User by UserId

