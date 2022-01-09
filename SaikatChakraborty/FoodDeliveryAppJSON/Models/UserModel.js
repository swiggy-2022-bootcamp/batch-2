const getmodel=(db,databaseName,DataTypes)=>{

    const User=db.define(databaseName,{
        username:DataTypes.STRING(20),
        email:DataTypes.STRING(20),
        password:DataTypes.STRING(10),
        AddressLine1:DataTypes.STRING(20),
        AddressLine2:DataTypes.STRING(20),
        city:DataTypes.STRING(20),
        state:DataTypes.STRING(20),
        zip:DataTypes.STRING(10)

    })
    return User;
}

module.exports=getmodel;