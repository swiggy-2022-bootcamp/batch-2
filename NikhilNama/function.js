// function declaration
function add(a, b) {
  return a + b;
}

const val = add(10 + 12);
console.log(val);

function welcome(name) {
  console.log(`Welocme to Swiggy i++ ${name}`);
}

welcome("Nick");

const arrow = (name) => {
  console.log(`This is an arrow function`, name);
};
arrow("Varun");

const anonymous = function () {
  console.log("This is an Anonymous Function");
};

anonymous();
