"use strict";
const express = require("express"),
  redis = require("ioredis"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  helmet = require('helmet'),
  morgan = require('morgan');
 
const config = require("./configuration/env");

const app = express();

/* Better security of the blog app */
app.use(helmet()); 

/* Better logging of the blog app */
app.use(morgan("combined"));
app.use(cors());

app.set("port", config.PORT);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const blogs = require("./routes/blog.route");

app.use("/", blogs);

app.all("/*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Opps something went wrong");
});

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});