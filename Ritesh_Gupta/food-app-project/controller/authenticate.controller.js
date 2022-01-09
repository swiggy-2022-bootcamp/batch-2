const query = require('../db/query');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const dbName = "swiggy_bootcamp.users";
const JWT_SECRECT_KEY = process.env.JWT_SECRECT_KEY;



const validateInputs = (req, res, next) => {
    const fields = ['userid', 'username', 'password'];
    const userDetails = req.body;

    for(let i = 0; i < fields.length; i++){
        fieldName = fields[i];

        if(!userDetails.hasOwnProperty(fieldName) || userDetails[fieldName].length === 0) {
            res.status(400).json({
                status : 400,
                error : `${fieldName} empty`
            });

            return;
        }
    }

    next();

}


const authenticateUser = async (req, res) => {
    const userDetails = req.body;
    const {userid , username, password} = userDetails
    console.log(userid, username, password);

    const sql = `SELECT password FROM ${dbName} WHERE userid = '${userid}' AND username = '${username}'`;

    try{
        const result = await query(sql);
        console.log(result)
        if (result.length === 0)
            {
                res.status(403).json({
                    message : "User details are wrong"
                })

                return;
            }

        const hash = result[0].password;
        const isPasswordCorrect = await bcrypt.compare(password, hash);

        if (isPasswordCorrect){

            const payload = {userid : userid}
            const token = await jwt.sign(payload, JWT_SECRECT_KEY, { expiresIn: '10d' })
            
            res.status(200).json({
                message: "User logged in successful",
                token : token
            })

        } else{
            res.status(403).json({
                message : "User details are wrong"
            })
        }
        

    }
    catch(err){
        console.log("Error validating user", err);
        res.status(403).json({
            error : err
        })
    }


    
}

module.exports = {validateInputs, authenticateUser}