const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
    nombre_producto:{
        type:String
    },
    precio_producto:{
        type:String
    },
    resena_producto:{
        type:String
    },
    tiempo_espera:{
        type:String
    },
    tipo_producto:{
        type:String
    },
    ruta_foto:{
        type:String
    }
})

module.exports = mongoose.model("productos", productosSchema);