let name = 'Prikshit';
let age = 25;
let isPresent = true;
let undefineVar

console.log(name,age,isPresent,undefineVar);
console.log("Type of", typeof(name));
console.log("type of", typeof(isPresent));
console.log("Type of", typeof(age));

let temp1 = "demoData";
let temp2 = "demoData";

console.log("Comparing String", temp1 == temp2);

let num1 = 20;
let num2 = 40;

console.log("Comparing Numbers", 2*num1 == num2);

let nums = [25, 50, 75];
console.log("Prinitng Array", nums);
nums[2] = 400;
console.log("Prinitng Array After Updating", nums);

let arr = [ 'one', 'two', 'three' ];
arr[0] = 'ONE';
console.log(arr);

let userOne = {
    name:'TestName',
    role:'SDE',
    country:'India'
    };
    
let userTwo = {
    name:'DemoUser',
    role:'SDE2',
    country:'Canada'
    };

console.log("Prinitng UserOne", userOne);
console.log("Printing UserTwo", userTwo);

console.log("Comparing Users", userOne == userTwo);