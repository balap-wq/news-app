// export const errorHandler = (err, req, res, _next) => {
//   let statusCode = 500;
//   const message = err.message || "Internal Server Error";

//   if (err.name === "ValidationError") {
//     statusCode = 400;
//   } else if (err.name === "NotFoundError") {
//     statusCode = 404;
//   }

//   res.status(statusCode).json({
//     error: message,
//     code: statusCode,
//   });
// };

 export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    code: statusCode,
  });
};
