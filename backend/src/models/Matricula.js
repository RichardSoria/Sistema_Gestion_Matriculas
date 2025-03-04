import { Schema, model } from 'mongoose';
import { formatDates } from '../utils/formatDates.js';

const matriculaSchema = new Schema({
    codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'El código solo puede contener letras y números']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        maxlength: [50, 'La descripción no puede tener más de 50 caracteres'],
        trim: true
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: [true, 'El estudiante es obligatorio']
    },
    materia: {
        type: Schema.Types.ObjectId,
        ref: 'Materia',
        required: [true, 'La materia es obligatoria']
    }
}, { timestamps: true, versionKey: false });

// Evitar matrículas duplicadas (un estudiante no puede matricularse en la misma materia más de una vez)
matriculaSchema.index({ estudiante: 1, materia: 1 }, { unique: true });

// Formatear fechas
matriculaSchema.plugin(formatDates);

// Exportar el modelo
export default model('Matricula', matriculaSchema);
