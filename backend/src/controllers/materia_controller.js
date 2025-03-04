// Importar el modelo de la base de datos
import Materia from '../models/Materia.js';
import mongoose from 'mongoose';
import Matricula from '../models/Matricula.js';

// Método para obtener todas las materias
const listarMaterias = async (req, res) => {
    try {
        // Obtener todas las materias
        const materias = await Materia.find();

        // Responder con las materias
        res.status(200).json(materias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las materias' });
    }
};

// Método para obtener una materia por ID
const obtenerMateriaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de materia no válido' });
        }

        // Buscar materia por ID
        const materia = await Materia.findById(id);

        // Validar materia
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Responder con la materia
        res.status(200).json(materia);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener la materia' });
    }
};

// Método para crear una materia
const crearMateria = async (req, res) => {
    const { nombre, codigo, descripcion, creditos } = req.body;

    // Validar campos
    if (!nombre || !codigo || !descripcion || !creditos) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar créditos
    if (isNaN(creditos)) {
        return res.status(400).json({ message: 'Los créditos deben ser un número' });
    }

    try {
        // Verificar si la materia ya existe
        const materiaExiste = await Materia.findOne({ codigo });

        if (materiaExiste) {
            return res.status(400).json({ message: `La materia con el código ${codigo} ya existe` });
        }

        // Crear materia
        const nuevaMateria = new Materia({ nombre, codigo, descripcion, creditos });
        await nuevaMateria.save();

        res.status(201).json({ message: `La materia ${nombre} ha sido creada correctamente` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la materia' });
    }
}

// Método para actualizar una materia
const actualizarMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, descripcion, creditos } = req.body;

    // Validar campos obligatorios
    if (!nombre || !codigo || !descripcion || !creditos) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar que créditos sea un número
    if (isNaN(creditos)) {
        return res.status(400).json({ message: 'Los créditos deben ser un número' });
    }

    try {
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de materia no válido' });
        }

        // Buscar la materia por ID
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Verificar si el código ya existe en otra materia
        const codigoExistente = await Materia.findOne({ codigo });

        if (codigoExistente && codigoExistente.id !== id) {
            return res.status(400).json({ message: `El código ${codigo} ya está en uso por otra materia` });
        }

        // Actualizar materia
        await Materia.findByIdAndUpdate(id, { nombre, codigo, descripcion, creditos });

        res.status(200).json({ message: `La materia ${nombre} ha sido actualizada correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la materia' });
    }
};

// Método para eliminar una materia
const eliminarMateria = async (req, res) => {
    const { id } = req.params;

    try {
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        // Verificar si la materia está siendo utilizada en matrículas
        const matricula = await Matricula.findOne({ materia: id });

        if (matricula) {
            return res.status(400).json({ message: 'No se puede eliminar la materia porque tiene estudiantes matriculados' });
        }

        // Eliminar materia
        await Materia.findByIdAndDelete(id);

        res.status(200).json({ message: `Materia ${materia.nombre} eliminada correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la materia' });
    }
};

// Exportar
export { listarMaterias, obtenerMateriaPorId, crearMateria, actualizarMateria, eliminarMateria };