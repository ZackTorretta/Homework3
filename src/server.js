const express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const StatusCodes = require('http-status-codes');
const methodMiddleware = require('../Middlewares/methodMiddleware');
const dateValidation = require('../Middlewares/dateValidation');
require('dotenv/config');

const app = express();
app.use(BodyParser.json());
app.use(methodMiddleware);
app.use(dateValidation);
app.all('/', (req, res) => {
  res.status(StatusCodes.OK).send('hello');
});

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('hello');
});

(async () => {
  await Mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8080);
})();
/* app.use((req, res, next) => {
  console.log('hello');
  req.whatever = 123;
  next();
});
app.use((req, res, next) => {
  console.log(req.whatever);
  next();
}); */
