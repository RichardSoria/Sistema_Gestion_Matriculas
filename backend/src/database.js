// Importar mongoose
import mongoose from 'mongoose';


// Permitir que solo los campos definidios en el esquema sean guardados en la base de datos
mongoose.set('strict', true);

// Conectar a la base de datos
const connection = async () => {
    try {

        // Establecer la conexión con la base de datos
        const { connection } = await mongoose.connect(process.env.MONGO_URI);

        // Presentar la conexión en la consola
        console.log(`La base de datos está conectada en: ${connection.host} - ${connection.port}`)

    } catch (error) {

        // Presentar el error en la consola
        console.log(`Error: ${error.message}`)

    }
}


// Exportar la conexión
export default connection;