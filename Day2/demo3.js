function demo1(name) {
    console.log(`${name} Welcome to the Bootcamp \n Timings 6:30 - 9:30`);
}

function addTwo(i,j){
    return i + j;
}

const expression = function addMany() {
    sum = 0;
    for (i = 0;i < arguments.length;i++){
        sum += arguments[i];
    }
    return sum;
};

console.log(((a,b) => a + b)(2,3));

const arrow = (name) =>{
    console.log(`Hello ${name}`);
}

arrow("Paritosh");

demo1("Paritosh");
console.log(addTwo(2,3));
// console.log(addMany(1,2,3,4,5));