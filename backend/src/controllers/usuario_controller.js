import generarJWT from '../helpers/crearJWT.js';
import Usuario from '../models/Usuario.js';
import jwt, { decode } from 'jsonwebtoken';

// Método para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
    }


    // Caso 1: Super Administrador (omite validaciones y autentica directo)
    if (email === process.env.SUPER_ADMIN_EMAIL && password === process.env.SUPER_ADMIN_PASSWORD) {
        const token = generarJWT('000', 'super_admin');

        return res.status(200).json({
            token,
            nombre: 'Super',
            apellido: 'Admin'
        });
    }

    // Caso 2: Buscar usuario en la base de datos
    const usuarioBDD = await Usuario.findOne({ email });

    // Validar usuario
    if (!usuarioBDD) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Validar contraseña
    const passwordUsuario = usuarioBDD.password;

    if (password !== passwordUsuario) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Extraer datos del usuario
    const { nombre, apellido } = usuarioBDD;

    // Generar token con rol
    const token = generarJWT(usuarioBDD._id, 'usuario');

    // Responder con datos del usuario
    res.status(200).json({
        token,
        nombre,
        apellido
    });
};

// Método para ver perfil
const perfil = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (decoded.rol === 'super_admin') {
        return res.status(200).json({
            nombre: 'Super',
            apellido: 'Admin'
        });
    } else {
        const usuario = await Usuario.findById(decoded.id);
        const { nombre, apellido } = usuario;

        res.status(200).json({
            nombre,
            apellido
        });
    }
};

export { login, perfil };
