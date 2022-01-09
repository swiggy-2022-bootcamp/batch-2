const fs = require("fs");

const userDetailsPath = "./Registered_User_Details.json"

/*
The following function if for registering a user.
Input Parameters:
name - The name of the user
userName - The username of the user(Email) - has to be unique
password = The password of the user
Returns:
Success- if user can be added successfully.
Failure - if the username already exists.
ServerIssue - if the server is having trouble with JSON file
 */


const registerUser = (registrationName,userName,password) => 
{
    try
    {
        const Data = fs.readFileSync(userDetailsPath)
  
        // we create a JSON object by parsing the file  
        registeredData = JSON.parse( Data );
        // variable to check if user is already registered
        var userFound = false;
        for (var user in registeredData)
        {
            if (registeredData[user].userName == userName)
            {
                userFound = true;
                console.log("This username "+userName+ " is already registered. \n Please choose another" );
                return "Failure";
                
            }
        }
        // user not regsitered, so lets add him
        if (userFound == false)
        {   // the id - newuser+userName is going to unique
            // just to make the json file more readable
            // instead of having a array of all registered users
            // we have a json object of all users
            registeredData["newuser_"+userName]=
                {
                    "name": registrationName,
                    "userName": userName,
                    "password": password
                };
            try
            {
                fs.writeFileSync(userDetailsPath, JSON.stringify(registeredData,null, 2));
                console.log(" The user added successfully. His registration email is "+userName);
                return "Success";
                //res.end("user added successfully. His registration email is "+userName);
            }
            catch(err)
            {
                console.log("The Server is having trouble with JSON file", err);
                return "ServerIssue";
            }

        }
    }
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }
}

const listAllUsers = () =>
{
    try
    {
        const Data = fs.readFileSync(userDetailsPath);
        registeredData = JSON.parse( Data );
        console.log(registeredData);
        const dataString = JSON.stringify(registeredData);
        return dataString;

    }
    catch(err)
    {
        console.log("The Server is having trouble with JSON file", err);
        return "ServerIssue";
    }

}

module.exports = {registerUser,listAllUsers};