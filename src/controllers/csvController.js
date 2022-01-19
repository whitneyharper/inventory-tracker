const db = require('../databases/database');
const { Product } = db.models;

const CsvParser = require('json2csv').Parser;

const asyncHandler = (cb) => {
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

exports.downloadCSV = asyncHandler(async(req, res) => {
    await Product.findAll()
        .then((objs) => { let products = []; 
        
        objs.forEach((obj) => {
            const { id, name, price, quantity, category } = obj;
            products.push({ id, name, price, quantity, category });
        });

        const csvFields = ['Id', 'Name', 'Price', 'Quantity', 'Category'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(products);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=products.csv');

        res.status(200).end(csvData);
        });
    }
)