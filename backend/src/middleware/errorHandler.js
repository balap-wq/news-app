export function errorHandler(err, req, res, next) {
    let statusCode =500;
    let message =err.message ||'Internal server error';

    if(err.name=="ValidationError"){
        statusCode= 400;
    }
    else if(err.name=="NotFoundError"){
        statusCode= 404;
    }
     res.status(statusCode).json({
        error: message,
        code: statusCode,
    });

}
