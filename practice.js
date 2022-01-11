
condition = false;

for(i=0; i<10; i++) {
    console.log("hello");

    if(i%2 == 0) {
        condition = false;
    } 
    else {
        condition = true;   
    }
}

if(condition) {
    console.log("phew");
    alert("pheww");
}

marks = [81, 49, 11, 27, 88];

let minMarks = 101, maxMarks = 0, result = "Pass";

for(i=0; i<marks.length; i++) {
    minMarks = marks[i]<minMarks ? marks[i] : minMarks;
    maxMarks = marks[i]>maxMarks ? marks[i] : maxMarks;
    result = marks[i]<50 ? "Fail" : result;
}
console.log(`Minimum Marks: ${minMarks} \n Maximum Marks: ${maxMarks} \n RESULT : ${result}`);

function welcome(name) {
    console.log(`Welcome ${name}!`);
    alert(`Welcome ${name}!`);
}

welcome("Kunal");

