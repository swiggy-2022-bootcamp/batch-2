const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let num = process.stdin.read((num) => {
    if (num % 2 == 0)
        console.log('Even number!');
    else
        console.log('Odd number');
});