const logger = require("./logger");
const jwt = require("jsonwebtoken");

const userExtractor = (request, response, next) => {
  const authString = request.get("authorization");
  if (!authString) return response.status(401).json({ error: "Missing token" });
  if (authString.toLowerCase().startsWith("bearer ")) {
    token = authString.substring(7);
    user = jwt.verify(token, process.env.SECRET_KEY);
    request.user = user;
  }
  next();
};
const tokenExtractor = (request, response, next) => {
  const authString = request.get("authorization");
  if (authString && authString.toLowerCase().startsWith("bearer ")) {
    request.token = authString.substring(7);
  }
  next();
};
const requestLogger = (request, response, next) => {
  //logger.info("JWT token:", request.token);
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError")
    return response.status(400).send({ error: "Malformatted id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  else if (error.name === "JsonWebTokenError")
    return response.status(401).json({ error: "Invalid token" });

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
