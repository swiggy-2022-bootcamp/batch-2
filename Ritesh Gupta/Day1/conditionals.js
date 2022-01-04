// Conditional statements

let condition = true;

// if - else
if (condition){
    console.log("True");
} else {
    console.log("False")
}


// if - else if - else
let condition1 = false;
let condition2 = true;

if (condition1) {

} else if(condition2) {

} else {

}



// for loop
for(let i = 0; i < 100; i++){
    console.log("Number is -> ", i);
}

// while loop
let num = 0;
while (num < 10){
    console.log("While loop");
    num++;
}



/*
Problem Statement:
Declare marks variable and based on marks output a grade in alert box;

*/

let marks = 85;
let msg = null;

if (marks > 90){
    msg = "Grade is A";
} else if (marks > 80) {
    msg = "Grade is B";
} else if (marks > 70) {
    msg = "Grade is C";
} else if (marks > 60){
    msg = "Grade is D";
} else {
    msg = "Grade is E";
}
console.log(msg);



