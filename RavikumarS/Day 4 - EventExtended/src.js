const EventEmitter = require("events");
const Sidekick = require("./sidekick");

const sidekick = new Sidekick();
sidekick.on("loggerInvoked", () => console.log("event emitted"));
sidekick.logger("Ravi is here");

