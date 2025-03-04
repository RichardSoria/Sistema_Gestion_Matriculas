import { check, validationResult } from 'express-validator';

const validarEstudiante = [
    check('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 20 }).withMessage('El nombre no puede tener más de 20 caracteres')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),

    check('apellido')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ max: 20 }).withMessage('El apellido no puede tener más de 20 caracteres')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/).withMessage('El apellido solo puede contener letras y espacios'),

    check('cedula')
        .trim()
        .notEmpty().withMessage('La cédula es obligatoria')
        .isLength({ min: 10, max: 10 }).withMessage('La cédula debe contener exactamente 10 dígitos')
        .matches(/^\d{10}$/).withMessage('La cédula debe contener solo números'),

    check('fecha_nacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601().withMessage('La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)'),

    check('ciudad')
        .trim()
        .notEmpty().withMessage('La ciudad es obligatoria')
        .isLength({ max: 20 }).withMessage('La ciudad no puede tener más de 20 caracteres')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/).withMessage('La ciudad solo puede contener letras y espacios'),

    check('direccion')
        .trim()
        .notEmpty().withMessage('La dirección es obligatoria')
        .isLength({ max: 50 }).withMessage('La dirección no puede tener más de 50 caracteres'),

    check('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe contener exactamente 10 dígitos')
        .matches(/^\d{10}$/).withMessage('El teléfono debe contener solo números'),

    check('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El correo debe ser válido')
        .normalizeEmail(),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validarEstudiante;