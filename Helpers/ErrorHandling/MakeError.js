const makeError = require("http-errors");
function coatError(err) {
  if(err.status)
    return err;
  if (err.code===404)
    return new makeError.Unauthorized();
  return new makeError.InternalServerError();
}

module.exports = { makeError, coatError };