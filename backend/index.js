require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const cors = require("cors");

//==================================================
// Middleware
//==================================================
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

//==================================================
// DATABASE
//==================================================
const dbSetup = require('./src/databases/database');
dbSetup();

//==================================================
// Routes
//==================================================
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const warehouseRoutes = require('./src/routes/warehouseRoutes');
const userRoutes = require('./src/routes/useRoutes')

app.use('/inventories', inventoryRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/users', userRoutes);

//error handler utility
app.use((err, req, res, next) => {
  const { status = 500, message = "Sorry, something went wrong" } = err;
  res.status(status).json(message);
});

//==================================================
// SERVER
//==================================================
app.listen(PORT, () => {
  console.log(`The server is up and running. Listening on ${PORT}.`);
});