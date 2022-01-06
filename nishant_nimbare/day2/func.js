function unlimitParams(){
    console.log(arguments);
    return Math.max(...arguments);
}

console.log(unlimitParams(23,54,56,78,24,67,44));


let anonyFunc = function(...args){
    console.log(args);
    return Math.min(...args);
}

console.log(anonyFunc(23,54,56,78,24,67,44));

console.log("-------------------");


let print = (...funcs) => {
    funcs.forEach(f => {
        console.log(f(1,2,3,4,5));
    });
}

//self invoking
(function(){
    console.log("self invoking");
    print(unlimitParams, anonyFunc);
})();
