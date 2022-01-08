const query = require('../db/query');
const dbName = "swiggy_bootcamp.food";


const insertFoodDetails = async (req, res) => {
    const foodDetails = req.body;

    const sql = `INSERT INTO ${dbName} VALUES ('${foodDetails.foodid}', '${foodDetails.foodName}', ${foodDetails.foodCost}, '${foodDetails.foodType}', '${foodDetails.foodRating}' ) `;

    try{
        await query(sql);
        console.log("Done inserting food");
        res.status(201).json({
            status : 201,
            message : "Food registered",
            data : foodDetails
        });
        
    }
    catch(err){
        console.log(err.sqlMessage);
        res.status(403).json({
            status : 403,
            error : err.sqlMessage
        });
    }
}

const getFoodById = async (req, res) => {
    const foodid = req.params.foodid;
    console.log(foodid);

    const sql = `SELECT * FROM ${dbName} WHERE foodid = '${foodid}' `;
    try{
        const result = await query(sql);
        if (result.length > 0){
            res.status(200).json({
                users : result
            })
        } else {
            res.status(403).json({
                message : `Sorry food with foodid : ${foodid} not found`
            })
        }
        

    } catch(err){
        console.log(err)
        res.status(403).json({
            error : err.sqlMessage
        })
    }
}


module.exports = {getFoodById, insertFoodDetails}