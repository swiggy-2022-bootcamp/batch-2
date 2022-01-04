/*
Problem 1
marks:
50- -> F
50-60 -> D
60-70 -> C
70-80 -> B
80+ -> A
*/

let marks = 60;
switch(true){
    case marks < 50:
        console.log('F');
        break;
    case marks >= 50 && marks < 60:
        console.log('D');
        break;
    case marks >= 60 && marks < 70:
        console.log('C');
        break;
    case marks >= 70 && marks < 80:
        console.log('B');
        break;
    case marks >= 80:
        console.log('A');
    
}

/*
Declare an array of 5 student's marks
find sum, min, max and also print them all.
Count of pass and fail
*/

let studentsMarks = [];
for(let i = 0; i < 5; i++){
    studentsMarks.push(Math.floor(Math.random() * 100 + 1))
}
console.log(`Student's Marks : ${studentsMarks}`);
console.log(`Sum of all marks : ${studentsMarks.reduce((a, b) => a + b)}`);
console.log(`Max of all marks : ${Math.max(...studentsMarks)}`);
console.log(`Min of all marks : ${Math.min(...studentsMarks)}`);

let passedStudents = 0, failedStudents = 0, cutOff = 35;
studentsMarks.forEach(mark => {
    if(mark < cutOff) failedStudents++;
    else passedStudents++;
});

console.log(`No. of Students Passed : ${passedStudents}\nNo. of Students Failed : ${failedStudents}`)


function normalFunc(){
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) sum += arguments[i];
    return sum;
}

const expressionFunc = function(){
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) sum += arguments[i];
    return sum;
}

const arrowFunc = (...args) => { 
    let sum = 0;
    for (let i = 0; i < args.length; i++) sum += args[i];
    return sum;
};

(function(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) sum += arguments[i];
    console.log(sum);
})(1, 2, 3, 4);

console.log(normalFunc(1, 2, 3, 4));
console.log(expressionFunc(1, 2, 3, 4));
console.log(arrowFunc(1, 2, 3, 4));
