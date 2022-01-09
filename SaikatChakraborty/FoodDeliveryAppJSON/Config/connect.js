let dbConnection=(dbName,dbUsername,dbPassword)=>{
    const UserModel=require('../Models/UserModel.js');
    const FoodModel=require('../Models/FoodModel.js');
    const OrderModel=require('../Models/OrderModel.js')

    const Sequelize=require('sequelize');
    const DataTypes=Sequelize.DataTypes;
    const db=new Sequelize(dbName,dbUsername,dbPassword,{
        host:'localhost',
        dialect:'mysql'
    })

    db.authenticate()
    .then(()=>console.log("Connection Worked"))
    .catch((err)=>console.log(err))

    const User=UserModel(db,'UserTable',DataTypes);
    const Food=FoodModel(db,'FoodTable',DataTypes);
    const Order=OrderModel(db,'Orders',DataTypes);
    
    User.belongsToMany(Food, { through: Order });
    Food.belongsToMany(User, { through: Order });

    db.sync()
    .then(()=> console.log('Database Synchronised'))
    .catch(console.error);
    return [User,Food,Order,db];
}
module.exports=
    dbConnection

