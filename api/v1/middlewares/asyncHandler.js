/**********************
 * This simple middleware is used to wrap async express routes and handle exceptions.
 * So, instead of using try/catch blocks, we can use this middleware.
 * This is a very useful pattern and will pass your errors to your express error handlers.
 *
 * A simple example:
 *
 * instead of this,
 * const createUser =  async (req, res) ={
 *      try{
 *  // do something here
 * } catch(err){
 *  // handle error here
 * }
 *
 * do this:
 * const createUser = asyncHandler(async (req, res, next) => {
 *      //do something here with try/catch
 * }
 *
 *****************************/// 

const asyncHandler = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};

module.exports = asyncHandler; 