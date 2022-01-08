var logger = require('../config/winston');

module.exports = mongoose => {
 var schema = mongoose.Schema(
     {
         email:String,
         password:String,
         username:String,
         address:{
             type: Map,
             of: String
         }
     }
 ) 

 const User = mongoose.model("user",schema);
 return User;
};