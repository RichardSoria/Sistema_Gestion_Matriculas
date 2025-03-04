import jwt from 'jsonwebtoken';

// Middleware para verificar autenticación
const verificarAutenticacion = async (req, res, next) => {

    // Verificar si hay un token en los headers
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Se debe proporcionar un token' });
    }

    // Extraer y limpiar el token (eliminar 'Bearer ')
    const token = req.headers.authorization.split(' ')[1];

    try {
        // Verificar el token usando la misma clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar datos del usuario a `req` para usarlos en rutas protegidas
        req.usuario = decoded;

        // Permitir el acceso si el rol es válido
        if (decoded.rol === 'super_admin' || decoded.rol === 'usuario') {
            next();
        } else {
            return res.status(403).json({ message: 'No tiene permisos para acceder a esta ruta' });
        }

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export default verificarAutenticacion;
