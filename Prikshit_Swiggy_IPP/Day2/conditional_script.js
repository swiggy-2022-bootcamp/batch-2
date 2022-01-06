/**
 * Day 2 : JS Programming Basics : Conditionals
 */

// if-else 
 var num = 25;
 if (num > 0) {
   console.log(`${num} is a positive number`);
 } else {
   console.log(`${num} is a negative number`);
 }
 
/*********************************************************************************************************************************************************************/
 
 // ternanry operator
 let flag = true;

 let result;
 result = flag ? true : false;
 console.log(result ? "True" : "False");

/*********************************************************************************************************************************************************************/

 /**
  * Problem Statement 1 : Marks
  */
  var marks = prompt("Enter Marks: ");
  let rem = marks%10;
  marks = marks - rem;
  marks = marks/10;
  switch (marks){
        case 10:
        case 9:
          alert("You got A grade");
          break;
        case 8:
          alert("You got B grade");
          break;
        case 7:
          alert("You got C grade");
          break;
        case 6:
          alert("You got D grade");
          break;
        case 5:
          alert("You got E grade");
          break;
        default:
          alert("You got F grade");
  } 

/*********************************************************************************************************************************************************************/

 // for loop
 for(i = 0; i <= 100; ++i)
 {
     console.log("For Loop");
 }

/*********************************************************************************************************************************************************************/

 // while loop
 let j = 0
 while (j <= 5) {
   console.log("")
   j++
 }

/**********************************************************************************************************************************************************************/

 //do-while loop
 let k = 0;
 do {
   console.log("Do-While Loop");
   k++;
 } while (k <= 5)

/*********************************************************************************************************************************************************************/

 /**
  * Sqaure  pattern
  */
 let pattern = "";
 
 for(let i = 0; i < 5; ++i) 
 {
   for(let j = 0; j < 5; ++j) 
   { 
     pattern += "*";
   }
   pattern += "\n";
 }
 console.log(pattern);

/*********************************************************************************************************************************************************************/

  /**
   * Declare an array which 5 marks, find sum, min, max, display, count for pass and fail
   */

  marks = [95,85,93,48,38];
  let min = 1000;
  let max = -1000;
  let passCount = 0;
  let failCount = 0;
  let sum = 0;
  for(i = 0 ; i < marks.length ; ++i)
  {
    sum += marks[i];

    if(marks[i] > max)
        max = marks[i];

    if(marks[i] < min)
        min = marks[i];

    if(marks[i] > 50)
        ++passCount;
    else    
        ++failCount;
  }
  console.log("Max Marks ", max);
  console.log("Min Marks ", min);
  console.log("Pass Count ", passCount);
  console.log("Fail Count ", failCount);
  avg = sum/marks.length;
  console.log("Average Marks, ", avg);

/*********************************************************************************************************************************************************************/





