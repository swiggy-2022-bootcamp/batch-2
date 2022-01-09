//Conditional Statements
condition=true
if(condition){
    console.log("True Condition")
} else {
    console.log("False Condition")

}
/*Problem statement:
 marks: 
 < 50 -> F
 50-60 -> D
 60-70 -> C
 70-80 -> B
 > 80 -> A
 alert msgs
*/
let  marks =75
if(marks<50){
    alert("F")
} else if(marks>=50&&marks<60){
    alert("D Grade");
}else if(marks>=60&&marks<70){
    alert("C Grade")
} else if(marks>=70&&marks<80){
    alert("B Grade")
}  else if(marks>=80){
    alert("A grade")
}
//Random list

list=['Ram','Saikat','Shyam','etc']
for(i=0;i<list.length;i++){
    console.log(list[i])
}
list.push("A")
for(i=0;i<list.length;i++){
    console.log(list[i])
}

marks=[45,56,60,56];
//Find sum ,min,max
//>50 -->pass give count of pass and fail
sum=0;
cntPass=0;
cntFail=0;
min=marks[0];
max=marks[0];
for(i=0;i<marks.length;i++){
    if(marks[i]>50){
        cntPass++;
    } 
    min=Math.min(min,marks[i]);
    max=Math.max(max,marks[i]);
    sum+=marks[i];
} 
console.log("Sum of marks: ",sum,"|| Min marks: ",min,"||Max marks :",max,"|| Number of student's Passed:",cntPass,"|| Number of students failed:",marks.length-cntPass);

/**
 * Function with unlimited arguments 
 */

function sumOfNumbers(){
    sum=0;
    for(i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}
console.log(sumOfNumbers(1,2,"Hello"));
//Anonymous function
const anyName= function(){
    sum=0;
    for(i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
    

}
console.log(anyName(1 ,2 ,3 ));
function caller(sum){
    return sum(1,2,3);
}
//function you are passing is the call back
caller(anyName);
//Arrow functions ///Lambda 
const square=(n)=>{
    return n*n;
}
const add=(a,b)=>{
    return a+b;
}
console.log(add(2,5));
const addNumbers=(a,b)=>a+b;

//Normal Function for squaring a number 
function squareNormal(n){
    return n**2;
}
//Expression Function
const squareExp=function(n){
    return n**2;

};
//Arrow function 
const squareArrow=(n)=>n**2;
console.log("normal",squareNormal(3));
console.log("express Func",squareExp(9));
console.log("ArrowFunction",squareArrow(4));