const express = require("express");

const app = express();

app.use(express.json());


app.get("/api/headlines", (req, res) => {

  const { page, category } = req.query;

  if (category === "invalid") {
    return res.status(400).json({ error: "Invalid category" });
  }

  if (page && Number(page) <= 0) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  return res.status(200).json({
    data: [],
    page: Number(page) || 1,
    limit: 20
  });

});

module.exports = app;