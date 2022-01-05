const sum1 = () =>15
const addition2 =function(x,y=x*sum1())
{
    return x+y;
}
console.log(addition2(10))