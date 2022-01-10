# Teams application

- This repository consists of the codes for the backend of an application to help and manage meetings for a user.

Features:
- User Registration
- Login
- Schedule a Meeting
- Edit a Meeting
- Drop off a user from a meeting
- Create Meeting Invite Link (with different access level)
- Join Meeting with the Invite Link 

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
- Start the server using the command
```
 node server.js
 ```
- With this, the server starts listening for requests and API is up and working to test around

## Endpoints
### User related endpoints
### `POST: /users/`
Result:
Register a new user and login the user with proper json web token
#### Payload
  ```json
  {
    "email":"ns26@iitbbs.ac.in",
    "password":"pass",
    "name":"nikhil"
  }
  ```

### `GET: /users/`
Result:
Get all users infor

### `GET: /users/:id`
Result:
Find a user with UserId 

### `PUT: /users/id`
Result:
Update user info by UserId

### `DELETE: /users/id`
Result:
Delete User by UserId

### Auth endpoints
### `POST: /auth/login`
Result:
Login a new user along with Json web token 
#### Payload
  ```json
  {
    "email":"ns26@iitbbs.ac.in",
    "password":"pass"
  }
  ```
### Meetings related endpoints

### `POST: /meetings/`
Result:
Create a new meeting
#### Payload
 ```json
  {
    "startTime":"09/01/22 6:45:00",
    "endTime":"09/01/22 9:45:00",
    "description":"first test meeting",
    "members":[2,6],
    "inviteLinkAccess":true
  }
 ```

### `GET: /meetings/`
Result:
Get all meetings info

### `GET: /meetings/:id`
Result:
Find a meeting with meetingId 

### `GET: /meetings/withCreatorId/:id`
Result:
Find all the meetings created by a UserID

### `GET: /meetings/withMemberId/:id`
Result:
Find all the meeting having a specific userId as a member 

### `DELETE: /meetings/:id`
Result:
Delete meeting with ID

### `DELETE: /meetings/dropoff/:id`
Result:
Delete table entry for dropoff request

### `GET: /meetings/creatInviteLink/:id`
Result: create a meeting invite Link based on the access level defined by the meeting creator

### `GET: /meetings/joinWithInviteLink/:encryptedMeetingId`
Result: join a meeting's member list by the following the invite link