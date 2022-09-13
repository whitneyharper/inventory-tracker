require("dotenv").config();
const app = require('./app');
const PORT = process.env.PORT || 3001;


//==================================================
// SERVER
//==================================================
app.listen(PORT, () => {
  console.log(`The server is up and running. Listening on ${PORT}.`);
});