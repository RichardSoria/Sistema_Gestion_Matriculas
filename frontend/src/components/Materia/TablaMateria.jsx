import { useContext } from "react";
import { MdInfo } from "react-icons/md";
import Mensaje from "../Alertas/Mensaje";
import { useNavigate } from "react-router-dom";
import MateriaContext from "../../context/MateriaProvider";

const TablaMaterias = () => {
    const { materias, setMateriaSeleccionada } = useContext(MateriaContext);
    const navigate = useNavigate();

    return (
        <>
            {
                materias.length === 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-2xl border-2 border-white'>
                        <thead className='bg-custom-light-blue text-white '>
                            <tr className='text-center'>
                                <th className='p-3'>N°</th>
                                <th className='p-3'>Nombre</th>
                                <th className='p-3'>Código</th>
                                <th className='p-3'>Descripción</th>
                                <th className='p-3'>Créditos</th>
                                <th className='p-3'>Información</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                materias.map((materia, index) => (
                                    <tr className={`text-center border-t-2 border-b-2 font-bold hover:bg-blue-300 hover:text-blue-700 bg-zinc-200 text-gray-600 text-base                                        }`} key={materia._id}
                                        onClick={() => setMateriaSeleccionada(materia)}>
                                        <td className="p-2 border-2 border-white">{index + 1}</td>
                                        <td className="p-2 border-2 border-white">{materia.nombre}</td>
                                        <td className="p-2 border-2 border-white">{materia.codigo}</td>
                                        <td className="p-2 border-2 border-white">{materia.descripcion}</td>
                                        <td className="p-2 border-2 border-white">{materia.creditos}</td>
                                        <td className="border-2 border-white">
                                            <MdInfo className="h-7 w-7 text-custom-light-blue cursor-pointer inline-block hover:text-gray-600"
                                                onClick={() => navigate(`/dashboard/visualizar/materia/${materia._id}`)} />
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

export default TablaMaterias;
