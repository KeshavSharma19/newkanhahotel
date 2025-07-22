const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/create', tableController.createTable);

router.get('/list', tableController.getAllTables);

router.get('/details/:id', tableController.getTableById);

router.put('/update/:id', tableController.updateTable);

router.delete('/delete/:id', tableController.deleteTable);

module.exports = router;
