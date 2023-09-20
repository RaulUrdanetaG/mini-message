const mongoose = require("mongoose");
require("dotenv").config();

// Config options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connecting to db
mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB:", error);
  });
