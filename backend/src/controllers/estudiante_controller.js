import Estudiante from '../models/Estudiante.js';
import mongoose from 'mongoose';
import Matricula from '../models/Matricula.js';

// Método para obtener todos los estudiantes
const listarEstudiantes = async (req, res) => {
    try {
        // Obtener todos los estudiantes
        const estudiantes = await Estudiante.find();

        // Responder con los estudiantes
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
    }
};

// Método para obtener un estudiante por ID
const obtenerEstudiantePorId = async (req, res) => {
    const { id } = req.params;

    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de estudiante no válido' });
        }

        // Buscar estudiante por ID
        const estudiante = await Estudiante.findById(id);

        // Validar estudiante
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Responder con el estudiante
        res.status(200).json(estudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el estudiante' });
    }
};

// Método para crear un estudiante
const crearEstudiante = async (req, res) => {
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    // Validar campos
    if (!nombre || !apellido || !cedula || !fecha_nacimiento || !ciudad || !direccion || !telefono || !email) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el estudiante ya existe
        const estudianteExiste = await Estudiante.findOne({ cedula });

        if (estudianteExiste) {
            return res.status(400).json({ message: 'El estudiante ya existe' });
        }

        // Verificar si el correo ya está en uso
        const emailExistente = await Estudiante.findOne({ email });

        if (emailExistente) {
            return res.status(400).json({ message: 'El correo ya está en uso por otro estudiante' });
        }

        // Crear el estudiante
        const nuevoEstudiante = new Estudiante({ nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email });
        await nuevoEstudiante.save();

        res.status(201).json({ message: 'Estudiante creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el estudiante' });
    }
};

// Método para actualizar un estudiante
const actualizarEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    // Validar campos
    if (!nombre || !apellido || !cedula || !fecha_nacimiento || !ciudad || !direccion || !telefono || !email) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de estudiante no válido' });
        }

        // Buscar estudiante por ID
        const estudiante = await Estudiante.findById(id);

        // Validar estudiante
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Verificar si la nueva cédula ya existe en otro estudiante
        const cedulaExistente = await Estudiante.findOne({ cedula });
        if (cedulaExistente && cedulaExistente.id !== id) {
            return res.status(400).json({ message: 'La cédula ya está en uso por otro estudiante' });
        }

        // Verificar si el nuevo correo ya está en uso por otro estudiante
        const emailExistente = await Estudiante.findOne({ email });
        if (emailExistente && emailExistente.id !== id) {
            return res.status(400).json({ message: 'El correo ya está en uso por otro estudiante' });
        }
        
        // Actualizar estudiante
        await Estudiante.findByIdAndUpdate(id, { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email });

        res.status(200).json({ message: 'Estudiante actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estudiante' });
    }
};

// Método para eliminar un estudiante
const eliminarEstudiante = async (req, res) => {
    const { id } = req.params;

    try {
        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Verificar si el estudiante tiene matrículas
        const matricula = await Matricula.findOne({ estudiante: id });

        if (matricula) {
            return res.status(400).json({ message: 'El estudiante tiene matrículas asociadas' });
        }

        // Eliminar estudiante
        await Estudiante.findByIdAndDelete(id);

        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el estudiante' });
    }
};


// Exportar métodos
export { listarEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante };