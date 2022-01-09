const addOrder=(OrderModel,userId,foodId)=>{
    return OrderModel.create({
        UserTableId:userId,
        FoodTableId:foodId
    }).then((result)=>{
    console.log("Order placed!!",userId,foodId);
    return result;})
    .catch(console.error);
}

const allOrders=(OrderModel)=>{
    return OrderModel.findAll({ include: [{ all: true, nested: true }]})
    .then((result)=>{
        return result;
    })
    .catch(console.error);
}

module.exports={'addOrder':addOrder,'AllOrders':allOrders};