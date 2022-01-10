// Declare Array of Marks
// find min,max,avg,sum of marks

let marks = [90, 80, 70, 60, 50];

let minMarks,
  maxMarks,
  avgMarks = 0,
  sumMarks = 0;

// Min Marks

for (let i = 0; i < marks.length; i++) {
  if (i == 0) {
    minMarks = marks[i];
  } else if (marks[i] < minMarks) {
    minMarks = marks[i];
  }
}

// Max Marks
for (let i = 0; i < marks.length; i++) {
  if (i == 0) {
    maxMarks = marks[i];
  } else if (marks[i] > maxMarks) {
    maxMarks = marks[i];
  }
}

// Avg Marks
for (let i = 0; i < marks.length; i++) {
  avgMarks += marks[i];
}

avgMarks = avgMarks / marks.length;

// Sum Marks
for (let i = 0; i < marks.length; i++) {
  sumMarks += marks[i];
}

// Shorthand
// minMarks = Math.min(...marks);
// maxMarks = Math.max(...marks);
// avgMarks = marks.reduce((a, b) => a + b) / marks.length;
// sumMarks = marks.reduce((a, b) => a + b);

console.log({ minMarks, maxMarks, avgMarks, sumMarks });
