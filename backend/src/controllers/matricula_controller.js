// Importar el modelo de la base de datos
import Matricula from '../models/Matricula.js';
import Estudiante from '../models/Estudiante.js';
import Materia from '../models/Materia.js';
import mongoose from 'mongoose';

// Método para obtener todas las matrículas con información de estudiante y materia
const listarMatriculas = async (req, res) => {
    try {
        // Obtener todas las matrículas y popular datos de estudiante y materia
        const matriculas = await Matricula.find()
            .populate('estudiante', 'nombre apellido cedula')
            .populate('materia', 'nombre codigo');

        res.status(200).json(matriculas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las matrículas' });
    }
};

// Método para obtener una matrícula por ID
const obtenerMatriculaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de matrícula no válido' });
        }

        // Buscar matrícula con información de estudiante y materia
        const matricula = await Matricula.findById(id)
            .populate('estudiante', 'nombre apellido cedula')
            .populate('materia', 'nombre codigo');

        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        res.status(200).json(matricula);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la matrícula' });
    }
};

// Método para crear una matrícula
const crearMatricula = async (req, res) => {
    const { codigo, descripcion, estudiante, materia } = req.body;

    if (!codigo || !descripcion || !estudiante || !materia) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Validar si el código ya existe
        const codigoExistente = await Matricula.findOne({ codigo });
        if (codigoExistente) {
            return res.status(400).json({ message: `La mátricula ${codigo} ya existe` });
        }

        // Validar si el estudiante es válido
        if (!mongoose.Types.ObjectId.isValid(estudiante)) {
            return res.status(400).json({ message: 'ID de estudiante no válido' });
        }

        // Validar si existe el estudiante
        const estudianteExistente = await Estudiante.findById(estudiante);
        if (!estudianteExistente) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Validar si la materia es válida
        if (!mongoose.Types.ObjectId.isValid(materia)) {
            return res.status(400).json({ message: 'ID de materia no válido' });
        }

        // Validar si existe la materia
        const materiaExistente = await Materia.findById(materia);
        if (!materiaExistente) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Validar si el estudiante ya está matriculado en la materia
        const matriculaExistente = await Matricula.findOne({ estudiante, materia });
        if (matriculaExistente) {
            return res.status(400).json({ message: 'El estudiante ya está matriculado en esta materia' });
        }

        // Crear matrícula
        const matricula = new Matricula({ codigo, descripcion, estudiante, materia });
        await matricula.save();

        res.status(201).json({ message: 'Matrícula creada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la matrícula' });
    }
};

// Método para actualizar una matrícula
const actualizarMatricula = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, estudiante, materia } = req.body;

    if (!codigo || !descripcion || !estudiante || !materia) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de matrícula no válido' });
        }

        // Buscar matrícula actual
        const matricula = await Matricula.findById(id);
        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        // Verificar si otro registro tiene el mismo código
        const codigoExistente = await Matricula.findOne({ codigo });
        if (codigoExistente && codigoExistente.id !== id) {
            return res.status(400).json({ message: 'El código de la matrícula ya está en uso' });
        }

        // Validar si el estudiante es válido
        if (!mongoose.Types.ObjectId.isValid(estudiante)) {
            return res.status(400).json({ message: 'ID de estudiante no válido' });
        }

        // Validar si el estudiante existe
        const estudianteExistente = await Estudiante.findById(estudiante);
        if (!estudianteExistente) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Validar si la materia es válida
        if (!mongoose.Types.ObjectId.isValid(materia)) {
            return res.status(400).json({ message: 'ID de materia no válido' });
        }

        // Validar si la materia existe
        const materiaExistente = await Materia.findById(materia);
        if (!materiaExistente) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Validar si el estudiante ya está matriculado en la materia en otro registro
        const matriculaExistente = await Matricula.findOne({ estudiante, materia });
        if (matriculaExistente && matriculaExistente.id !== id) {
            return res.status(400).json({ message: 'El estudiante ya está matriculado en esta materia' });
        }

        // Actualizar matrícula y devolver la versión actualizada
        await Matricula.findByIdAndUpdate(id, { codigo, descripcion, estudiante, materia });

        res.status(200).json({ message: 'Matrícula actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la matrícula' });
    }
};

// Método para eliminar una matrícula
const eliminarMatricula = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de matrícula no válido' });
        }

        const matricula = await Matricula.findById(id);
        if (!matricula) {
            return res.status(404).json({ message: 'Matrícula no encontrada' });
        }

        await Matricula.findByIdAndDelete(id);
        res.status(200).json({ message: 'Matrícula eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la matrícula' });
    }
};

// Exportar métodos
export { listarMatriculas, obtenerMatriculaPorId, crearMatricula, actualizarMatricula, eliminarMatricula };
