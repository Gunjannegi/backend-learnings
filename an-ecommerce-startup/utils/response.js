exports.sendErrorResponse = (res,err) =>{
     const statusCode = err.statusCode;
     const message = err.message;
     res.status(statusCode).json({
        message:message,
        status: false
     });
}

exports.sendResponse = (res,data,statusCode) =>{
    res.status(statusCode).json({
        data:data,
        status: true
    })
}