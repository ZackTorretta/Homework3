const express = require('express');

const app = express();
const dateOb = new Date();

app.get('/', (req, res) => {
  const hours = dateOb.getHours();
  const objOne = JSON.stringify(hours);
  const minutes = dateOb.getMinutes();
  const objTwo = JSON.stringify(minutes);
  const time = `${objOne}:${objTwo}`;
  res.send(time);
});

app.listen(8080);
