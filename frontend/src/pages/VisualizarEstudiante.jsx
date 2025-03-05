import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas/Mensaje";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const VisualizarEstudiante = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarEstudiante = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/${id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setEstudiante(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response?.data?.msg || "Error al obtener estudiante", tipo: false });
            }
        };
        consultarEstudiante();
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={1}>
                Visualizar Estudiante
            </Typography>
            <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={3}>
                Este módulo permite visualizar los datos del estudiante.
            </Typography>
            <Box width="100%" display="flex" justifyContent="center">
                {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <Card sx={{ boxShadow: 4, borderRadius: 5, p: 2, maxWidth: "600px", backgroundColor: "#f9f9f9" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "justify", textAlign: "justify" }}>
                        <Typography variant="h6" gutterBottom><strong>Nombre:</strong> {estudiante.nombre}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Apellido:</strong> {estudiante.apellido}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Email:</strong> {estudiante.email}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Cédula:</strong> {estudiante.cedula}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Teléfono:</strong> {estudiante.telefono}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Ciudad:</strong> {estudiante.ciudad}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Dirección:</strong> {estudiante.direccion}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Fecha de Nacimiento:</strong> {estudiante.fecha_nacimiento ? new Date(estudiante.fecha_nacimiento).toLocaleDateString() : "No disponible"}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Fecha de Creación:</strong> {estudiante.createdAt ? new Date(estudiante.createdAt).toLocaleDateString() : "No disponible"}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Última Modificación:</strong> {estudiante.updatedAt ? new Date(estudiante.updatedAt).toLocaleDateString() : "No disponible"}</Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* Botón de regreso */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ fontSize: "18px", fontWeight: "bold", px: 3, borderRadius: 2, boxShadow: 2 }}
                    onClick={() => navigate("/dashboard")}
                >
                    Regresar a la Gestión de Estudiantes
                </Button>
            </Box>
        </Box>
    );
};

export default VisualizarEstudiante;
