import express from "express";
import cors from "cors";
//import db from "./dbconnection.js";

import {
  getAllItems,
  deleteItemById,
  addItem,
  updateItem,
} from "./dbconnection.js";

//const express = require("express");
//const cors = require("cors");
//const db = require("./dbconnection");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/items", async (req, res) => {
  try {
    const result = await getAllItems();
    res.json(result);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database query error");
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await deleteItemById(itemId);
    res.status(200).send(`Item with ID ${itemId} deleted successfully`);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database query error");
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { Type, Name, ItemLevel } = req.body;
    await addItem(Type, Name, ItemLevel);
    res.status(201).send("Item added successfully");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database insertion error");
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { Type, Name, ItemLevel } = req.body;
    await updateItem(id, Type, Name, ItemLevel);
    res.status(201).send("Item successfully updated");
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Database insertion error");
  }
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
