import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import Mensaje from "../Alertas/Mensaje";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "../../context/EstudianteProvider";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

export const FormularioEstudiante = () => {
    const { estudianteSeleccionado, listarEstudiantes } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: '',
    });

    // Estado para validaciones de los campos
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (estudianteSeleccionado) {
            setForm(estudianteSeleccionado);
        } else {
            resetForm();
        }
    }, [estudianteSeleccionado]);

    const resetForm = () => {
        setForm({
            nombre: '',
            apellido: '',
            cedula: '',
            fecha_nacimiento: '',
            ciudad: '',
            direccion: '',
            telefono: '',
            email: '',
        });
        setErrors({});
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    // Validaciones
    const validateFields = () => {
        let newErrors = {};

        if (!form.nombre) newErrors.nombre = "El nombre es obligatorio.";
        else if (form.nombre.length > 20) newErrors.nombre = "Máximo 20 caracteres.";

        if (!form.apellido) newErrors.apellido = "El apellido es obligatorio.";
        else if (form.apellido.length > 20) newErrors.apellido = "Máximo 20 caracteres.";

        if (!form.cedula) newErrors.cedula = "La cédula es obligatoria.";
        else if (!/^\d{10}$/.test(form.cedula)) newErrors.cedula = "Debe tener 10 dígitos.";

        if (!form.fecha_nacimiento) newErrors.fecha_nacimiento = "Seleccione una fecha válida.";

        if (!form.ciudad) newErrors.ciudad = "La ciudad es obligatoria.";
        else if (form.ciudad.length > 20) newErrors.ciudad = "Máximo 20 caracteres.";

        if (!form.direccion) newErrors.direccion = "La dirección es obligatoria.";
        else if (form.direccion.length > 50) newErrors.direccion = "Máximo 50 caracteres.";

        if (!form.telefono) newErrors.telefono = "El teléfono es obligatorio.";
        else if (!/^\d{10}$/.test(form.telefono)) newErrors.telefono = "Debe tener 10 dígitos.";

        if (!form.email) newErrors.email = "El email es obligatorio.";
        else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = "Formato de email inválido.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            const confirmacion = window.confirm('¿Estás seguro de agregar este estudiante?');
            if (confirmacion) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/crear`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                const formCrear = { ...form };
                delete formCrear._id;

                await axios.post(url, formCrear, options);
                listarEstudiantes();
                resetForm();
                setMensaje({ respuesta: "Estudiante registrado con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al registrar estudiante", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            if (!estudianteSeleccionado) {
                setMensaje({ respuesta: "Seleccione un estudiante para actualizar", tipo: false });
                return;
            }

            const confirmacion = window.confirm('¿Estás seguro de actualizar este estudiante?');
            if (confirmacion) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/actualizar/${estudianteSeleccionado._id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                await axios.put(url, form, options);
                listarEstudiantes();
                resetForm();
                setMensaje({ respuesta: "Estudiante actualizado con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al actualizar estudiante", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleEliminar = async (e) => {
        e.preventDefault();
        try {
            if (!estudianteSeleccionado) {
                setMensaje({ respuesta: "Seleccione un estudiante para eliminar", tipo: false });
                return;
            }

            const confirmacion = window.confirm('¿Estás seguro de eliminar este estudiante?');
            if (confirmacion) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/eliminar/${estudianteSeleccionado._id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };

                await axios.delete(url, options);
                listarEstudiantes();
                resetForm();
                setMensaje({ respuesta: "Estudiante eliminado con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al eliminar estudiante", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    return (
        <Box className="shadow-2xl rounded-lg p-10">
            {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            {Object.keys(form)
                .filter(field => field !== "_id" && field !== "createdAt" && field !== "updatedAt") // Oculta los campos
                .map((field) => (
                    <TextField
                        key={field}
                        label={field.replace('_', ' ').toUpperCase()}
                        name={field}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type={field === "fecha_nacimiento" ? "date" : "text"}
                        InputLabelProps={field === "fecha_nacimiento" ? { shrink: true } : {}}
                        value={form[field]}
                        onChange={handleChange}
                        error={!!errors[field]}
                        helperText={errors[field]}
                        sx={{ fontSize: "20px", "& .MuiInputBase-input": { fontSize: "20px" } }}
                    />
                ))}

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="primary" fullWidth sx={{ fontSize: "20px" }} onClick={handleAgregar}>
                        <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "8px", fontSize: "22px" }} />
                        Agregar
                    </Button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="warning" fullWidth sx={{ fontSize: "20px" }} onClick={handleActualizar}>
                        <FontAwesomeIcon icon={faUserPen} style={{ marginRight: "8px", fontSize: "22px" }} />
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

export default FormularioEstudiante;
