const StatusCodes = require('http-status-codes');

module.exports = (req, res, next) => {
  if (req.method === 'DELETE') {
    console.log(req.method);
    res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
  // res.status(StatusCodes.OK).send('hello');
};
