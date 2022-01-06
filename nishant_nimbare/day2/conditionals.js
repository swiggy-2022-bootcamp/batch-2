let n = 7;

if(n===0){
    console.log("num is 0");
}else if(n%2 === 0){
    console.log("num is divisible by 2");
}else{
    console.log("num is not divisible by 2");
}


console.log("num "+ n +" is "+ ((n<0)?("negative"):("positive")));

let m = 76;
let alertMsg;

if(m>90){
    alertMsg = "above 90";
}else if(m>75){
    alertMsg = "above 75";
}else if(m>50){
    alertMsg = "above 50";
}else{
    alertMsg = "below 50";
}

alert(alertMsg);
console.log(alertMsg);
