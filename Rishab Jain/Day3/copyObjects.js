let obj1 = {
    x: 10,
    y: 20
}

let obj2 = {
    z: 30
}

let obj3 = {...obj1, ...obj2};

console.log(obj3);