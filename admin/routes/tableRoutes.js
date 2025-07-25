const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const upload = require('../../utils/multer');

router.post('/create', upload.array('images'), tableController.createTable);

router.get('/list', tableController.getAllTables);

router.get('/details/:id', tableController.getTableById);

router.put('/update/:id', upload.array('images'), tableController.updateTable);

router.delete('/delete/:id', tableController.deleteTable);

module.exports = router;
