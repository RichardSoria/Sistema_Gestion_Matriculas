// Importar Router desde express
import { Router } from 'express';

// Crear una instancia de Router
const router = Router();

// Importar el controlador de usuario
import { login, perfil } from '../controllers/usuario_controller.js';

// Importar el middleware de validación
import validarLogin from '../middlewares/validacionUsuario.js';

// Importar middleware de autenticación
import verificarAutenticacion from '../middlewares/autenticacion.js';

// Definir la ruta para iniciar sesión
router.post('/login', validarLogin, login);
router.get('/perfil', verificarAutenticacion, perfil);

// Exportar el router
export default router;