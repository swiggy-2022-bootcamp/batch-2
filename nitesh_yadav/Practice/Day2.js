let arr = Array();
console.log("empty array using Array object - ", arr);

// homogeneous data-type array
arr = [1, 2, 3, 4];
console.log("homogeneous data-type array - ", arr);

// hetrogeneous data-type array
arr = [1, 2, "3", 4, false];
console.log("Hetrogeneous data-type array - ", arr);

// length method
console.log("length of array - ", arr.length);

// split method
let str = "a, b, c, d, e, f, g";
const letters = str.split(",");
console.log("Letters - ", letters);

// modify the array
letters[0] = "z";
console.log("Modified Letters - ", letters);

const one_arr = Array(10).fill(1); // it creates eight element values filled with 1
console.log(one_arr);

const zero_arr = Array(10).fill(0);
console.log(zero_arr);

// Concatenating array using concat
const fstList = [1, 2, 2, 3];
const scndList = [4, 5, 6];
const thrdList = fstList.concat(scndList);

console.log(thrdList);

// check an element if it exist in an array
let idx = thrdList.indexOf(2);
if (idx != -1) {
  console.log(`${2} is present in ${thrdList}`);
} else {
  console.log(`${2} is not present in ${thrdList}`);
}

console.log(thrdList.lastIndexOf(2));

//Converting array to string
console.log(thrdList.toString());

//Joining array elements
console.log(thrdList.join(" "));

//Slice array elements
console.log(thrdList.slice(1, 4));

//Removing the end element using pop
thrdList.pop();
console.log(thrdList);

//Removing an element from the beginning
thrdList.shift();
console.log(thrdList);

//Add an element from the beginning
thrdList.unshift(0);
console.log(thrdList);

//Reversing array order
thrdList.reverse();
console.log(thrdList);

//Sorting elements in array
thrdList.sort();
console.log(thrdList);

// Problem 1:
// if else ladder where on the basis
// of marks alert grade
let mark = 90;
if (mark > 90) {
  alert("Grade A+");
} else if (mark > 80 && mark < 90) {
  alert("Grade A");
} else if (mark > 70 && mark < 80) {
  alert("Grade B");
} else if (mark > 60 && mark < 70) {
  alert("Grade C");
} else if (mark > 50 && mark < 60) {
  alert("Grade D");
} else {
  alert("Grade E");
}

// Problem 2:
// array of marks
// - give grade for each marks
// - find max
// - find min
// - count number of passed students
function getGrade(mark) {
  if (mark > 90) {
    return "A+";
  } else if (mark > 80 && mark < 90) {
    return "A";
  } else if (mark > 70 && mark < 80) {
    return "B";
  } else if (mark > 60 && mark < 70) {
    return "C";
  } else if (mark > 50 && mark < 60) {
    return "D";
  }
  return "E";
}

let marks = [20, 90, 76, 85, 34, 57, 68, 96];
let total = 0;
let min_marks = 100;
let max_marks = 0;
let number_of_pass = 0;
let number_of_fail = 0;
let grade_lst = [];

marks.forEach((mark) => {
  total += mark;

  min_marks = Math.min(mark, min_marks);
  max_marks = Math.max(mark, max_marks);

  if (mark > 50) {
    number_of_pass++;
  } else {
    number_of_fail++;
  }

  grade_lst.push(getGrade(mark));
});

console.log("Total Marks - ", total);
console.log("Minimum mark - ", min_marks);
console.log("Maximum mark - ", max_marks);
console.log("Number of fail - ", number_of_pass);
console.log("Number of pass - ", number_of_fail);
console.log("Grade List - ", grade_lst);

//-----------------------------------------Functions
function sumOfNumbers() {
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(sumOfNumbers(1, 2, 3, 4));
console.log(sumOfNumbers(1, "Hello", 4));
console.log(sumOfNumbers(1, 2, 3, "Hello"));

//TODO:string and array methods and read Objects
