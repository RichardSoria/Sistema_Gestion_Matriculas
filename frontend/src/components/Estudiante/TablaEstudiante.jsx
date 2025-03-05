import { useContext } from "react";
import { MdInfo } from "react-icons/md";

import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/EstudianteProvider";

const TablaEstudiantes = () => {
    const { estudiantes, setEstudianteSeleccionado } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            {
                estudiantes.length === 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-2xl border-2 border-white'>
                        <thead className='bg-custom-light-blue text-white '>
                            <tr className='text-center'>
                                <th className='p-3'>N°</th>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Apellido</th>
                                <th className='p-3'>Email</th>
                                <th className='p-3'>Cédula</th>
                                <th className='p-3'>Teléfono</th>
                                <th className='p-3'>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                estudiantes.map((estudiante, index) => (
                                    <tr className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 bg-zinc-200 text-gray-600 text-base                                        }`} key={estudiante._id}
                                        onClick={() => setEstudianteSeleccionado(estudiante)}>
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{estudiante.nombre}</td>
                                        <td className="p-2 border-2 border-white">{estudiante.apellido}</td>
                                        <td className="p-2 border-2 border-white">{estudiante.email}</td>
                                        <td className="p-2 border-2 border-white">{estudiante.cedula}</td>
                                        <td className="p-2 border-2 border-white">{estudiante.telefono}</td>
                                        <td className="border-2 border-white">
                                            <MdInfo className="h-7 w-7 text-custom-light-blue cursor-pointer inline-block hover:text-gray-600"
                                                onClick={() => navigate(`/dashboard/visualizar/estudiante/${estudiante._id}`)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>
    );
}

export default TablaEstudiantes;
