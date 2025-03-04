// Importar Router desde express
import { Router } from 'express';

// Crear una instancia de Router
const router = Router();

// Importar el controlador de materia
import { listarMaterias, obtenerMateriaPorId, crearMateria, actualizarMateria, eliminarMateria } from '../controllers/materia_controller.js';

// Importar middleware de autenticación
import verificarAutenticacion from '../middlewares/autenticacion.js';

// Importar el middleware de validación
import validarMateria from '../middlewares/validacionMateria.js';

// Rutas de materias
router.get('/materias', verificarAutenticacion, listarMaterias);
router.get('/materia/:id', verificarAutenticacion, obtenerMateriaPorId);
router.post('/materia/crear', verificarAutenticacion, validarMateria, crearMateria);
router.put('/materia/actualizar/:id', verificarAutenticacion, validarMateria, actualizarMateria);
router.delete('/materia/eliminar/:id', verificarAutenticacion, eliminarMateria);

// Exportar las rutas
export default router;