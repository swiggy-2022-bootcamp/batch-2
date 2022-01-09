const { createFood, getFoods, getFoodById } = require('./foods.service');

module.exports = {
    createFood:(req, res) => {
        const body = req.body;

        createFood(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({ 
                    success: 0, 
                    message: "Database Connection Failed!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        });
    },
    getFoodById :(req,res) => {
        const id = req.params.id;
        getFoodById(id,(err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
               return res.json({
                   success:0,
                   message: "Record does not exist!"
               }); 
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getFoods :(req,res) => {
        getFoods((err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}