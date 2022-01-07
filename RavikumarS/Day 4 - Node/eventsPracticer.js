const EventEmitter = require("events");
const { emit } = require("process");

const event = new EventEmitter();
event.on("event1", (eventArg) => console.log("event1 called. Event param: ", eventArg));
event.emit("event1", {eventId: 1, msg: "Yeeeet"});
//registering event handler after emitting wouldn't work - as node works asyc
//event.on("event1", () => console.log("event1 called"));