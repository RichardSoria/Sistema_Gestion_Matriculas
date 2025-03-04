import { check, validationResult } from 'express-validator';

const validarMatricula = [
    check('codigo')
        .trim()
        .notEmpty().withMessage('El código es obligatorio')
        .isLength({ max: 10 }).withMessage('El código no puede tener más de 10 caracteres')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('El código solo puede contener letras y números'),
    check('descripcion')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ max: 50 }).withMessage('La descripción no puede tener más de 50 caracteres'),
    check('estudiante')
        .notEmpty().withMessage('El estudiante es obligatorio')
        .isMongoId().withMessage('El estudiante no es válido'),
    check('materia')
        .notEmpty().withMessage('La materia es obligatoria')
        .isMongoId().withMessage('La materia no es válida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validarMatricula;