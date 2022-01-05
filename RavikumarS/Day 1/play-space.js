  /*
  let marks = 80;
  if(marks < 30)
    alert("C grade");
  else if(marks < 70)
    alert("B grade");
  else
    alert("A grade");
*/
  let marksArray = [10, 20, 30, 40, 50], max = Number.MIN_VALUE, min = Number.MAX_VALUE, sum = 0, passCount = 0, failCount = 0 
  for(let i = 0; i < marksArray.length; i++){
    if(marksArray[i] > max) max = marksArray[i];
    if(marksArray[i] < min) min = marksArray[i];
    sum += marksArray[i];
    if(marksArray[i] >= 35) passCount++;
    else failCount++;
  }

  console.log("max: ", max, ". min: ", min, ". sum: ", sum, ". subjects passed: ", passCount, ". subjects failed: ", failCount);

  //vanilla function
  function vanillaAdd(a, b){
    return a + b;
  }
  console.log(vanillaAdd(10, 20));

  //expression function
  const expr_variable = function expressionAdd(a, b){
    return a + b;
  }
  console.log(expr_variable(20, 30));

  //arrow function
  const arrow_variable = (a, b) => a + b;
  console.log(arrow_variable(10, 20));

  //self invoking function
  (function(name){
    console.log(`Hello ${name}`);
  })("Ravi")


  //string functions
  let js = 'JavaScript'
  let js1 = ' JavaScript is love  '

console.log(js.length)

let firstLetter = js[0]

console.log(firstLetter) 
console.log(js.toUpperCase())     // JAVASCRIPT
console.log(js.toLowerCase())     // javascript
console.log(js.substr(4,6))    // Script
console.log(js.substring(0,4))     // Java
console.log(js1.split(' '))
console.log(js1.trim())
console.log(js1.includes('love'))
console.log(js1.replace('JavaScript', 'Python'))
console.log(js1.charAt(0)) 
console.log(js1.charCodeAt(3))
console.log(js1.indexOf('is'))
console.log(js.concat("Days", "Of", "JavaScript"))
console.log(js1.startsWith('Love'))
console.log(js1.endsWith('love'))
console.log(js1.search('love'))
console.log(js1.repeat(10)) 






  
