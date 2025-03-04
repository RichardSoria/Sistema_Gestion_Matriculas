// Importar Router desde express
import { Router } from 'express';

// Crear una instancia de Router
const router = Router();

// Importar el controlador de usuario
import { login } from '../controllers/usuario_controller.js';
// Importar el middleware de validación
import validarLogin from '../middlewares/validacionUsuario.js';

// Definir la ruta para iniciar sesión
router.post('/login', validarLogin, login);

// Exportar el router
export default router;