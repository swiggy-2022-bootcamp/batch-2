const fs = require("fs");

const userDetailsPath = "./Registered_User_Details.json"

/*
The following function checks if a user has entered correct login details.
Input Parameters:
userName - The username of the user
password = The password of the user
Returns:
String "Success" - when user has entered both username and password correctly.
String "IncorrectPassword" - when user has entered incorrect password for given username.
String "NotRegistered" - when given username has not been registered on the system.
String "ServerIssue" -  when we are having trouble reading the JSON file to authenticate the user.
 */

const authenticate = (userName,password) => 
{
    
    // we use synchronous read method,
    // so that any code below the readfile operation (like sending the response of the API)
    // happens only after the read operation
    // i have also tried asynch
    // where the responses of the API were integerated inside fs.readFile operation
    // so both cases work for me
    // i wanted to make the code more modular, so separated the authentication part into a new module
    // in ideal situation we use database/ asynch read/write as server will have to handle many read requests.
try
    {
    const Data = fs.readFileSync(userDetailsPath)
  
    // we create a JSON object by parsing the file  
    registeredData = JSON.parse( Data );
      
    // variable to check if the username if correct
    var userFound = false;
    for (var user in registeredData)
    {
        if (registeredData[user].userName == userName)
        {           

            userFound = true;
            if (registeredData[user].password == password)
            {
                console.log("The User: "+registeredData[user].name+" has successfully logged in");    
                return "Success";   
            }
            else
            {
                console.log("The password for "+userName+" is incorrect");    
                return "IncorrectPassword";
            }
        }
    }
    if (userFound == false)
    {
        console.log("The username "+ userName + "is not registered yet");
        return "NotRegistered";    
    }
    }
catch (err) 
{
    console.log("The Server is having trouble authenticating", err);
    return "ServerIssue";
}

}

module.exports = {authenticate};


