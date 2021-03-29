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

function createFunction1(current, theDate) {
  let theResult = null;
  if ((current - 300) <= theDate && theDate <= (current + 300)) {
    // console.log('verified');
    theResult = true;
  } else {
    theResult = false;
  }
  return theResult;
}
// else { // this is OUT-OF-SPEC.  IF ANY OUT OF SPEC, THEN IT'S 401.
//   res.sendStatus(StatusCodes.UNAUTHORIZED);
// }
module.exports = (req, res, next) => {
  const z = findValue('date-validation', req.query);
  const y = findValue('date-validation', req.headers);
  console.log(z);
  console.log(y);
  const requestDate = Number.parseInt(z, 10);
  const requestDateTest = Number.parseInt(y, 10);
  // console.log(requestDateTest);
  // console.log(requestDateTest);
  const currentDate = Math.round(Date.now() / 1000);
  console.log(currentDate);
  if (!Number.isNaN(requestDate || requestDateTest)) {
    let test1 = null;
    let test2 = null;
    if (z !== null) {
      test1 = createFunction1(currentDate, requestDate);
    }
    // check if query is in spec
    console.log(test1);
    if (y !== null) {
      test2 = createFunction1(currentDate, requestDateTest);// check if header is in spec
    }
    console.log(test2);
    // if it returns false, then it is out of spec. end out right.
    // if (test1 === true && y === null) {
    //   console.log('good to go');
    // } else if (test2 === true && z === null) {
    //   console.log('good to go 2');
    // }
    if (test1 === false || test2 === false) {
      console.log('at least one date is out-of-spec');
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    } else {
      console.log('good to go actually');
      next();
    }
    // console.log(test1);
    // console.log(test2);
    // console.log('it is a number');
    // console.log(requestDate);
    // console.log(currentDate);
    // // req.dateValidation = date;// property for future middleware to use. (logger)
    // // req.currentValidation = current; // property for future middleware to use like above
    //
    // console.log(y);
    // this is IN-SPEC
  } else {
    console.log('no dates supplied');
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
  // check if null. if it is null then the request KEY is bad. ABOVE
  // checks if value is bad

  // console.log(findValue('date-validation', req.query));
  // console.log(findValue('date-validation', req.headers));// same as req.query.
  // It's just larger. Will loop more
};
