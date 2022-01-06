//Declare an array which contains 5 student's marks
//find sum, min, max, and also print them all
//count of pass and fail
input_marks = [60, 30, 20, 100, 40];
i = 0;
sum_total = 0;
min_mark = 100;
max_mark = 0;
count_pass = 0;
count_fail = 0;

console.log("Input Marks:");
while (i < input_marks.length) {
    sum_total += marks[i];

    min_mark = marks[i] < min_mark ? marks[i] : min_mark;
    max_mark = marks[i] > max_mark ? marks[i] : max_mark;

    if (marks[i] > 50)
        count_pass += 1;
    else 
        count_fail += 1;

    console.log(marks[i]);
    i++;
}

console.log("sum Total: ", sum_total);
console.log("minimum mark achieved: ", min_mark);
console.log("maximum mark achieved: ", max_mark);
console.log("No. of Students Passed: ", count_pass);
console.log("No. of Students Failed: ", count_fail);
