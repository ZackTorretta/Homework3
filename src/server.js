const express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
require('dotenv/config');

const app = express();
app.use(BodyParser.json());
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

(async () => {
  await Mongoose.connect('mongodb+srv://ADMIN:ztorre97@cluster0.doojn.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8080);
})();
