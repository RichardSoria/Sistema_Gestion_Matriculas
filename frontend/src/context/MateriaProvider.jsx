import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MateriaContext = createContext();

const MateriaProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate(); // Para redirigir en caso de error
    const [auth, setAuth] = useState({});
    const [materias, setMaterias] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    // Obtener lista de todas las materias
    const listarMaterias = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/materias`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setMaterias(respuesta.data);
        } catch (error) {
            console.error("Error al obtener materias:", error);
        }
    };

    // Obtener una materia por su ID
    const obtenerMateria = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/materia/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            return respuesta.data;
        } catch (error) {
            console.error("Error al obtener materia:", error);
            return null;
        }
    };

    useEffect(() => {
        listarMaterias();
        setMateriaSeleccionada(null);
    }, [location.pathname]);

    return (
        <MateriaContext.Provider
            value={{
                auth,
                setAuth,
                listarMaterias,
                obtenerMateria,
                materias,
                setMaterias,
                materiaSeleccionada,
                setMateriaSeleccionada
            }}
        >
            {children}
        </MateriaContext.Provider>
    );
};

export { MateriaProvider };
export default MateriaContext;
