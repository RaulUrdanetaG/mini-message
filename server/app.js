const express = require("express");

require("./config/db");
require("dotenv").config();

const app = express();

// config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GETs and POSTs
app.use("/", require("./routes/api"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
