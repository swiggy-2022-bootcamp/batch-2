const log = {
    info:(log) => {
        console.log("Log " + log);
    },
    warning: (warning) => {
        console.log("Warning " + warning);
    },
    error: (error) => {
        console.log("Error " + error);
    }
}

module.exports = log;