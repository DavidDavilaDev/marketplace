const Pedidos = require("../models/pedidos");
const fetch = require("node-fetch");

require('dotenv').config();

const CLIP_API_KEY = process.env.CLIP_API_KEY;

const agregarPedido = async (req, res) => {
    try {
        const nuevoPedido = new Pedidos({
            fecha_hora: new Date().toISOString(), 
            pedido: req.body.pedido,
            estatus_pedido: req.body.estatus_pedido,
            total_pedido: req.body.total_pedido,
            pago: req.body.pago,
            fg_usuario: req.body.fg_usuario 
        });

        const pedidoGuardado = await nuevoPedido.save();

        res.status(201).json(pedidoGuardado);
    } catch (error) {
        console.error('Error al agregar pedido:', error);
        res.status(500).json({ message: 'Error al agregar el pedido' });
    }
};

const EstadoPedido = async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const nuevoEstado = req.body.estatus_pedido;

        const pedidoActualizado = await Pedidos.findByIdAndUpdate(pedidoId, { estatus_pedido: nuevoEstado }, { new: true });

        if (!pedidoActualizado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.json(pedidoActualizado);
    } catch (error) {
        console.error('Error al actualizar estado de pedido:', error);
        res.status(500).json({ message: 'Error al actualizar estado de pedido' });
    }
};

const getPedidoUsuario = async (req, res) => {
    try {
        const pedidos = await Pedidos.find({ fg_usuario: req.params.id }).sort({ fecha_hora: -1 });
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener pedidos de usuario:', error);
        res.status(500).json({ message: 'Error al obtener pedidos de usuario' });
    }
};

const getPedidoallUsuario = async (req, res) => {
    try {
        const pedidos = await Pedidos.find().sort({ fecha_hora: -1 });
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener todos los pedidos:', error);
        res.status(500).json({ message: 'Error al obtener todos los pedidos' });
    }
};

const agregarPedidoTarjeta = async (req, res) => {
    try {
        // Realizar la solicitud a la API de Clip
        const clipResponse = await fetch('https://api-gw.payclip.com/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${CLIP_API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        // Verificar si la solicitud a la API de Clip fue exitosa
        if (!clipResponse.ok) {
            return res.status(400).json({ error: 'Error al procesar el pago con Clip' });
        }

        const data = await clipResponse.json();
        console.log('Respuesta de Clip:', data);

        // Enviar la respuesta obtenida de Clip como respuesta de la API
        res.status(200).json(data);
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ error: 'Hubo un error al procesar el pago' });
    }
};

const WebHook = async (req, res) => {
    try {
        const { merch_inv_id, status, item } = req.body;

        if (status === "PAID") {
            const [userId, pedido] = merch_inv_id.split('$').map(value => value.trim());
            const nuevoPedido = new Pedidos({
                fecha_hora: new Date().toISOString(),
                pedido: pedido,
                estatus_pedido: 'RECIBIDO',
                total_pedido: item.amount,
                pago: item.issuer,
                fg_usuario: userId 
            });

            const pedidoGuardado = await nuevoPedido.save();
            res.json(pedidoGuardado);
        } else if (status === "DECLINED") {
            res.status(500).json({ error: 'Pago declinado' });
        } else if (status === "CANCELLED") {
            res.status(500).json({ error: 'Pago cancelado' });
        } else {
            res.status(400).json({ error: 'Estado de pedido desconocido' });
        }
    } catch (error) {
        console.error('Error al procesar el webhook:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    agregarPedido,
    EstadoPedido,
    getPedidoUsuario,
    getPedidoallUsuario,
    agregarPedidoTarjeta,
    WebHook
};
