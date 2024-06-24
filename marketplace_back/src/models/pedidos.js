const mongoose = require("mongoose");

const pedidosSchema = new mongoose.Schema({
    fecha_hora: {
        type: String,
        required: true
    },
    pedido: {
        type: String,
        required: true
    },
    estatus_pedido: {
        type: String,
        required: true
    },
    total_pedido: {
        type: String,
        required: true
    },
    pago: {
        type: String,
        required: true
    },
    fg_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios', // Referencia al modelo de usuarios (debes ajustarlo si el nombre es diferente)
        required: true
    }
});

module.exports = mongoose.model("pedidos", pedidosSchema);
