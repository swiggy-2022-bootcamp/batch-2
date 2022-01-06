// Arrow Function
const Mul = (a, b) => {
  return a * b;
};

console.log(Mul(18, 3));

// Self Invoking Function
(function (name) {
  console.log("Hello", name);
})("Nick");

function runLenght(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    console.log("Run lenght Encoding is  ", sum);
  }
}
const arr = [1, 2, 3, 4, 5];

runLenght(arr);

// Task
const EvenOdd = (num) => {
  if (num % 2) console.log("Odd Number");
  else console.log("Even Number");
};

EvenOdd(11);

const user = {
  username: "Swagath",
  password: "admin123",
};

let { username, password } = user;

console.log(username);
console.log(password);
