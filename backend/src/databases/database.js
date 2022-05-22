const mongoose = require('mongoose');

const connectionString = process.env.DATABASE_URL || `mongodb://localhost:27017/tracker`;

module.exports = function () {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
  })
    .then(() => {
      console.log('Mongo Connection Open!');
    })
    .catch((err) => {
      console.log('Mongo Connection Error!', err);
    });
};