const mongoose = require("mongoose");

const pedidosSchema=new mongoose.Schema({
    fecha_hora:{
        type:String
    },
    pedido:{
        type:String
    },
    estatus_pedido:{
        type:String
    },
    total_pedido:{
        type:String
    },
    pago:{
        type:String
    },
    fg:{
        type:String
    }
})

module.exports = mongoose.model("pedidos", pedidosSchema);