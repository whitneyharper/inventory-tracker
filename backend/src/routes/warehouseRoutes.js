const express = require('express');
const router = express.Router();
const { createWarehouse, viewWarehouse, updateWarehouse, deleteWarehouse } = require('../controllers/warehouseControllers');
const { requireAuth } = require('../middleware/requireAuth');

router.use(requireAuth);

//POST ROUTE TO CREATE NEW WAREHOUSE
router.post('/', createWarehouse);
// //GET ROUTE TO VIEW ALL WAREHOUSES
router.get('/', viewWarehouse);
// //PUT ROUTE TO UPDATE EXISTING WAREHOUSE DATA BY SPECIFIC ID
router.put('/:_id', updateWarehouse);
// //DELETE ROUTE TO DELETE EXISTING INVENTORY ITEM BY SPECIFIC ID
router.delete('/:_id', deleteWarehouse);

module.exports = router;