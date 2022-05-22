require("dotenv").config({ path: "../../.env" });
const fs = require("fs");
const path = require("path");

const dbSetup = require("../databases/database");

dbSetup();

//Load Models
const Product  = require("../models/inventory");

//Read JSON files
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, "utf-8"));

//Import data into DB
exports.importData = async () => {
    try {
        const foundProducts = await Product.find();
        if (foundProducts.length > 0) {
            console.log("Data exists");
        } else {
            await Product.create(products);
            console.log("Data imported");
            return;
        }
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === "-i") {
    importData().then();
}