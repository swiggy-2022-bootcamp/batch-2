const express=require('express')
const app=express();
app.use(express.urlencoded({extended: true}))
const dbConnection=require('./Config/connect.js');

[User,Food,Orders,db]=dbConnection('fooddeliveryapp','sampleuser1','samplepass1');

const UserService=require('./Services/UserService.js');
const FoodService=require('./Services/FoodService.js');
const OrderService=require('./Services/OrderService.js');
/*-----------------------------------------------User Controller--------------------------------------------------------------------- */

/**
 * GET Resource for Regitration Form for User Registration
 */

app.get('/RegistrationForm',(req,res)=>{
    res.sendFile(__dirname+'/UserRegForm.html');
})
/**
 * POST Resource exposed to register new Users
 */
app.post('/api/register',(req,res)=>{
    console.log(req);

    UserService['RegisterUser'](req.body,User)
    .then((result)=>{
        res.status(201).send(result);})
        

   
});

/**
 * POST Resource authenticate the given user based on User name and Password 
 */
app.post('/api/authenticate',(req,res)=>{

    UserService['authentaicateUserByUserNamePassword'](req.body.username,req,body.password,User)
    .then(user=>{
        if(user.length==0){
            res.statusCode(500).send({message:"User not found"});
            
        } else {
            res.statusCode(200).send({message:"User Logged in successfully"});
        }
    });
})

/**
 * Get Resource exposed to find all users in system
 */
app.get('/users',(req,res)=>{
    UserService['findAll'](User)
    .then((userList)=>{
        res.status(201).send(userList);

    })
})

/**
 * Get Resource exposed to find Users with given User id
 */
app.get('/api/users/:userID',(req,res)=>{
    
    UserService['findById'](req.params.userID,User).
    then(user=>{
        if(user.length==0){
            res.status(404).send({Message:`User id : ${req.params.userID} not found!!`})
        }else {
        res.send(user);
        }
    })
})

/**
 * Put Resource exposed to update User based on the new details provided in Request body
 *  
 */

app.put('/api/users',(req,res)=>{
    UserService['findById'](req.body.id,User).
    then((user)=>{
        if(user.length==0){
            res.status(400).send({Message:`Sorry user With ${req.body.id} not
                found`});
        } else {
            UserService['updateById'](req.body,req.body.id,User)
            .then(result=>{
            res.status(200).send({Message:`User with id: ${req.body.id} updated`})
         })
        }
    
        
    }).catch(console.error);
})
/**
 * @deprecated
 * Cannot delete user without deleting all instances of user in Orders table.
 * Deleting order history can be detrimental for the business and later on addition of Restaurant object
 * Way Around : Add a Activated boolean tag in User table instead of deleting user deactivate account.
 */

app.delete('/api/users/',(req,res)=>{
    console.log(req.body.userID);
    UserService['findById'](req.body.userID,User).
    then((user)=>{
        if(user.length==0){
            res.status(400).send({Message:`Sorry user with id: ${req.body.userId} not found`});
        } else {
            UserService['DeleteById'](req.body.userId,User)
            .then(result=>{
                res.status(200).send({Message:"User Deleted successfully"});
            })
        }
    }).catch(console.error);
})






/*---------------------------------------------------------------Food Controller-----------------------------------------------------*/
/**
 * Form for Adding Food
 */
app.get('/addFood',(req,res)=>{
    res.sendFile(__dirname+'/AddFood.html');
})

/**
 * POST Resource exposed to add new food items 
 */
app.post('/api/food',(req,res)=>{
    FoodService['AddFood'](req.body,Food)
    .then((result)=>{
        res.status(201).send(result);})
        

   
});

/**
 * GET Resource exposed to get food by foodId
 * 
 */
 app.get('/api/food/:foodID',(req,res)=>{
    FoodService['findById'](req.params.foodID,Food).
    then(food=>{
        if(food.length==0){
            res.status(404).send({Message:`Food id : ${req.params.foodID} not found!!`})
        }else {
            res.send(food);
        }
    })
})

/*--------------------------------------------------------------ORDER Controller------------------------------------------------*/
/**
 * GET Resource to place an order
 */
app.get('/api/order/:UserId/:foodId',(req,res)=>{
    OrderService['addOrder'](Orders,req.params.UserId,req.params.foodId)
    .then((result)=>{
        res.status(201).send({Message:"Order placed!!"});
    })
    .catch(console.error);

    // Orders.create({UserTableId:req.params.UserId,
    //     FoodTableId:req.params.foodId
    // }).then((result)=>{
    //     console.log("Order added to the list");
    //     res.status(201).send({Message:"Order Recieved"});
    // })
    
})

/**
 * GET Resource to summarize all orders in the system
 */
app.get('/api/orders/',(req,res)=>{
    OrderService['AllOrders'](Orders)
    .then((result)=>res.send(result))
    .catch(console.error);

    // Orders.findAll({ include: [{ all: true, nested: true }]})
    // .then((result)=>res.send(result))
    // .catch(console.error);
})

/**
 * GET Resource to see all Food Items ordered by User of a provided userId
 * Very Important Can find cost of all orders etc.
 */
app.get('/api/orders/:userId',(req,res)=>{
    UserService['findUserByUserIdAndAllOrders'](req.params.userId,User,Food)
    .then(result=>{
        res.send(result);
    }).catch(console.error);

})
  
/*----------------------------------------------Start Server at Port 4444----------------------------------------------------- */
app.listen(4444,()=>{
    console.log('server started on port:4444');
})
