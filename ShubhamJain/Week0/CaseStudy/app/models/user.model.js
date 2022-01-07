var logger = require('../config/winston');

module.exports = mongoose => {
 var schema = mongoose.Schema(
     {
         email:String,
         password:String,
         address:{
             type: Map,
             of: String
         }
     }
 ) 

//  schema.method("toJSON",function(){
//      const { __v,_id, email, password, ...object} = this.toObject();
//      logger.info(this.toObject());
//      logger.info("inside schema method");
//      object.id = _id;
//      object.email = email;
//      return object;
//  });

 const User = mongoose.model("user",schema);
 return User;
};