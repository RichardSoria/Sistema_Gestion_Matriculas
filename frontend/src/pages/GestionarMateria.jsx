import React from 'react';
import { FormularioMateria } from '../components/Materia/FormularioMateria';
import TablaMaterias from '../components/Materia/TablaMateria';

const GestionarMateria = () => {
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-custom-light-blue'>Gestionar Materias</h1>
                <hr className='my-4 border-gray-400 border-t-2' />
                <p>Este módulo permite la gestión de las materias, incluyendo la creación, edición y eliminación.</p>
            </div>
            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className='w-full md:w-1/2'>
                    <FormularioMateria />
                </div>
                <div className='w-full md:w-1/2'>
                    <TablaMaterias />
                </div>
            </div>
        </>
    );
};

export default GestionarMateria;
