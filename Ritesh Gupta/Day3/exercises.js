// Write an arrow function that takes a value and compares if it is even or odd.

const fun1 = num => {

    if(isNaN(num)){
        console.log("Input is not a number.");
        return
    }

    if (num%2 == 0)
        console.log(`${num} is even.`);
    else
        console.log(`${num} is odd.`);
}


fun1(24);
fun1("hello");
