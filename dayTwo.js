// conditions

let age = 27;

age >= 18 ? console.log('you can vote') : console.log('you can\'t vote');

let score = 95;

if(score > 90) {
    alert('brilliant');
} else if(score > 70 && score <= 90) {
    alert('good');
} else if(score > 50 && score <= 70) {
    alert('avg');
} else if(score > 30 && score <= 50) {
    alert('below avg');
} else {
    alert('fail');
}

// loops
let marks = [30,40,50,60,80];

let max = Number.MIN_VALUE, min = Number.MAX_VALUE, count = 0, elementsSum = 0

for(let i in marks) {
    console.log('element is: ', marks[i]);
    max = Math.max(max, marks[i]);
    min = Math.min(min, marks[i]);
    elementsSum += marks[i];
    count++;
}

console.log('max: ', max);
console.log('min: ', min);
console.log('sum: ', elementsSum);
console.log('count: ', count);




// functions

//normal 
function diff(a,b) {
    return a-b;
}

console.log(diff(10, 20));

//expression 
const expSum = function(a,b) {
    return a+b;
}

console.log(expSum(40,50));


//arrow 
const sum = (a,b) => {
    return a+b;
}

console.log(sum(10,20));






