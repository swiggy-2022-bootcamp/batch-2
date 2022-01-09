const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const usersRouter = require("./controller/routes/users");
const createError = require("http-errors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Meetings Application",
      description: "An application for meeting schedule management",
      contact: {
        name: "Murtaza Sadriwala",
      },
      servers: [`http://${config.get("app.host")}:${config.get("app.port")}`],
    },
  },
  apis: [".controller/routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const uri = `mongodb+srv://${config.get("app.db.username")}:${config.get("app.db.password")}@cluster0.juzyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.raw());

app.use("/api/user", usersRouter);

//middleware: 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(config.get("app.port"), function () {
      console.log(`App listening on ${config.get("app.port")}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
