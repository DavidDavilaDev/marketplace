const User = require("../models/usuarios");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET; // Debe estar en una variable de entorno

// Obtener todos los usuarios
const findAllUsuarios = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener un usuario por ID
const findUsuarioById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error('Usuario no encontrado');
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const { nombre, apellidos, correo, contrasena, rol, telefono, pais, estado, municipio, colonia, calle, numeroExterior, numeroInterior, cp, infoDomicilio } = req.body;
        
        // Verificar si ya existe un usuario con el mismo correo
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'Ya existe un usuario registrado con este correo' });
        }

        // Si no existe, proceder a crear el nuevo usuario
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const newUser = new User({ nombre, apellidos, correo, contrasena: hashedPassword, rol, telefono, pais, estado, municipio, colonia, calle, numeroExterior, numeroInterior, cp, infoDomicilio });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Actualizar un usuario
const updateUsuario = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.contrasena) {
            updates.contrasena = await bcrypt.hash(updates.contrasena, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) throw new Error('Usuario no encontrado');
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) throw new Error('Usuario no encontrado');
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Iniciar sesión y generar token
const loginUsuario = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const user = await User.findOne({ correo });
        if (!user) throw new Error('Usuario no encontrado');

        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
        if (!isPasswordValid) throw new Error('Contraseña incorrecta');

        // Crear token JWT con datos del usuario
        const token = jwt.sign({
            id: user._id,
            correo: user.correo,
            rol: user.rol
        }, JWT_SECRET, { expiresIn: '1 year' });

        // Enviar respuesta con token y datos del usuario
        res.status(200).json({
            token,
            _id: user._id,
            nombre: user.nombre,
            apellidos: user.apellidos,
            correo: user.correo,
            rol: user.rol
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

module.exports = {
    findAllUsuarios,
    findUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};
