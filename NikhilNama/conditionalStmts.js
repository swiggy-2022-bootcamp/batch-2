const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  // loop
  if (arr[i] % 2) {
    // if condition
    console.log("Odd Number: ", arr[i]);
  } else {
    // else
    console.log("Even Number: ", arr[i]);
  }
}
/**
 * 90-A
 * 70-90- B
 * 60-70-C
 * 50-60-D
 * <50 -Fail
 *
 */
const val = 10;

if (val > 10) console.log("Value is greater that 10");
else if (val > 0) {
  console.log("Value is greater than 0 and less that 10");
} else {
  console.log("Values is less that 0");
}

const marks = 60;

if (marks >= 80) {
  console.log("Grade -A ");
} else if (marks >= 70) {
  console.log("Grade -B");
} else if (marks >= 60) {
  console.log("Grade-C");
} else if (marks >= 50) {
  console.log("Grade-D");
} else {
  console.log("Grade-F");
}

const subMarks = [30, 70, 40, 56, 65, 44];
let totoalMarks = 0,
  passCount = 0,
  failCount = 0,
  minMarks = 1000,
  maxMarks = 0;

for (let i = 0; i < subMarks.length; i++) {
  totoalMarks += subMarks[i]; //counting Total Marks

  //minMarks
  if (minMarks > subMarks[i]) minMarks = subMarks;
  //maxMarks
  else if (maxMarks < subMarks[i]) maxMarks = subMarks;

  //passCount
  if (subMarks[i] > 50) {
    passCount++;
  } else {
    //fialCount
    failCount++;
  }
}

console.log("Totoal Marks ", totoalMarks);
console.log("Number of Subjects Passed ", passCount);
console.log("Number of subjects Failed", failCount);
