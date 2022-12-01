const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Index Sayfası');
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
