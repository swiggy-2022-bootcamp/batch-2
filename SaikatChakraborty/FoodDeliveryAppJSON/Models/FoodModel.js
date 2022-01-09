const getmodel=(db,databaseName,DataTypes)=>{

    const Food=db.define(databaseName,{
        foodId:DataTypes.STRING(10),
        foodName:DataTypes.STRING(20),
        foodCost:DataTypes.STRING(10),
        foodType:DataTypes.STRING(10)
    })
    return Food;
}

module.exports=getmodel;