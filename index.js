const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./src/databases/database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.sequelize.sync().then(() => {
  console.log('Table created');
});
  
const inventoryRoutes = require('./src/routes/inventoryRoutes');

app.use('/inventory', inventoryRoutes);

app.listen(PORT, () => {
    console.log(`The server is up and running. Listening on ${PORT}.`);
})

