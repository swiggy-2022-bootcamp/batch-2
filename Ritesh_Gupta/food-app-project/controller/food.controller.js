const query = require('../db/query');
const dbName = "swiggy_bootcamp.food";


const insertFoodDetails = async (req, res) => {
    const foodDetails = req.body;

    const sql = `INSERT INTO ${dbName} VALUES ('${foodDetails.foodid}', '${foodDetails.foodName}', ${foodDetails.foodCost}, '${foodDetails.foodType}' ) `;

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
                FoodDetail : result
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

// Additional feature
const getAllFood = async (req, res) => {
    const sql = `SELECT * FROM ${dbName}`;
    try{
        const result = await query(sql);
        
        res.status(200).json({
            foodDetails : result
        })

    } catch(err){
        console.log(err)
        res.status(403).json({
            message : err.sqlMessage
        })
    }
}

const getFoodByType = async (req, res) => {
    const foodType = req.params.foodType;
    console.log(req.params)
    console.log(foodType);

    const sql = `SELECT * FROM ${dbName} WHERE foodType = '${foodType}' `;
    try{
        const result = await query(sql);
        if (result.length > 0){
            res.status(200).json({
                FoodDetails : result
            })
        } else {
            res.status(403).json({
                message : `Sorry food with foodType : ${foodType} not found`
            })
        }
        

    } catch(err){
        console.log(err)
        res.status(403).json({
            error : err.sqlMessage
        })
    }
}

module.exports = {getFoodById, insertFoodDetails, getAllFood, getFoodByType}