import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Mensaje from "../Alertas/Mensaje";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import MateriaContext from "../../context/MateriaProvider";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

export const FormularioMateria = () => {
    const { materiaSeleccionada, listarMaterias } = useContext(MateriaContext);
    const [mensaje, setMensaje] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        codigo: "",
        descripcion: "",
        creditos: "",
    });

    // Estado para validaciones de los campos
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (materiaSeleccionada) {
            setForm(materiaSeleccionada);
        } else {
            resetForm();
        }
    }, [materiaSeleccionada]);

    const resetForm = () => {
        setForm({
            nombre: "",
            codigo: "",
            descripcion: "",
            creditos: "",
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
        else if (form.nombre.length > 50) newErrors.nombre = "Máximo 50 caracteres.";

        if (!form.codigo) newErrors.codigo = "El código es obligatorio.";
        else if (!/^[a-zA-Z0-9]+$/.test(form.codigo)) newErrors.codigo = "Solo letras y números.";

        if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria.";
        else if (form.descripcion.length > 100) newErrors.descripcion = "Máximo 100 caracteres.";

        if (!form.creditos) newErrors.creditos = "Los créditos son obligatorios.";
        else if (form.creditos < 1) newErrors.creditos = "Debe ser al menos 1.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            const confirmacion = window.confirm("¿Estás seguro de agregar esta materia?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/materia/crear`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const formCrear = { ...form };
                delete formCrear._id;

                await axios.post(url, formCrear, options);
                listarMaterias();
                resetForm();
                setMensaje({ respuesta: "Materia registrada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al registrar materia", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleActualizar = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            if (!materiaSeleccionada) {
                setMensaje({ respuesta: "Seleccione una materia para actualizar", tipo: false });
                return;
            }

            const confirmacion = window.confirm("¿Estás seguro de actualizar esta materia?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/materia/actualizar/${materiaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.put(url, form, options);
                listarMaterias();
                resetForm();
                setMensaje({ respuesta: "Materia actualizada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al actualizar materia", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    const handleEliminar = async (e) => {
        e.preventDefault();
        try {
            if (!materiaSeleccionada) {
                setMensaje({ respuesta: "Seleccione una materia para eliminar", tipo: false });
                return;
            }

            const confirmacion = window.confirm("¿Estás seguro de eliminar esta materia?");
            if (confirmacion) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/materia/eliminar/${materiaSeleccionada._id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                await axios.delete(url, options);
                listarMaterias();
                resetForm();
                setMensaje({ respuesta: "Materia eliminada con éxito.", tipo: true });
                setTimeout(() => setMensaje({}), 3000);
            }
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.message || "Error al eliminar materia", tipo: false });
            setTimeout(() => setMensaje({}), 3000);
        }
    };

    return (
        <Box className="shadow-2xl rounded-lg p-10">
            {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            {Object.keys(form)
            .filter(field => field !== "_id" && field !== "createdAt" && field !== "updatedAt")
            .map((field) => (
                <TextField
                    key={field}
                    label={field.replace("_", " ").toUpperCase()}
                    name={field}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type={field === "creditos" ? "number" : "text"}
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

export default FormularioMateria;
