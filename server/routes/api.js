const router = require("express").Router();

const Message = require("../models/message.model");

router.get("/", async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $group: {
          _id: "$date",
          dateMessages: { $addToSet: "$$ROOT" },
        },
      },
      {
        $unwind: "$dateMessages",
      },
      {
        $sort: {
          _id: 1,
          "dateMessages.time": 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          dateMessages: { $push: "$dateMessages" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const users = await Message.aggregate([
      {
        $group: {
          _id: "$user",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const fullResponse = { messages, users };
    res.json(fullResponse);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los mensajes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.json(message);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
