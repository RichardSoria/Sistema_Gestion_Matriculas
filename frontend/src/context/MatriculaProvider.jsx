import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatriculaContext = createContext();

const MatriculaProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Para redirigir en caso de error
    const [auth, setAuth] = useState({});
    const [matriculas, setMatriculas] = useState([]);
    const [matriculaSeleccionada, setMatriculaSeleccionada] = useState(null);

    // Obtener lista de todas las matrículas
    const listarMatriculas = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/matriculas`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setMatriculas(respuesta.data);
        } catch (error) {
            console.error("Error al obtener matrículas:", error);
        }
    };

    // Obtener una matrícula por su ID
    const obtenerMatricula = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/matricula/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            return respuesta.data;
        } catch (error) {
            console.error("Error al obtener matrícula:", error);
            return null;
        }
    };

    useEffect(() => {
        listarMatriculas();
        setMatriculaSeleccionada(null);
    }, [location.pathname]);

    return (
        <MatriculaContext.Provider
            value={{
                auth,
                setAuth,
                listarMatriculas,
                obtenerMatricula,
                matriculas,
                setMatriculas,
                matriculaSeleccionada,
                setMatriculaSeleccionada
            }}
        >
            {children}
        </MatriculaContext.Provider>
    );
};

export { MatriculaProvider };
export default MatriculaContext;
