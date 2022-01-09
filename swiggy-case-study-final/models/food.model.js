const mySql = require("./mysql.connector");

class Food{
    constructor(food){
        this.foodId = food.foodId;
        this.foodName = food.foodName;
        this.foodCost = food.foodCost;
        this.foodType = food.foodType;
    }

    // Create/Add new food
    create(newFood, result){
        mySql.query("insert into food set ?", newFood, (err, queryResult) => {
            //if error is incurred, propogate error to controller
            if(err){
                console.log("Error incurred while inserting data to DB.\nLocation: Food.create");
                result(err, null);
            }
            //return data with auto-generated id
            else{
                result(null, {id: queryResult.insertId, ...newFood});
            }
        });
    }

    //static so invocation can be done using class name
    static getFoodById(foodId, result){
        mySql.query("select * from food where foodId = ?", foodId, (err, queryResult) => {
            if(err){
                console.log("Error incurred while fetching data from DB.\nLocation: Food.getFoodById");
                result(err, null);
            }
            //if no error, convert returned queryResult into a JSON object and return to conttroller
            else{
                result(null, JSON.parse(JSON.stringify(queryResult)));
            }
        })
    }
}

module.exports = Food;