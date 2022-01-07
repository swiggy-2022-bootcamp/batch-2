//every module is "function wrapped" first. And that function has parameters like "exports"

function logger(message){
    console.log(`Hi, ${message}`);
}

//export whatever you need to make public
//module.exports.logFunction = logger;
module.exports = logger;