const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/productos', productosController.getProductos);
router.post('/productos', verifyToken, productosController.agregarProducto);

module.exports = router;