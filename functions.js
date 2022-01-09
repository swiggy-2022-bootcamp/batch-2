let studentCount = 1
function demo(name){
    console.log(`welcome ${name} to the bootcamp`);
    return studentCount++;
}

let students = ['murtaza','rishabh'];
for(let i=0;i<students.length;i++){
    console.log("student ", demo(students[i])," details are printed");
}

function addSomeNumbers(){
    sum = 0;
    for(i=0;i<arguments.length;i++){
        sum += arguments[i];
    }
    return sum;
}
console.log(addSomeNumbers(1,'hello',2))
console.log(addSomeNumbers(1,3,true,'hello',2))

//anonymous function 
const callback = function(){
    console.log("A function has no name", arguments[0]+arguments[1]);
}
function caller(func_param){
    return func_param(3,5)
}
caller(callback)


const final_arr = [1,2,3];
//final_arr.push(4) //error
//final_arr = [5,6,7] //error

(function(n) {
    console.log(n * n)
  })(2) // 4, but instead of just printing if we want to return and store the data, we do as shown below
  
  let squaredNum = (function(n) {
    return n * n
  })(10)
  
  console.log(squaredNum)

//arrow function 
const arrowFunction = (a,b) => {
    return a+b;
}

const arrowFunctionOneLine = (a,b) => a+b;
console.log(arrowFunction(1,2))
console.log(arrowFunctionOneLine(2,3))