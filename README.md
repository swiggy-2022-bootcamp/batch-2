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

1.SignUp    
Method Type: POST
URL: http://localhost:8080/signup

Sample payload:
{
    "username":"Neha Prabhu",
    "email":"neha@gmail.com",
    "password":"xxxx"
}

2.Login    
Method Type: POST
URL: http://localhost:8080/login

Sample payload:
{
    "email":"neha@gmail.com",
    "password":"xxxx"
}

3.Ask Question
Method Type: POST
URL: http://localhost:8080/question

Sample Payload:
{
    “title:”:”how to write nodejs program”,
    “text”:”I’m trying to build rest api with node and express js, I get error as express is
    missing”
}

4.Answer a question
Method Type: POST
URL: http://localhost:8080/answers

Sample Payload:
{
    "question_id":"61db5f02e13166fad87c3cbb",
    "text": "earth is body of mass and water"
}

5. Get Answers
Method Type: GET
URL: http://localhost:8080/all-answers/{question_id}
