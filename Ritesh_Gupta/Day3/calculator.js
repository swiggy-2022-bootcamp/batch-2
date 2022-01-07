// Create a basic calculator using arrow functions

const calculate = (num1, num2, operation) => {
    let result = 0;

    if (operation === "add")
        result = num1 + num2;
    
    else if (operation === "subtract")
        result = num1 - num2;
    
    else if (operation === "multiply")
        result = num1*num2;
    else if (operation === "divide"){
        if (num2 === 0){
            return "Division by zero not possible";
        }

        result = num1/num2;
    }
    
    return result;
}

console.log(calculate(23, 54, "add"));
console.log(calculate(25, 21, "subtract"));
console.log(calculate(3, 4, "multiply"));
console.log(calculate(10, 5, "divide"));

