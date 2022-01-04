// node demo.js

let a = 10;
let b = "10";

console.log("a+b ", a+b);
console.log("a+a ", a+a);
console.log("a+''+a ", a+""+a);

console.log("a===a ", a===a);
console.log("a==b ", a==b);
console.log("a!=b ", a!=b);
console.log("a===b ", a===b);
console.log("a===int(b) ", a === parseInt(b));

console.log("25>25.01 ", (25>25.01));
console.log("25<25.01 ", (25<25.01));

let o1 = {
    p1 : "nishant",
    p2 : 25
}

let o2 = {
    p1 : "nishant",
    p2 : 25 
}

console.log("o1 == o2 ", o1==o2);
console.log("o1 === o2 ", o1===o2);


