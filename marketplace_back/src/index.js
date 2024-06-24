const app = require("./app");
const port = 4000;
const mongoose = require("mongoose");
require('dotenv').config()
//asignacion del puerto y requerir el archivo app para iniciar el servidor

//conexion a mongodb atlas
const URI = process.env.URI_MONGO;

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(console.log("Conectado a mongo Atlas"))
  .catch((error) => console.log(error));

//arranque de la api
app.listen(port, () => {
  console.log("Server on port", port);
});