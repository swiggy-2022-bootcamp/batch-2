// Declare an array which contains 5 different subject marks
// Find sum, min, max and print them all
// Print marks and iterate it
// Count of pass and fail

marks = [66,43, 59, 82, 98];

sum_total=0;
min_marks=100;
max_marks=0;
count_pass=0;
count_fail=0;

for (let i=0; i < marks.length; i++) {
    sum_total += marks[i];
    max_marks = Math.max(max_marks,marks[i])
    min_marks = Math.min(min_marks,marks[i])
    if(marks[i]<50)
    {
        count_fail++;
    }
    else count_pass++;
}

console.log("Total marks: ", sum_total);
console.log("Minimum marks: ", min_marks);
console.log("Maximum marks: ", max_marks);
console.log("Count of failed subjects: ", count_fail);
console.log("Count of passed subjects: ", count_pass);


function demo(){
    console.log("Welcome to the batch 2");
}
demo()

function Welcome(name){
  console.log(`Welcome ${name} to camp`)
}
Welcome("Viewer")
Welcome("Spectator")


function calc(val1, val2)
{
    return val1+val2;
}
console.log(calc(100,200))


function sumval()
{
    sum = 0;
    for(i = 0; i < arguments.length; i++)
    {
        sum+=arguments[i];
    }
    return sum;
}

console.log(sumval(1,5,6))

const callback = function(){
    sum = 0;
    for(i = 0; arguments.length; i++)
    {
      sum = sum +arguments[i];
    }
    return sum;
  }
  function caller(fun_param)
  {
    return fun_param(1,2,3);
  }

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
})("Just for fun");
