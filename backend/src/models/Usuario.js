// Importar el Schema y el modelo de mongoose
import { Schema, model, version } from 'mongoose';

const usuarioSchema = new Schema({
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
        required: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'El correo debe ser válido.']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    }
},
    { version: false }
);


// Crear el modelo de usuario
export default model('Usuario', usuarioSchema);