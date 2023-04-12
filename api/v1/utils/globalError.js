/*****************
 * This module is a global error class for handling errors around the application.
 *
 * This globalError class, extends from the Express Error class.
 *
 * So, when we need to handle and error, we create an instance of this class.
 *
 * Example:
 *
 *  next ( new globalError ('something went wrong', 500) );
 *
 * The new keyword is used to create an instance of a class.
 */

class globalError extends Error {
    //defining the constructor of the class.
    constructor(message, statusCode) {
        super(message); //This message comes from the Express error class.;

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        //marking error as operational, so that we can handle it in the global error handling middleware.
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default globalError;