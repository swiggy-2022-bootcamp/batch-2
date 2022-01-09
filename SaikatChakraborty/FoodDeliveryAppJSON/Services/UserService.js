

const findUserByUserId=((userId,UserModel)=>{
    
    return users=UserModel.findAll({
        where :{
            id:userId
        }
    }).then(result=>{
        return result;
        
    }).catch(console.error); 
});
const findUserByUserIdAndAllOrders=((userId,UserModel,Food)=>{
    
    return users=UserModel.findAll({
        where :{
            id:userId
        },include:[
            {model:Food,
            attributes:['foodName','foodCost','foodType']
        }]
    }).then(result=>{
        return result;
        
    }).catch(console.error); 
});

const findAllUsers=(UserModel)=>{
    return userList=UserModel.findAll()
    .then(result=>{
        return result;
    })
    .catch(console.error);
}
const authenticateUser=(userName,password,UserModel)=>{
    return UserModel.findAll({
        where:{
            username:userName,
            password:password
        }
    }).then(user=>{
        return user;
    }).catch(console.error)

}
const registerUser=(requestBody,UserModel)=>{
    return UserModel.create(requestBody).then(()=> 
    {
        console.log("added User");
        return authenticateUser(requestBody.username,requestBody.password,UserModel);
    })
    .catch(console.error);
    
}

const updateUserByid=(newUser,userID,UserModel)=>{
    return UserModel.update(
        {username:newUser.username,
        password:newUser.password,
        AddressLine1:newUser.AddressLine1,
        AddressLine2:newUser.AddressLine2,
        city:newUser.city,
        state:newUser.state,zip:newUser.zip},
    {where:{
        id:userID

    }}).then(result=>{
        return result;

    }).catch(console.error);
}

const deleteUserById=(userId,UserModel)=>{
    return UserModel.delete({
        where:{
            id:userID
        }
    }).then (result=>{return result})
    .catch(console.error);

}

module.exports={'DeleteById':deleteUserById,
'updateById':updateUserByid,
'RegisterUser':registerUser,
'authentaicateUserByUserNamePassword':authenticateUser,
'findById':findUserByUserId,
'findAll':findAllUsers,'findUserByUserIdAndAllOrders':findUserByUserIdAndAllOrders};
