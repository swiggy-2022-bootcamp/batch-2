# batch-2

# StackOverFlow Backend APIs

## by Neha Dinesh Prabhu

### what's in the repo?

- Basic APIs for stackOverFlow ,ade using Nodejs and mongoDB
- Frameworks/packages used : express, bcrypt, jsonwebtoken
- Contains API to singup, login, post a question, post an answer

### What I learnt?
- JWT auth functioning
- MongoDB
- Coding standards


### API Overviews:

1.SignUp    <br/>
Method Type: POST <br/>
URL: http://localhost:8080/signup <br/>

Sample payload:
```json
{
    "username":"Neha Prabhu",
    "email":"neha@gmail.com",
    "password":"xxxx"
}
```

2.Login 
Method Type: POST <br/>
URL: http://localhost:8080/login<br/>

Sample payload:
```json
{
    "email":"neha@gmail.com",
    "password":"xxxx"
}
```
3.Ask Question <br/>
Method Type: POST <br/>
URL: http://localhost:8080/question <br/>

Sample Payload:
```json
{
    “title”:”how to write nodejs program”,
    “text”:”I’m trying to build rest api with node and express js, I get error as express is
    missing”
}
```

4.Answer a question <br/>
Method Type: POST <br/>
URL: http://localhost:8080/answers <br/>

Sample Payload:
```json
{
    "question_id":"61db5f02e13166fad87c3cbb",
    "text": "earth is body of mass and water"
}
```

5. Get Answers
Method Type: GET
URL: http://localhost:8080/all-answers/{question_id}
