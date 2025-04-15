"use script";
const express = require("express");
const app = express();
const winston = require("winston");
const port = 3000;
// winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// add two numbers
const addTwoNumber = (n1, n2) => {
  return n1 + n2;
};
// substract two numbers
const subTwoNumber = (n1, n2) => {
  return n1 - n2;
};
// multiply two numbers
const mulTwoNumber = (n1, n2) => {
  return n1 * n2;
};
// divide two numbers
const divTwoNumber = (n1, n2) => {
  return n1 / n2;
};

// exponentiation of two numbers
const expTwoNumber = (n1, n2) => {
  return Math.pow(n1, n2);
};
// square root of a number
const sqrtNumber = (n1) => {
  return Math.sqrt(n1);
};

// modulo operation of two numbers
const modTwoNumber = (n1, n2) => {
  return n1 % n2;
};

// check for valid input
const checkForValidInput = (n1, n2) => {
  if (isNaN(n1) || isNaN(n2)) {
    logger.log({ level: "error", message: `Invalid input ${n1} and ${n2}` });
    return false;
  }
  return true;
};

// adding two numbers REST API
app.get("/add", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = addTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});

// substracting two numbers REST API
app.get("/sub", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = subTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});

// multiply two numbers REST API
app.get("/multiply", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = mulTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});

// divide two numbers REST API
app.get("/divide", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = divTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});

// exponentiation of two numbers REST API
app.get("/exponent", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = expTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});
// square root of a number REST API
app.get("/sqrt", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    if (isNaN(n1)) {
      logger.log({ level: "error", message: `Invalid input ${n1}` });
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = sqrtNumber(n1);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});
// modulo operation of two numbers REST API
app.get("/mod", (req, res) => {
  try {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    if (!checkForValidInput(n1, n2)) {
      return res.status(400).json({ statuscode: 400, error: "Invalid Input" });
    }
    const result = modTwoNumber(n1, n2);
    res.json({ statuscocde: 200, data: result });
  } catch (error) {
    return res.status(400).json({ statuscode: 400, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
