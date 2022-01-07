const EventEmitter = require("events");

//when events have to be caught in other modules
class SideKick extends EventEmitter{
    logger(message){
        console.log("Logging: ", message);
        this.emit("loggerInvoked");
    }
}

module.exports = SideKick;