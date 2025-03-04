import app from './server.js';
import connetion from './database.js';

// Conectar a la base de datos
connetion();

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
}); 