const express = require('express');

const accountRouter = require('./accounts/accountRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>API for Accounts!</h2>`);
});

server.use(logger);
server.use(express.json());
server.use('/api/accounts', accountRouter);

//custom logger middleware

function logger(req, res, next) {
  console.log(
    `${req.method} to http://localhost/4000${req.path} at `,
    Date.now(),
  );
  next();
}

module.exports = server;
