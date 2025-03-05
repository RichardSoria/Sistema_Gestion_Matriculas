import { useContext } from "react";
import { MdInfo } from "react-icons/md";
import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import MatriculaContext from "../../context/MatriculaProvider";

const TablaMatriculas = () => {
    const { matriculas, setMatriculaSeleccionada } = useContext(MatriculaContext);
    const navigate = useNavigate();

    return (
        <>
            {
                matriculas.length === 0
                    ? <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-2xl border-2 border-white'>
                        <thead className='bg-custom-light-blue text-white'>
                            <tr className='text-center'>
                                <th className='p-3'>N°</th>
                                <th className='p-3'>Código</th>
                                <th className='p-3'>Descripción</th>
                                <th className='p-3'>Estudiante</th>
                                <th className='p-3'>Materia</th>
                                <th className='p-3'>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                matriculas.map((matricula, index) => (
                                    <tr key={matricula._id} 
                                        className="text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 bg-zinc-200 text-gray-600 text-base"
                                        onClick={() => setMatriculaSeleccionada(matricula)}
                                    >
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{matricula.codigo}</td>
                                        <td className="p-2 border-2 border-white">{matricula.descripcion}</td>
                                        <td className="p-2 border-2 border-white">{matricula.estudiante.nombre} {matricula.estudiante.apellido}</td>
                                        <td className="p-2 border-2 border-white">{matricula.materia.nombre}</td>
                                        <td className="border-2 border-white">
                                            <MdInfo 
                                                className="h-7 w-7 text-custom-light-blue cursor-pointer inline-block hover:text-gray-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/dashboard/visualizar/matricula/${matricula._id}`);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>
    );
};

export default TablaMatriculas;
