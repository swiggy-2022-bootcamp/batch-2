//Unlimited number of parameters in regular function

function sumAllArgs()
{   let sum=0
    for(let i=0;i<arguments.length;i++)
    {
        sum+=arguments[i];
    }
    return sum
}
// alert(sumAllArgs(2,4,5,6)) 
console.log(sumAllArgs(2,4,5,6))

//Arrow Functions

let sumOf2Nums = (a,b)=> a+b;
console.log(sumOf2Nums(6,3))

///Unlimited number of parameters in the Arrow function
let sumofAllNums = (...Args) => 
{
    s=0
    for(const element of Args){
        s+=element;
    } 
    return s
}
console.log(sumofAllNums(1,2,3,4,5))