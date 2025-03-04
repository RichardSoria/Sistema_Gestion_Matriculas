// Importar el Schema y el modelo de mongoose
import { Schema, model } from 'mongoose';
import { formatDates } from '../utils/formatDates.js';

const materiaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
        trim: true
    },
    codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9]+$/, 'El código solo puede contener letras y números']
    }
    ,
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        maxlength: [100, 'La descripción no puede tener más de 100 caracteres'],
        trim: true
    },
    creditos: {
        type: Number,
        required: [true, 'Los créditos son obligatorios'],
        min: [1, 'Los créditos deben ser al menos 1']
    }
},
    { timestamps: true, versionKey: false }
);

// Formatear fechas
materiaSchema.plugin(formatDates);

// Crear el modelo de materia
export default model('Materia', materiaSchema);