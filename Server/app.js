const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const Sequelize = require("sequelize");
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
      order: [["date", "DESC"]],
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

// Handle get revenue monthly
app.get("/revenue/monthly", async (req, res) => {
  try {
    const monthlyRevenue = await Invoice.findAll({
      attributes: [
        [Sequelize.literal('EXTRACT(MONTH FROM "date")'), "month"],
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "totalRevenue"],
      ],
      group: [Sequelize.literal('EXTRACT(MONTH FROM "date")')],
    });

    let label = [];
    let data = [];

    console.log(monthlyRevenue);

    monthlyRevenue?.forEach((el) => {
      label.push(el.dataValues.month);
      data.push(el.dataValues.totalRevenue);
    });

    let result = {
      label,
      data,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle get revenue daily
app.get("/revenue/daily", async (req, res) => {
  try {
    const dailyRevenue = await Invoice.findAll({
      attributes: [
        [Sequelize.literal("DATE_TRUNC('day', date)"), "date"],
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "totalDailyRevenue"],
      ],
      group: [Sequelize.literal("DATE_TRUNC('day', date)")],
      order: [Sequelize.literal("DATE_TRUNC('day', date)")],
    });

    let label = [];
    let data = [];

    dailyRevenue?.forEach((el) => {
      label.push(el.dataValues.date);
      data.push(el.dataValues.totalDailyRevenue);
    });

    let result = {
      label,
      data,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle get revenue yearly
app.get("/revenue/yearly", async (req, res) => {
  try {
    const yearlyRevenue = await Invoice.findAll({
      attributes: [
        [Sequelize.literal('EXTRACT(YEAR FROM "date")'), "year"],
        [
          Sequelize.literal(
            'SUM(SUM("totalPrice")) OVER (PARTITION BY EXTRACT(YEAR FROM "date"))'
          ),
          "totalYearlyRevenue",
        ],
      ],
      group: [Sequelize.literal('EXTRACT(YEAR FROM "date")')],
      order: [Sequelize.literal('EXTRACT(YEAR FROM "date")')],
    });

    let label = [];
    let data = [];

    yearlyRevenue?.forEach((el) => {
      label.push(el.dataValues.year);
      data.push(el.dataValues.totalYearlyRevenue);
    });

    let result = {
      label,
      data,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
