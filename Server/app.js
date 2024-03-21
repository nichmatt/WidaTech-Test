const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");

const { Invoice } = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Connected to server with Express",
  });
});

// Handle get invoices
app.get("/invoices", async (req, res) => {
  try {
    const page = req.query.p - 1 || 0;
    console.log(req.query.p);
    const offset = page * 8;
    const { rows: invoices, count: totalData } = await Invoice.findAndCountAll({
      offset,
      limit: 8,
    });
    console.log(invoices);
    let count = Math.ceil(totalData / 8);
    res.status(200).json({ invoices, count, totalData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle add invoice
app.post("/invoices", async (req, res) => {
  try {
    console.log(req.body);
    await Invoice.create(req.body);
    res.json({ message: "Invoice created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
