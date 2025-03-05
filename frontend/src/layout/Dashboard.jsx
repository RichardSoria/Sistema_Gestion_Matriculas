import { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import AuthContext from '../context/EstudianteProvider';
import ImagenLogo from '../../public/images/logo_quito_transporte.png';
import ImagenFondo from '../../public/images/portada_background_metro.png';

const Dashboard = () => {
    const location = useLocation();
    const { auth } = useContext(AuthContext);
    const autenticado = localStorage.getItem('token');

    useEffect(() => {
        const container = document.querySelector('.overflow-y-scroll');
        if (container) {
            container.scrollTo({ top: 0 });
        }
    }, [location.pathname]);

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-60 px-4 py-20 border-custom-light-blue border-r-8'
                style={{
                    backgroundImage: `url(${ImagenFondo})`,
                    backgroundSize: 'cover',
                }}>
                <img className="mx-auto h-26 flex justify-center items-center" src={ImagenLogo} />
                <img src="https://cdn-icons-png.flaticon.com/512/12724/12724695.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-custom-red rounded-full" width={120} height={120} />
                <p className='text-black text-center my-4 text-lg '>
                    <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Bienvenido
                    <br />
                    {auth?.nombre} {auth?.apellido}
                </p>
                <hr className="mt-5 border-slate-500 border-t-2" />
                <ul className="mt-5">
                    <li className="text-center">
                        <Link to='/dashboard' className={`${location.pathname === '/dashboard' ? 'text-white font-bold bg-custom-yellow p-2 rounded-md text-center' : 'text-black font-bold'} text-xl block mt-2 hover:bg-custom-red hover:text-white rounded-md p-2`}>Gestionar Estudiantes</Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/gestionar-materia' className={`${location.pathname === '/dashboard/gestionar-materia' ? 'text-white font-bold bg-custom-yellow p-2 rounded-md text-center' : 'text-black font-bold'} text-xl block mt-2 hover:bg-custom-red hover:text-white rounded-md p-2`}>Gestionar Materias</Link>
                    </li>
                    <li className="text-center">
                        <Link to='/dashboard/gestionar-matricula' className={`${location.pathname === '/dashboard/gestionar-matricula' ? 'text-white font-bold bg-custom-yellow p-2 rounded-md text-center' : 'text-black font-bold'} text-xl block mt-2 hover:bg-custom-red hover:text-white rounded-md p-2`}>Gestionar Matriculas</Link>
                    </li>
                </ul>
            </div>
            <div className='flex-1 flex flex-col justify-between h-screen'>
                <div className='bg-custom-red py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-white'>
                        Usuario - {auth?.nombre} {auth?.apellido}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center bg-red-800 px-4 py-1 rounded-lg"
                            onClick={() => { localStorage.removeItem('token') }}>
                            Salir
                        </Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to='/' />}
                </div>
                <div className='bg-custom-blue py-2 text-center text-white'>
                    <p>@ Sistema de Gestión de Matriculas</p>
                    <p>Quito - Ecuador</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
