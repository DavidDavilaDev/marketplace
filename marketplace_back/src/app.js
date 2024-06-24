//Configuracion de express para inicializar el servidor
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//uso de las rutas creadas con express router
const app = express();
//Midelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

app.get("/", (req, res) => {
  res.send("Todavia Funciona :)");
});

app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);

//el "/api/..." es para saber como esta formada la URL

module.exports = app;