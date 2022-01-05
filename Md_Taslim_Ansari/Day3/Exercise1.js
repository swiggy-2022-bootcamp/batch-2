let val=5
let evenOdd = (n)=> n%2==0?"Even":"Odd"

console.log(evenOdd(val))



const sum = () =>15
const addition =function(x,y=x*sum())
{
    return x+y;
}
console.log(addition(10))