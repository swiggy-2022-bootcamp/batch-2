marks = [40, 30, 100, 50, 45, 70];
i = 0;
sum_total = 0;
min_mark = 0;
max_mark = 100;
count_pass = 0;
count_fail = 0;

while(i < marks.length)
{
    sum_total += marks[i];
    min_mark = Math.min(min_mark, marks[i]);
    max_mark = Math.max(max_mark, marks[i]);
    if(marks[i] > 50)
        count_pass++;
    else
        count_fail++;
    i++;
}

console.log(sum_total);
console.log(min_mark);
console.log(max_mark);
console.log(count_pass);
console.log(count_fail);


function demo(){
    console.log("Welcome to the batch 2");
}
demo()

function Welcome(name){
  console.log(`Welcome ${name} to camp`)
}
Welcome("Abc")
Welcome("avbsa")


// function calc(val1 , val2)
// {
//   return val1+val2;
// }
// console.log(calc(100,200))


// function sumval()
// {
//   sum = 0;
//   for(i = 0; i < arguments.length; i++)
//     sum+=arguments[i];
//   return sum;
// }

// console.log(sumval(1,5,6))

// const callback = function(){
//   sum = 0;
//   for(i = 0; arguments.length; i++)
//   {
//     sum = sum +arguments[i];
//   }
//   return sum;
// }
// function caller(fun_param)
// {
//   return fun_param(1,2,3);
// }

const addtwo = (a, b) => {
  return a + b;
}

function numfunc(a, b) {
  return a+b;
}
const arrowshorter = (a, b) => a+b;

console.log(arrowshorter(1,4));
console.log(numfunc(1,4));
console.log(addtwo(1,4));

(function(name){
  console.log(name);
})("gas");
