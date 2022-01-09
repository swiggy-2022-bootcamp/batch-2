// function declaration
function demo(message)
{
    console.log(`hello \n ${message}`);
}

// function call
demo("naren");
demo("varun");  

// function with return type
// functiion with unlimted arguments
function addTwoNumbers()
{
    let sum = 0;
    for(let i=0;i<arguments.length;i++)
    {
        sum+= arguments[i];
    }
    return sum;
}
console.log(addTwoNumbers(4,6,"hello"));

// ano

const name1 =function()
{
    let sum = 0;
    for(let i=0;i<arguments.length;i++)
    {
        sum+= arguments[i];
    }
    return sum;
}

// anonymous fucntion
const callback = function()
{
    let sum = 0;
    for(let i=0;i<arguments.length;i++)
    {
        sum+= arguments[i];
    }
    return sum;
}
function caller(callback)
{
    return callback(1,2,3)
}
console.log(caller(callback));

// wont work because we are trying to change the reference to the location
//const final_arr = [1,2,3];
//final_arr = [1,2,3];
// we can change the elements , we cant change the final_arr reference memory location
//

// expression functions 
const expfun = function(a,b)
{
    return a+b;
};
// self invoking funtion
(function(name) {
    console.log(name);
  })("naren");
// arrow functions
  const arrowaddTwo = (a,b) => {return a+b;}
  const arrowaddTwooneline = (a,b) => a+b;


