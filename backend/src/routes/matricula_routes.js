// Importar Router desde express
import { Router } from 'express';

// Crear una instancia de Router
const router = Router();

// Importar el controlador de matrícula
import { listarMatriculas, obtenerMatriculaPorId, crearMatricula, actualizarMatricula, eliminarMatricula } from '../controllers/matricula_controller.js';

// Importar middleware de autenticación
import verificarAutenticacion from '../middlewares/autenticacion.js';

// Importar el middleware de validación
import validarMatricula from '../middlewares/validacionMatricula.js';

// Rutas de matrículas
router.get('/matriculas', verificarAutenticacion, listarMatriculas);
router.get('/matricula/:id', verificarAutenticacion, obtenerMatriculaPorId);
router.post('/matricula/crear', verificarAutenticacion, validarMatricula, crearMatricula);
router.put('/matricula/actualizar/:id', verificarAutenticacion, validarMatricula, actualizarMatricula);
router.delete('/matricula/eliminar/:id', verificarAutenticacion, eliminarMatricula);

// Exportar las rutas
export default router;