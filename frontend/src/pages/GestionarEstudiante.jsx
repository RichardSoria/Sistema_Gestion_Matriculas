import React from 'react';
import { FormularioEstudiante } from '../components/Estudiante/FormularioEstudiante';
import TablaEstudiantes from '../components/Estudiante/TablaEstudiante';

const GestionarEstudiantes = () => {
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Estudiantes</h1>
                <hr className='my-4 border-gray-400 border-t-2' />
                <p>Este módulo permite la gestión de los estudiantes, incluyendo la creación, edición y eliminación.</p>
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className='w-full md:w-1/2'>
                    <FormularioEstudiante />
                </div>
                <div className='w-full md:w-1/2'>
                    <TablaEstudiantes />
                </div>
            </div>
        </>
    );
};

export default GestionarEstudiantes;
