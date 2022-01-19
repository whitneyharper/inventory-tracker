const Sequelize = require('sequelize');
const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'inventory.db',
        logging: false
    },
    );



const db = {
    sequelize,
    Sequelize,
    models: {}
};

db.models.Product = require('../models/inventoryModel') (sequelize);




module.exports = db;