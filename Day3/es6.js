const sum = () => 15;
const addition = (x,y = x * sum()) => x+y;
console.log(sum(),addition(10));

const name = ["Elon","John","Albert"];
console.log(...name);

const i = [1,2,3,4,5]
const j = i
i.push(6)
console.log(j)

const k = new Map();
k.set("users",["user1"]);
console.log(k)
