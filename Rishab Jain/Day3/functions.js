const sum = () => 15;

const addition = function(x, y = x * sum()){
    return x + y;
}

const res = addition(10);
console.log(res);