const Sequelize = require('sequelize');


module.exports = (sequelize) => {
    class Product extends Sequelize.Model {}
    Product.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a product name',
                },
                notEmpty: {
                    msg: 'Please provide a product name',
                }
            }
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a price value',
                },
                notEmpty: {
                    msg: 'Please provide a price value',
                }
                }
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a category value',
                },
                notEmpty: {
                    msg: 'Please provide a category value',
                }
                }
            }
    }, { 
        timestamps: false,
        sequelize });

        return Product;
};