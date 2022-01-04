function stringsAreImmutable() {
  let s = "Hello";
  s += " World";
  console.log(s === "Hello World");
}

function typeCoersion() {
  let a = "42";
  let b = 42;
  console.log(a == b);
}

function objectLiterals() {
  let a = { x: 42 };
  let b = { x: 42 };
  console.log(a === b);
}

function objectAreComparedUsingReference() {
  let a = { x: 42 };
  let b = a;
  console.log(a === b);
}

stringsAreImmutable();
typeCoersion();
objectLiterals();
objectAreComparedUsingReference();
