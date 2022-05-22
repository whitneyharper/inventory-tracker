require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require("cors");

//==================================================
// Middleware
//==================================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================================================
// DATABASE
//==================================================
const dbSetup = require("./src/databases/database");
dbSetup();

//==================================================
// Routes
//==================================================
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const warehouseRoutes = require('./src/routes/warehouseRoutes');

app.use('/inventory', inventoryRoutes);
app.use('/warehouse', warehouseRoutes);

//==================================================
// Seeders
//==================================================

const { importData } = require("./src/seeders/dataSeeder");
console.log(importData());

//error handler utility
app.use((err, req, res, next) => {
  const { status = 500, message = "Sorry, something went wrong" } = err;
  res.status(status).json(message);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`The server is up and running. Listening on ${PORT}.`);
});