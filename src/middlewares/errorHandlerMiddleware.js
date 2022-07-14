const errorHandlerMiddleware = (err, _req, res, _next) => {
  const { name, message, type, code } = err;

  if (type && type.substring(6) === '.min') {
    return res.status(422).json({ message });
  }

  switch (name) {
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(code).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
};

module.exports = errorHandlerMiddleware;
