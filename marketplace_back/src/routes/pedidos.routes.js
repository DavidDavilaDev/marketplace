const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const verifyToken = require('../middlewares/verifyToken');

router.post("/pedidos/agregarPedido", verifyToken,pedidosController.agregarPedido);
router.get("/pedidos/:id", verifyToken, pedidosController.getPedidoUsuario)
router.get("/pedidos", verifyToken, pedidosController.getPedidoallUsuario)
router.post("/pedidos/agregarPedidoTarjeta", verifyToken, pedidosController.agregarPedidoTarjeta)
router.post("/pedidos/WebHook", pedidosController.WebHook)
router.put("/pedidos/EstadoPedido", verifyToken,pedidosController.EstadoPedido)

module.exports = router;