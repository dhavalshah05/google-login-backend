/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch((err) => {
            let error = new Error(err);
            error.status = 500;
            next(error);
        });
    };
};

exports.notFound = (req, res, next) => {
    const err = new Error('Route Not Found');
    err.status = 404;
    next(err);
};


exports.devErrors = (err, req, res, next) => {
    const errorDetails = {
        success: false,
        status: err.status || 500,
        message: err.message
    };
    res.status(err.status || 500);
    res.json(errorDetails);
};