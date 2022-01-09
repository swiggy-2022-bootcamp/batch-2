
# Meetings Application

A team utility app for scheduling meetings 


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

* ## User Registration

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


* ## User Login

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


* ## User details

```http
  GET /api/user
```

#### Cookies
```
  auth-token: ""
```


