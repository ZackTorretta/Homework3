const StatusCodes = require('http-status-codes');

const findValue = (thing, search) => {
  const x = thing.toLowerCase();
  let result = null;
  let k = '';
  Object.keys(search).forEach((key) => {
    // set k as a variable above. that way it doesn't have to constantly create 'const k' per loop
    k = key.toLowerCase(); // set k to the key but lower case
    if (k === x) {
      result = search[key];
    }
  });
  return result;
};
function checkValidity(current, theDate) {
  let theResult;
  if (!Number.isNaN(theDate)) {
    if ((current - 300) <= theDate && theDate <= (current + 300)) {
      theResult = 'inSpec';
    } else {
      theResult = 'outSpec';
    }
  } else {
    theResult = 'outSpec';
  }
  return theResult;
}
module.exports = (req, res, next) => {
  const z = findValue('date-validation', req.query);
  const y = findValue('date-validation', req.headers);
  // if z and y are NULL. Then it's blank or they didn't type date-validation correctly.
  let queryDate = null; // query info
  let headerDate = null;// header info
  let queryReturn;
  let headerReturn;
  let compareDates = ''; // to check if the two dates are equal
  const currentDate = Math.round(Date.now() / 1000);
  // no need to run parse int if it's a null. waste of time.
  if (z !== null) {
    queryDate = Number.parseInt(z, 10);
    queryReturn = checkValidity(currentDate, queryDate);
  } else {
    queryReturn = 'notNum'; // don't need isNaN function to check anything here because it was a NULL
  }
  if (y !== null) {
    headerDate = Number.parseInt(y, 10);
    headerReturn = checkValidity(currentDate, headerDate);
  } else {
    headerReturn = 'notNum'; // again, it's a NULL, so not need to check isNaN from function
  }
  // here it checks if both are numbers/dates. if so, are they equal?
  if (queryReturn !== 'notNum' && headerReturn !== 'notNum') {
    if (queryDate !== headerDate) {
      compareDates = 'diffNumbers';
    }
  }
  if (queryReturn === 'notNum' && headerReturn === 'notNum') { // if neither supplied date, send 401 here
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  } else if (queryReturn === 'outSpec' || headerReturn === 'outSpec') { // if at least one out of spec. 401
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  } else if (compareDates === 'diffNumbers') { // if both are numbers, but not same. 401
    if (queryDate !== headerDate) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  } else {
    if (queryReturn === 'inSpec') {
      req.dateValidation = queryDate;
    } else {
      req.dateValidation = headerDate;
    }
    req.currentDate = currentDate;// IMPORTANT: we need to log this anyway
    // both have to be equal to each other if they are numbers/dates.
    // so, if both are in-spec and same #. either one works for the property object.
    next();
  }
};
