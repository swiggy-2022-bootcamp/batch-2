let marks = [75, 80, 35, 90, 60, 88, 49];

let sum = 0;
let max = marks[0];
let min = marks[1];

let pass = 0;
let fail = 0;

for(let i = 0; i < marks.length; i++){
    sum += marks[i];
    if(marks[i] > max){
        max = marks[i];
    }

    if(marks[i] < min){
        min = marks[i];
    }

    if(marks[i] > 50){
        pass++;
    }else{
        fail++;
    }
}

console.log("Sum", sum);
console.log("Max", max);
console.log("Min", min);
console.log("Pass", pass);
console.log("Fail", fail);