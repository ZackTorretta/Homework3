const Winston = require('winston');
const util = require('util'); // only bringing this in to pretty up the code.

const winstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});
// this doesn't ever respond with status code. it simply logs and continues.
// if it made it this far, it's a good request, just need to log.
module.exports = (req, res, next) => {
  // stated that we must log at information level.
  winstonLogger.log('info', util.format(req.currentDate, req.method, req.originalUrl, req.body, req.query, req.headers,
    req.dateValidation));
  next();
};
