const errorHandlerMiddleware = (err, _req, res, _next) => {
  const { name, message, code } = err;

  console.log(name, message);

  switch (name) {
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(code).json({ message }); break;
    case 'ConflictError': res.status(409).json({ message }); break;
    case 'UnauthorizedError': res.status(401).json({ message }); break;
    default: res.status(500).json({ message }); break;
  }
};

module.exports = errorHandlerMiddleware;
