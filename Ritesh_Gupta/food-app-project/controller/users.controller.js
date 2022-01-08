const query = require('../db/query');
const dbName = "swiggy_bootcamp.users";

const getAllUsers = async (req, res) => {
    const sql = `SELECT * FROM ${dbName}`;
    try{
        const result = await query(sql);
        
        res.status(200).json({
            users : result
        })

    } catch(err){
        console.log(err)
        res.status(403).json({
            message : err.sqlMessage
        })
    }

}

const getUserById = async (req, res) => {
    const userid = req.params.userid;
    console.log(userid);

    const sql = `SELECT * FROM ${dbName} WHERE userid = '${userid}' `;
    try{
        const result = await query(sql);
        
        if (result.length > 0){
            res.status(200).json({
                users : result
            })
        } else {
            res.status(403).json({
                message : `Sorry user with userid : ${userid} not found`
            })
        }
        

    } catch(err){
        console.log(err)
        res.status(403).json({
            users : err.sqlMessage
        })
    }

}


const updateUser = async (req, res) => {
    const userDetails = req.body;
    console.log(userDetails);

    const sql = `UPDATE ${dbName} SET username = '${userDetails.username}', email = '${userDetails.email}', password = '${userDetails.password}', houseno = ${userDetails.address.houseno}, street = '${userDetails.address.street}', city = '${userDetails.address.state}', zip = ${userDetails.address.zip} WHERE userid = '${userDetails.userid}' `;


    try{
        const result = await query(sql);
        
        if(result.affectedRows === 1){
            res.status(200).json({
                message : "Update successful",
                result : userDetails
            });
        } else{
            res.status(403).json({
                message : `Sorry user with userid : ${userDetails.userid} not found`
            });
        }
        

    } catch(err){
        console.log(err)
        res.status(403).json({
            users : err.sqlMessage
        })
    }
}

const deleteUserById = async (req, res) => {
    const userid = req.params.userid;
    console.log(userid);

    const sql = `DELETE FROM ${dbName} WHERE userid = '${userid}' `;

    
    try{
        const result = await query(sql);
        console.log(result);

        if(result.affectedRows === 1){
            res.status(200).json({
                message : "User deleted successfully",
                
            });
        } else{
            res.status(403).json({
                message : `Sorry user with userid : ${userid} not found`
            });
        }
        

    } catch(err){
        console.log(err)
        res.status(403).json({
            users : err.sqlMessage
        })
    }

    
}

module.exports = {getAllUsers, getUserById, updateUser, deleteUserById}