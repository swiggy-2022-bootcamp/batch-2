//Declare an array which contains 5 student's marks
marks = [60, 30, 20, 100, 40];
i = 0;
sum = 0;
min = 100000;
max = 0;
pass = 0;
fail = 0;


while (i < 5) {
    sum += marks[i];

    min = marks[i] < min ? marks[i] : min;
    max = marks[i] > max ? marks[i] : max;

    if (marks[i] > 70)
        pass ++;
    else 
        fail ++;
    console.log(marks[i]);
    i++;
}

console.log("Total sum is -  ", sum);
console.log("Min marks is -  ", min);
console.log("Max marks is - ", max);
console.log("No. of Students Passed is -  ", pass);
console.log("No. of Students Failed is - ", fail);