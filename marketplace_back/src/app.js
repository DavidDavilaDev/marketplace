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

app.get("/", (req, res) => {
  res.send("Si");
});

//el "/api/..." es para saber como esta formada la URL

module.exports = app;