import React from 'react';
import { FormularioMatricula } from '../components/Matricula/FormularioMatricula';
import TablaMatriculas from '../components/Matricula/TablaMatricula';

const GestionarMateria = () => {
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Matriculas</h1>
                <hr className='my-4 border-gray-400 border-t-2' />
                <p>Este módulo permite la gestión de las matriculas, incluyendo la creación, edición y eliminación.</p>
            </div>
            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className='w-full md:w-1/2'>
                    <FormularioMatricula />
                </div>
                <div className='w-full md:w-1/2'>
                    <TablaMatriculas />
                </div>
            </div>
        </>
    );
};

export default GestionarMateria;
