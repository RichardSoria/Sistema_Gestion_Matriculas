import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routerUsuario from './routes/usuario_routes.js';
import routerMateria from './routes/materia_routes.js';
import routerEstudiante from './routes/estudiante_routes.js';
import routerMatricula from './routes/matricula_routes.js';

// Inicializaciones
const app = express();
dotenv.config();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(cors());

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', routerUsuario);
app.use('/api', routerMateria);
app.use('/api', routerEstudiante);
app.use('/api', routerMatricula);

// Manejo de rutas no encontradas
app.use((req, res) => res.status(404).send('Ruta no encontrada - 404'));

// Exportar la instancia de expresspor medio de app
export default app;