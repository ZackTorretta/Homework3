const StatusCodes = require('http-status-codes');

module.exports = (err, req, res, next) => {
  console.log(err.message);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`We're sorry, the error was: ${err.message}`);
};
