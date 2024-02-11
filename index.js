const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { router } = require("./routesPart/router");
const { connection } = require("./config/connection");
const swaggerdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chess App",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routesPart/router.js"],
};

const swaggerSpec = swaggerdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerSpec));

app.use("", router);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connection");
  } catch (err) {
    console.log(`server is not connect with ${process.env.PORT} port`);
  }
  console.log(`server is connected with port ${process.env.PORT} data base`);
});
