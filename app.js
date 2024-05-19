const express = require('express');
const router = require('./routes/index');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api', router);

app.use((err, req, res) => {
  return res.status(500).json({ message: 'Server Error' });
});

module.exports = app;
