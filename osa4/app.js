const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const { info } = require("./utils/logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

info(`Connected to ${config.MONGODB_URI}`);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
