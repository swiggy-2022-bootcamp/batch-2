
//Fn
function add(x, y) {
    return x + y;
}

let addition = add(2, 2)
console.log(`addition = ${addition}`);


// Fn Exp
let addFnExp = function (x, y) {
    return x + y;
}


addition = addFnExp(2, 2)
console.log(`addition = ${addition}`);

//Arrow Fn

let addFnArr = (x, y) => x + y;

addition = addFnArr(2, 2)
console.log(`addition = ${addition}`);

