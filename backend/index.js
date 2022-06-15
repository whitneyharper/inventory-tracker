require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
// const mongoose = require('mongoose');
// const connectionString = process.env.DATABASE_URL;
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

//Database
const dbSetup = require('./src/databases/database');
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

//==================================================
// DATABASE
//==================================================
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,   
// })
//     .then(() => {
//       console.log('Mongo Connection Open!');
//     })
//     .then(() => {
//       app.listen(PORT, () => {
//         console.log(`The server is up and running. Listening on ${PORT}.`);
//       });
//     })
//     .catch((err) => {
//       console.log('Mongo Connection Error!', err);
//     });


app.listen(PORT, () => {
          console.log(`The server is up and running. Listening on ${PORT}.`);
        });