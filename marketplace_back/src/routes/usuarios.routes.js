const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/usuarios', verifyToken, usuariosController.findAllUsuarios);
router.get('/usuarios/:id', verifyToken, usuariosController.findUsuarioById);
router.post('/usuarios', usuariosController.createUsuario);
router.put('/usuarios/:id', verifyToken, usuariosController.updateUsuario);
router.delete('/usuarios/:id', verifyToken, usuariosController.deleteUsuario);
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
