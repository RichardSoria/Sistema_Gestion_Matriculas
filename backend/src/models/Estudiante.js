// Importar el Schema y el modelo de mongoose
import { Schema, model } from 'mongoose';

const estudianteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxlength: [20, 'El nombre no puede tener más de 20 caracteres'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxlength: [20, 'El apellido no puede tener más de 20 caracteres'],
        trim: true
    },
    cedula: {
        type: String,
        required: [true, 'La cédula es obligatoria'],
        minlength: [10, 'La cédula debe tener 10 caracteres'],
        maxlength: [10, 'La cédula no puede tener más de 10 caracteres'],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'La cédula debe contener exactamente 10 dígitos']
    },
    fecha_nacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
        maxlength: [20, 'La ciudad no puede tener más de 20 caracteres'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        maxlength: [50, 'La dirección no puede tener más de 50 caracteres'],
        trim: true
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        maxlength: [10, 'El teléfono no puede tener más de 10 caracteres'],
        trim: true,
        match: [/^\d{10}$/, 'El teléfono debe tener exactamente 10 dígitos']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'El correo debe ser válido.']
    }
},
    { versionKey: false }
);

// Modificar la salida JSON para mostrar fecha en formato YYYY-MM-DD
estudianteSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.fecha_nacimiento = ret.fecha_nacimiento.toISOString().split('T')[0]; // Extraer solo la fecha
        return ret;
    }
});

// Crear el modelo de estudiante
export default model('Estudiante', estudianteSchema);
