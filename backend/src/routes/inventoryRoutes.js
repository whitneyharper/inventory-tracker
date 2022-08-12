const express = require('express');
const router = express.Router();
const { viewInventory, createProduct, updateProduct, deleteProduct} = require('../controllers/inventoryControllers');
const { requireAuth } = require('../middleware/requireAuth');

router.use(requireAuth);

//POST ROUTE TO CREATE NEW INVENTORY ITEM
router.post('/', createProduct);
// //GET ROUTE TO VIEW ALL INVENTORY ITEMS
router.get('/', viewInventory);
// //PUT ROUTE TO UPDATE EXISTING INVENTORY ITEM BY SPECIFIC ID
router.put('/:_id', updateProduct);
// //DELETE ROUTE TO DELETE EXISTING INVENTORY ITEM BY SPECIFIC ID
router.delete('/:_id', deleteProduct);


module.exports = router;