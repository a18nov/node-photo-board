const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('I will not name it arbitrary thing!')
});

app.listen(6363, () => {
  console.log('Listening on port 6363!')
});