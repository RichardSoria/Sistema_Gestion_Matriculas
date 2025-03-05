import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import MatriculaContext from "../../context/MatriculaProvider";
import { TextField, Button, Box, Grid, MenuItem } from "@mui/material";

export const FormularioMatricula = () => {
    const { matriculaSeleccionada, listarMatriculas } = useContext(MatriculaContext);
    const [mensaje, setMensaje] = useState({});
    const [estudiantes, setEstudiantes] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({
        codigo: "",
        descripcion: "",
        estudiante: "",
        materia: "",
    });

    // Estado para validaciones de los campos
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (matriculaSeleccionada) {
            setForm({
                codigo: matriculaSeleccionada.codigo || "",
                descripcion: matriculaSeleccionada.descripcion || "",
                estudiante: matriculaSeleccionada.estudiante?._id || "",
                materia: matriculaSeleccionada.materia?._id || "",
            });
        } else {
            resetForm();
        }
    }, [matriculaSeleccionada]);

    useEffect(() => {
        obtenerEstudiantes();
        obtenerMaterias();
    }, []);

    const resetForm = () => {
        setForm({
            codigo: "",
            descripcion: "",
            estudiante: "",
            materia: "",
        });
        setErrors({});
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    // Obtener lista de estudiantes
    const obtenerEstudiantes = async () => {
        try {
            const token = localStorage.getItem("token");
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

    // Obtener lista de materias
    const obtenerMaterias = async () => {
        try {
            const token = localStorage.getItem("token");
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

    // Validaciones
    const validateFields = () => {
        let newErrors = {};

        if (!form.codigo) newErrors.codigo = "El código es obligatorio.";
        else if (!/^[a-zA-Z0-9]+$/.test(form.codigo)) newErrors.codigo = "Solo letras y números.";

        if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria.";
        else if (form.descripcion.length > 50) newErrors.descripcion = "Máximo 50 caracteres.";

        if (!form.estudiante) newErrors.estudiante = "Seleccione un estudiante.";
        if (!form.materia) newErrors.materia = "Seleccione una materia.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            const confirmacion = window.confirm("¿Estás seguro de agregar esta matrícula?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/matricula/crear`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.post(url, form, options);
                listarMatriculas();
                resetForm();
                setMensaje({ respuesta: "Matrícula registrada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al registrar matrícula", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            if (!matriculaSeleccionada) {
                setMensaje({ respuesta: "Seleccione una matrícula para actualizar", tipo: false });
                return;
            }

            const confirmacion = window.confirm("¿Estás seguro de actualizar esta matrícula?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/matricula/actualizar/${matriculaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.put(url, form, options);
                listarMatriculas();
                resetForm();
                setMensaje({ respuesta: "Matrícula actualizada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al actualizar matrícula", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleEliminar = async (e) => {
        e.preventDefault();
        try {
            if (!matriculaSeleccionada) {
                setMensaje({ respuesta: "Seleccione una matrícula para eliminar", tipo: false });
                return;
            }

            const confirmacion = window.confirm("¿Estás seguro de eliminar esta matrícula?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/matricula/eliminar/${matriculaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.delete(url, options);
                listarMatriculas();
                resetForm();
                setMensaje({ respuesta: "Matrícula eliminada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al eliminar matrícula", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    return (
        <Box className="shadow-2xl rounded-lg p-10">
            {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            <TextField label="Código" name="codigo" fullWidth variant="outlined" margin="normal"
                value={form.codigo} onChange={handleChange} error={!!errors.codigo} helperText={errors.codigo}
            />

            <TextField label="Descripción" name="descripcion" fullWidth variant="outlined" margin="normal"
                value={form.descripcion} onChange={handleChange} error={!!errors.descripcion} helperText={errors.descripcion}
            />

            <TextField label="Estudiante" name="estudiante" select fullWidth variant="outlined" margin="normal"
                value={form.estudiante} onChange={handleChange} error={!!errors.estudiante} helperText={errors.estudiante}>
                {estudiantes.map((est) => (
                    <MenuItem key={est._id} value={est._id}>
                        {est.nombre} {est.apellido}
                    </MenuItem>
                ))}
            </TextField>

            <TextField label="Materia" name="materia" select fullWidth variant="outlined" margin="normal"
                value={form.materia} onChange={handleChange} error={!!errors.materia} helperText={errors.materia}>
                {materias.map((mat) => (
                    <MenuItem key={mat._id} value={mat._id}>
                        {mat.nombre}
                    </MenuItem>
                ))}
            </TextField>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="primary" fullWidth sx={{ fontSize: "20px" }} onClick={handleAgregar}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px", fontSize: "22px" }} />
                        Agregar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="warning" fullWidth sx={{ fontSize: "20px" }} onClick={handleActualizar}>
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "8px", fontSize: "22px" }} />
                        Actualizar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="error" fullWidth sx={{ fontSize: "20px" }} onClick={handleEliminar}>
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px", fontSize: "22px" }} />
                        Eliminar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormularioMatricula;
