const pool = require("../../config/database");

module.exports = {
    createFood :(data, callBack) => {
        pool.query(
            `insert into food(foodId, name, cost, type)
                values(?,?,?,?)`,
                [
                    data.foodId,
                    data.name,
                    data.cost,
                    data.type
                ],
                (error, results, fields) =>{
                    if(error) {
                        callBack(error);
                    }
                    return callBack(null, results);
                }
        );
    },

    getFoods: callBack => {
        pool.query(
            `select id, foodId, name, cost, type from food`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getFoodById: (id, callBack) => {
        pool.query(
            `select id, foodId, name, cost, type from food where foodId = ?`,
            [id],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }

};