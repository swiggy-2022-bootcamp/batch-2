const sql = require("./db.js")


const testquestion = (req,res) =>
{
    res.json({message:"we can start writing question controller"})
}

module.exports ={testquestion}