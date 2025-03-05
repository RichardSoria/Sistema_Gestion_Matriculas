import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const EstudianteProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Para redirigir en caso de error
    const [auth, setAuth] = useState({});
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

    // Obtener perfil del usuario autenticado
    const obtenerPerfil = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setAuth(respuesta.data);
        } catch (error) {
            console.error("Error al obtener perfil:", error);
            cerrarSesion();
        }
    };

    // Obtener lista de estudiantes
    const listarEstudiantes = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setEstudiantes(respuesta.data);
        } catch (error) {
            console.error("Error al obtener estudiantes:", error);
        }
    };

    // Obtener un estudiante por su ID
    const obtenerEstudiante = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            return respuesta.data;
        } catch (error) {
            console.error("Error al obtener estudiante:", error);
            return null;
        }
    }

    useEffect(() => {
        obtenerPerfil();
        listarEstudiantes();
        setEstudianteSeleccionado(null);
    }, [location.pathname]);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                listarEstudiantes,
                obtenerEstudiante,
                estudiantes,
                setEstudiantes,
                estudianteSeleccionado,
                setEstudianteSeleccionado,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { EstudianteProvider };
export default AuthContext;
