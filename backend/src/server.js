const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('welcome to backend!');
})

app.listen(PORT, () => {
  console.log('listening on port '+PORT);
});