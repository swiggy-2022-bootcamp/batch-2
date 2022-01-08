const sql = require("./db.js")



// LOGIN

const loginUser = (req,res) =>
{

}


//signup user
const createUser = (req,res) => 
{
    const userData=
    {       
        registrationName: req.body.registrationName,
        userName : req.body.userName,
        password : req.body.password
    }
    const queryString = 'SELECT * FROM UserDetails where userName = ?;';
    sql.query(queryString,userData.userName,(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(400).send({ message: 'This is an error!'});
        }
        else
        {
            result = JSON.parse(JSON.stringify(result));
            //console.log(result.length);
            if (result.length == 1)
            {
                console.log("Username already registered.Please choose another");
                res.status(403).send({ message: 'Username already registered.Please choose another'});
        
            }
            else
            {
                console.log("adding the new user");
                const queryString2 = 'INSERT into UserDetails SET ? ; '
                sql.query(queryString2,userData,(err, result) =>
                {
                    if (err) 
                    {
                        console.log("error: ",err)
                        res.status(400).send({ message: 'This is an error!'});
                    }
                    else
                    {
                        console.log("User created Successfully");
                        res.status(201).send({message:"User created Successfully for user "+userData.registrationName+" with email "+ userData.userName });
                    }
                });
            }   
        }   
    });  
}

// list all users
const listAllUsers = (req,res) =>
{
    sql.query("Select * from UserDetails",(err,result) => 
    {
        if(err)
        {
            console.log("error: ",err)
            res.status(404).send({ message: 'This is an error!'});
        }
        else
        {
            //console.log(JSON.stringify(result));
            res.status(200).send(JSON.stringify(result));
        }       
       
    });
}
module.exports = {createUser,listAllUsers}




