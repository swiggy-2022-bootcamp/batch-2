// Function Declarations
function sayName(name) {
  console.log(name);
}

// Function Expressions
const sayNameExpr = function (name) {
  console.log(name);
};

// Arrow Function
const sayNameArrow = (name) => {
  console.log(name);
};

// One Line Arrow Function
const sayNameArrowOneLine = (name) => console.log(name);

// Function Invocation
sayName("Rishabh");
sayNameExpr("Rishabh");
sayNameArrow("Rishabh");
sayNameArrowOneLine("Rishabh");
