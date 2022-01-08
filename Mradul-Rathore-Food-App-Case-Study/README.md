# Problem Statement

It is known fact that in today’s work-from-home world, people prefer ordering food that can be delivered at the comfort of their home. So most of the times people end up ordering food from restaurants that have delivery services. The objective of this problem statement is to come up with a solution for people to order food online and get prompt delivery. You need to solve the given problem by developing a web application, that should facilitate users to order food online from different restaurants using the web-app to cater their needs. 

# Scope of work

You have been asked to build the backend system for the following:
- Registration
- Login and
- Display the list of Food items 

## API Endpoints

- /api/register
    - To register the user with basic
details
- /api/authenticate 
    - To validate the user is registered in the system
- /api/users 
    - To get all the users who are registered to the system, the end point should return an array
- /api/users/:userID 
    - To return user by specifying id 
- /api/users 
    - Should update the user specified in the payload which shall match the ID and updated the existing user with the new details
- /api/users/:userID
    - Should delete the user which is specified in the :userID 
- /api/food 
    - To add a new food to the system
- /api/food/:foodID 
    - To return a food item specified with :foodID 