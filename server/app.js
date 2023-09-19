const express = require("express");
require("dotenv").config();

const app = express();

// config

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server running in port ${process.env.PORT}`);
});
