// Importar Router desde express
import { Router } from 'express';

// Crear una instancia de Router
const router = Router();

// Importar el controlador de estudiantes
import { listarEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante } from '../controllers/estudiante_controller.js';

// Importar middleware de autenticación
import verificarAutenticacion from '../middlewares/autenticacion.js';

// Importar el middleware de validación
import validarEstudiante from '../middlewares/validacionEstudiante.js';

// Rutas de estudiantes
router.get('/estudiantes', verificarAutenticacion, listarEstudiantes);
router.get('/estudiante/:id', verificarAutenticacion, obtenerEstudiantePorId);
router.post('/estudiante/crear', verificarAutenticacion, validarEstudiante, crearEstudiante);
router.put('/estudiante/actualizar/:id', verificarAutenticacion, validarEstudiante, actualizarEstudiante);
router.delete('/estudiante/eliminar/:id', verificarAutenticacion, eliminarEstudiante);

// Exportar las rutas
export default router;