require('express-async-errors');
const express = require('express');

const authRouter = require('./routers/authRouter');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
// ...

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use(errorHandlerMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
