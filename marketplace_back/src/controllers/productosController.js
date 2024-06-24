const Productos = require("../models/productos");
const multer = require("multer");
const path = require("path");

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../img')); // Ruta donde se guardarán los archivos en el backend
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage }).single('foto_producto'); 

const agregarProducto = async (req, res) => {
    try {
        // Subir el archivo con Multer
        upload(req, res, async (err) => {
            if (err) {
                console.error('Error al subir archivo:', err);
                return res.status(500).json({ message: 'Error al subir archivo' });
            }

            // Crear un nuevo producto con los datos recibidos
            const nuevoProducto = new Productos({
                nombre_producto: req.body.nombre_producto,
                precio_producto: req.body.precio_producto,
                resena_producto: req.body.resena_producto,
                tiempo_espera: req.body.tiempo_espera,
                tipo_producto: req.body.tipo_producto,
                ruta_foto: req.file.path 
            });

            // Guardar el producto en la base de datos
            const productoGuardado = await nuevoProducto.save();

            res.status(201).json(productoGuardado);
        });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
};

const getProductos = async (req, res) => {
    try {
        const productos = await Productos.find();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

module.exports = {
    agregarProducto,
    getProductos,
    upload
};
