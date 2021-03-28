const express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = express();

/* app.use((req, res, next) => {
  console.log('hello');
  req.whatever = 123;
  next();
});
app.use((req, res, next) => {
  console.log(req.whatever);
  next();
}); */
app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(8080);
