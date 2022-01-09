const addFood=(requestBody,FoodModel)=>{
    return FoodModel.create(requestBody).then(()=> 
    {
        console.log("Added Food Item");
        return authenticateFood(requestBody.foodId,requestBody.foodName,FoodModel);
    })
    .catch(console.error);
    
}
const authenticateFood=(foodid,foodname,FoodModel)=>{
    return FoodModel.findAll({
        where:{
            foodId:foodid,
            foodName:foodname
        }
    }).then(food=>{
        return food;
    }).catch(console.error);

}
const findFoodByFoodId=((foodId,FoodModel)=>{
    
    return FoodModel.findAll({
        where :{
            foodId:foodId
        }
    }).then(result=>{
        return result;
        
    }).catch(console.error); 
});

module.exports={'findById':findFoodByFoodId,'AddFood':addFood};
