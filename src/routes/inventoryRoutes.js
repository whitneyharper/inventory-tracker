const express = require('express');
const router = express.Router();
const { viewInventory, createProduct, updateProduct, deleteProduct} = require('../controllers/inventoryControllers');
const { downloadCSV } = require('../controllers/csvController');

//POST ROUTE TO CREATE NEW INVENTORY ITEM
router.post('/', createProduct);
//GET ROUTE TO VIEW ALL INVENTORY ITEMS
router.get('/', viewInventory);
//PUT ROUTE TO UPDATE EXISTING INVENTORY ITEM BY SPECIFIC ID
router.put('/:id', updateProduct);
//DELETE ROUTE TO DELETE EXISTING INVENTORY ITEM BY SPECIFIC ID
router.delete('/:id', deleteProduct);
//GET ROUTE TO DOWNLOAD CSV FILE
router.get('/download', downloadCSV);

module.exports = router;