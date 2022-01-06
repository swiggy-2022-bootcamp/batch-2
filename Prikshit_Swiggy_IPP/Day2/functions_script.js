/**
 * Day 2 : JS Basic - Functions
 */

 function square(num) {
    console.log(`Sqaure of ${num} : `,num*num);
  }

 square(5);

/*********************************************************************************************************************************************************************/

 function sumAllNums() {
    let sum = 0
    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i]
    }
    return sum
  }
  
  console.log("Example1 : ",sumAllNums(1, 2, 3, 4));
  console.log("Example2 : ",sumAllNums(10,20,"Hello"));

/**********************************************************************************************************************************************************************/

 const sumAllNums2 = (...args) => {
    let sum = 0
    for (const element of args) {
      sum += element
    }
    return sum
  }
  
  console.log("Unlimited number of parameters Example1  : ",sumAllNums2(1, 2, 3, 4)) 
  console.log("Unlimited number of parameters Example2 : ",sumAllNums2(15, 20, 30, 25, 10, 33, 40)) 

/*********************************************************************************************************************************************************************/

  // Anonymous function
  const callBack = function()
  {
      sum = 0;
      for(i = 0; i < arguments.length; ++i)
        sum += arguments[i];
    return sum;
  }

  function caller(func_param)
  {
      return func_param(1,2,3);
  }

  console.log("Anonymous function usage : ",caller(callBack));

/*********************************************************************************************************************************************************************/
// Arrow Function

const arrowFunc = (a, b) => 
{
    return a+b;
}

const arrowFuncOneLine = (a, b) => a+b;

console.log("Arrow Function Example : ", arrowFunc(5, 15));
console.log("Arrow Function One Line Example : ", arrowFuncOneLine(25, 15));

/*********************************************************************************************************************************************************************/
//Expression Function

const squareEF = function(n) {
    return n * n;
  }
  
console.log("Expression Function Example ",squareEF(5));

/*********************************************************************************************************************************************************************/
// Self Invoking Function

(function(name) {
    console.log("SIF Example ", name)
  })("Self Invoking Function");

/*********************************************************************************************************************************************************************/
