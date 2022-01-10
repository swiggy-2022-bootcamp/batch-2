let marks = [35, 40, 60, 70, 80];

// Sum of marks
let sum = 0;
for(let i = 0; i < marks.length; i++){
    sum += marks[i];
}
console.log('Sum of Marks: ' + sum);

// If marks > 50 then pass, else fail
let passCount = 0;
let failCount = 0;
for(let i = 0; i < marks.length; i++){
    if(marks[i] > 50){
        passCount++;
    } else {
        failCount++;
    }
}
console.log('Pass Count: ' + passCount);
console.log('Fail Count: ' + failCount);

// Calculating Max & Min Marks
let max = marks[0];
let min = marks[0];

for(let i = 1; i < marks.length; i++){
    if(marks[i] > max){
        max = marks[i];
    } else if (marks[i] < min){
        min = marks[i];
    }
}

console.log('Max Marks: ' + max);
console.log('Min Marks: ' + min);