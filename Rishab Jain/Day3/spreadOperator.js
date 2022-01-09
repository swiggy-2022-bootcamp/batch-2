let num1 = [1, 2, 3];
let num2 = [...num1, 4, 5];

console.log(num2);

// rest parameters

let fun = function(...args){
    console.log(args);
}

let add = function(x, y, z){
    console.log(x + y + z);
}

fun(10);
fun(10, 20, 30);

add(...num1);
add(...num2);