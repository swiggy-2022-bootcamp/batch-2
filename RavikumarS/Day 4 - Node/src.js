// In node every file is a module on it's own.
//access module variable to work

console.log(module);

const logFunction = require("./dependency");
logFunction("Ravi");

//modules
const os = require("os");
console.log(`Free mem in OS: ${os.freemem}`);

//async version of methods offered by fs module require callback function as 2nd parameter; while sync versions don't
const fs = require("fs");
fs.readdir(".", (err, files) => {
    if(err) console.log("Error occured. More details: ", err.message);
    else console.log(files);
});

//sync version 
console.log(fs.readdirSync("."));