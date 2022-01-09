This describes how to get started with the Stack Overflow backend application.

# Introduction
We use MYSQL server as our Database and NodeJS for building the backend.
We have implemented 12 REST APIs to facilitate the Use cases

# Data sources
We create the data based on requests from the REST CLIENT, in our case POSTMAN.
All the tables have been created in the database with the schema in the best 
possible way to serve the use cases of the Case study. 
Install MYSQL server if you haven't and spin it up.
Open CreateTableQueries.text in the database folder inside app folder of our repository.
Follow the instructions provided in the above file.
The data is then populated and used for the application using the following basic use cases.
1) Create User
2) Post Question
3) Post Answer

# Types of REQUESTS
We currently facilitate 12 kinds of requests.
1) POST Request at EndPoint http://localhost:8080/users/login for authenticating a user. CRUD operation : Read
2) POST Request at EndPoint http://localhost:8080/users/registerUser for creating a new user. CRUD operation : Create
3) GET Request at Endpoint http://localhost:8080/users/listAllUsers for listing all the users. CRUD operation : Read
4) POST Request at Endpoint http://localhost:8080/questions/addQuestion for posting a new question. CRUD operation : Create
5) POST request at Endpoint http://localhost:8080/answers/addAnswer for posting a new answer. CRUD operation : Create
6) PUT request at Endpoint http://localhost:8080/answers/updateAnswer for updating an answer. CRUD opeartion : Update
7) POST request at Endpoint http://localhost:8080/questions/getAllAnswersForQuestion/:id for getting all the answers for a given question ID in (:id part of the endpoint). CRUD operation : Read
8) GET request at Endpoint http://localhost:8080/questions/getAllQuestionsAndAnswers for getting all the questions with their corresponding answers. CRUD operation : Read
9) POST request at Endpoint http://localhost:8080/answers/upvoteAnswer/:id for upvoting an answer based on answer ID. CRUD operation : Create
10) DELETE Request at Endpoint http://localhost:8080/answers/deleteAnswer/:id for deleting an answer based on answer ID. CRUD operation : Delete
11) GET request at Endpoint http://localhost:8080/answers/getPrivilegedUsers for getting the points of Users who's answers have been upvoted, so that Privilged users can be identified. CRUD operation : Read
12) GET request at Endpoint http://localhost:8080/answers/upvoteCount" for getting the count of the upvotes of the answers that have been upvoted. CRUD operation : Read

# How to run the application:
1) Clone the repository/Download the repository from here
2) Go to the terminal and go to MySqlProject folder.
3) First Install nodeJS and Node Package Manager and confirm by typing node --version and npm --version in command line. 
4) Install the dependencies
    npm install express
    npm install mysql
    npm install cors
    npm install body-parser
5) Follow the steps mentioned Data Sources section to create the tables in the databases.
6) On the terminal in the MySQLProject folder, run node server.js
7) Install POSTMAN if you haven't
8) Make the requests on POSTMAN. Please refer to the TestCases.txt for example requests.

# ASSUMPTIONS 
1)User can answer a particular question only ONCE. IF HE Wants to change his answer, he can update his previous answer to that question USING A PUT REQUEST.
2) POINTS collected by a user based on upvotes, ONLY INCREASES. Even he deletes his answer, the points collected based on his upvotes for that answer earlier will remain and wont decrease.
3) AN ANSWER CAN be upvoted only ONCE by a particular user, EVEN IF the answer is updated the user who posted the answer.
4) Cannot update a question’s content. Please post a new question.
5) User is not allowed to upvote his own answer.
6) User is allowed to answer his own question.
7) Upvote remains even if the answer is updated.

# EXTENSIONS
The application can easily be extended to serve
1)Delete question. , so all its answers also gets deleted.
2)Get all particular users questions - read query- select
Based on username
3) Get all particular users answers - read query - select
Based on username
4)Display MOST upvoted answer for a question Based on question Id
5) VOTE QUESTIONS- same logic as vote answers

# OUTSIDE THE SCOPE OF THE PROJECT
HAVE TO TAKE CARE OF TYPE MISMATCH FROM POSTMAN, inside the json body - number instead of string…MYSQL accepts number as VARCHAR.Empty strings in postman. 
Example: Question and answer content shouldn’t be empty. Tried mysql not null constraint..but it allows empty string.
Username should be an email.
Password follow all required criteria like special characters, lowercase, uppercase etc. 
