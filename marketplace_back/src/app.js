//Configuracion de express para inicializar el servidor
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path")


const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');
const pedidosRoutes = require('./routes/pedidos.routes')

app.get("/", (req, res) => {
  res.send("Todavia Funciona :)");
});

app.use('/img', express.static(path.join(__dirname, './img')))
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', pedidosRoutes);


module.exports = app;