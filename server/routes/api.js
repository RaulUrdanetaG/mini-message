const router = require("express").Router();

const Message = require("../models/message.model");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
});

module.exports = router;
