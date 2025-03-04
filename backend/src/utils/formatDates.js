export const formatDates = function (schema) {
    schema.set('toJSON', {
        transform: (doc, ret) => {
            // Lista de campos de fecha a formatear
            ['fecha_nacimiento', 'createdAt', 'updatedAt'].forEach(field => {
                if (ret[field]) {
                    ret[field] = ret[field].toISOString().split('T')[0]; // Convertir a YYYY-MM-DD
                }
            });
            return ret;
        }
    });
};
