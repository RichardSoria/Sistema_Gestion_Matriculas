import { check, validationResult } from 'express-validator';

const validarLogin = [
    check('email')
        .trim()
        .custom((value) => {
            // Si es SuperAdmin, omitir validaciones
            if (value === process.env.SUPER_ADMIN_EMAIL) return true;
            // Aplicar validación solo para usuarios normales
            if (!value) throw new Error('El correo es obligatorio');
            if (!/\S+@\S+\.\S+/.test(value)) throw new Error('Debe ser un correo válido');
            return true;
        }),

    check('password')
        .trim()
        .custom((value, { req }) => {
            // Si es SuperAdmin, omitir validaciones
            if (req.body.email === process.env.SUPER_ADMIN_EMAIL) return true;
            // Aplicar validaciones solo para usuarios normales
            if (!value) throw new Error('La contraseña es obligatoria');
            if (value.length < 8) throw new Error('La contraseña debe tener al menos 8 caracteres');
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/.test(value)) {
                throw new Error('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial');
            }
            return true;
        }),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validarLogin;
