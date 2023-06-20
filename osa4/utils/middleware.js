const { info } = require("./logger");

const requestLogger = (request, response, next) => {
  info("method:", request.method);
  info("path:  ", request.path);
  info("body:  ", request.body);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint." });
};

const errorHandler = (error, request, response, next) => {
  info(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Error: Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
