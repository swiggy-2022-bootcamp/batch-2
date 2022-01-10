
# Meetings Application

A team utility app for scheduling meetings 

Features:
- Registration
- Login
- Schedule a Meeting
- Edit a Meeting
- Drop off a user from a meeting
## Docker Deployment

To run the project in Docker

```bash
  docker build . -t demo/meetings-app
  docker run -p 8080:8080 -d demo/meetings-app
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/murtaza896/batch-2/tree/main/Murtaza
```

Go to the project directory

```bash
  cd meetings_app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:demo
```


## API Reference

## User Registration

  - registration route

  ```http
    POST /api/user/signup
  ```

  #### Paylaoad
  ```json
  {
      "firstName": "Murtaza",
      "lastName": "Sadriwala",
      "emailAddress": "murtz27@gmail.com",
      "username": "murtz27",
      "password": "abc@123"
  }
  ```

  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `firstName` | `string` | **Required**.  |
  | `lastName` | `string` | **Required**.  |
  | `emailAddress` | `string` | **Required**. |
  | `username` | `string` | **Required**. |
  | `password` | `string` | **Required**. |


## User Login

  - authentication route

  ```http
    POST /api/user/login
  ```
  #### Paylaoad
  ```json
  {
      "username": "murtz27",
      "password": "abc@123"
  }
  ```

  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `username` | `string` | **Required**. |
  | `password` | `string` | **Required**. |


## User details

  - fetch all details of the authenticated user

  ```http
    GET /api/user
  ```

  #### Cookies
  ```
    auth-token: jwt-token
  ```

## Create meeting

  - schedules a meeting for participants
  - creator is by default a participant

  ```http
    POST /api/user/meetings
  ```

  #### Paylaoad
  ```json
  {
      "startTime": "1675890030032",
      "endTime": "1675990030032",
      "description": "My first ever meeting"
      "participant":{
        "add": ["murtz27@gmail.com", "murtz88@gmail.com"]
      },
  }
  ```

  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `startTime` | `timestamp` | **Required** in ms  |
  | `endTime` | `timestamp` | **Required**. in ms |
  | `description` | `string` | **Required**. |
  | `participant.add` | `Array(string)` | **Required**. valid user's email address |


## Get all meetings

  ```http
    GET /api/user/meetings
  ```
  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `auth-token` | `jwt` | **Required** in cookies  |


## Get deatils of meeting by id

  - fetch all details of a meeting by meeting id

  ```http
    GET /api/user/meetings/:meetingId
  ```
  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `auth-token` | `jwt` | **Required** in cookies  |
  | `meetingId` | `int` | **Required**  |


## Update deatils of meeting by id

  - update meeting details

  ```http
    PATCH /api/user/meetings/:meetingId
  ```

  #### Paylaoad
  ```json
  {
      "startTime": "1675890030032",
      "endTime": "1675990030032",
      "description": "My updated meeting"
  }
  ```

  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `startTime` | `timestamp` | **Required** in ms  |
  | `endTime` | `timestamp` | **Required**. in ms |
  | `description` | `string` | **Required**. |

## Drop user from meeting

  - deletes a user from a meeting
  - deletes a meeting if no more participants are left

  ```http
    DELETE /api/user/meetings/:meetingId/drop
  ```

  | Field | Type     | Description                |
  | :-------- | :------- | :------------------------- |
  | `meetingId` | `int` | **Required** |




## Appendix

#### major **npm** libraries used:
- express
- mongoose
- http-errors
- jsonwebtoken
- swagger-ui-express

#### Techstack:
- Node.js 17.3.0
- mongoDB
- Docker


