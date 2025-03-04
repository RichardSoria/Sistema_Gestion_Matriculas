import { check, validationResult } from 'express-validator';

const validarMateria = [
    check('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 50 }).withMessage('El nombre no puede tener más de 50 caracteres')
        .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/).withMessage('El nombre solo puede contener letras, espacios y caracteres acentuados'),

    check('codigo')
        .trim()
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 10 }).withMessage('El código no puede tener más de 10 caracteres')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('El código solo puede contener letras y números'),

    check('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ max: 100 }).withMessage('La descripción no puede tener más de 100 caracteres'),

    check('creditos')
        .notEmpty().withMessage('Los créditos son obligatorios')
        .isInt({ min: 1 }).withMessage('Los créditos deben ser un número entero positivo'),

    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validarMateria;
