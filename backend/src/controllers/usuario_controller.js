import generarJWT from '../helpers/crearJWT.js';
import Usuario from '../models/Usuario.js';

// Método para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
    }


    // Caso 1: Super Administrador (omite validaciones y autentica directo)
    if (email === process.env.SUPER_ADMIN_EMAIL && password === process.env.SUPER_ADMIN_PASSWORD) {
        const token = generarJWT('super_admin');

        return res.status(200).json({
            token,
            nombre: 'Super',
            apellido: 'Admin',
            rol: 'super_admin'
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
    const token = generarJWT('usuario');

    // Responder con datos del usuario
    res.status(200).json({
        token,
        nombre,
        apellido,
        rol: 'usuario'
    });
};

export { login };
