const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
    nombre_producto: {
        type: String,
        required: true
    },
    precio_producto: {
        type: String,
        required: true
    },
    resena_producto: {
        type: String,
        required: true
    },
    tiempo_espera: {
        type: String,
        required: true
    },
    tipo_producto: {
        type: String,
        required: true
    },
    ruta_foto: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("productos", productosSchema);
