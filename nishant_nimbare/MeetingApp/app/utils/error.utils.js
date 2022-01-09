
exports.makeErr = (message, statusCode = 500) => {
    let err = new Error(message);
    err.statusCode = statusCode;
    return err;
}

exports.globalErrorHandler = (err, req, res, next) => {
    console.error("A error occurred!!:" + err.stack);
    res.status(err.statusCode).send({
        message: err.message
    });
}