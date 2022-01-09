const getmodel=(db,databaseName,DataTypes)=>{
    const Order = db.define(databaseName, {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        selfGranted: DataTypes.BOOLEAN
      });

    
    return Order;
}

module.exports=getmodel;