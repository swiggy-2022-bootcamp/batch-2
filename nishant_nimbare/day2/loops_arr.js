let arr = ["abc", 456, 79.65, {a:"a"}];

arr.forEach(element => {
   console.log(element); 
});


let marks = [23,56,23,67,34];
let sum=0, min= 100, max = 0, pass=0, fail=0, threshold=50;

for(let i=0; i<marks.length; i++){
    sum += marks[i];
    min = Math.min(min, marks[i]);
    max = Math.max(max, marks[i]);
    if(marks[i]>= threshold)
        pass++;
    else
        fail++; 
}

console.log("sum ", sum);
console.log("min ", min);
console.log("max ", max);
console.log("pass ", pass);
console.log("fail ", fail);
