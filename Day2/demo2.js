min = 1000;
max = 0;
pass = 0;
sum = 0
marks = [100,90,95,99,85];
for (i = 0;i < marks.length;i++){
    sum = sum + marks[i];
    if (marks[i] > 50){
        pass++;
    }
    min = Math.min(min,marks[i]);
    max = Math.max(max,marks[i]);
}
message = pass >= 4 ? "Pass" : "Fail";
console.log(message)
console.log(sum)
console.log(min)
console.log(max)
