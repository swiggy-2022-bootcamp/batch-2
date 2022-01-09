// Iteration over object

const obj = { a: 1, b: 2, c: 3 };

for (const prop in obj) {
    console.log(`obj.${prop} = ${obj[prop]}`);
}