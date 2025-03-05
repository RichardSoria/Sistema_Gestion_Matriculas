import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas/Mensaje";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const VisualizarMateria = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [materia, setMateria] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarMateria = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/materia/${id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setMateria(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response?.data?.msg || "Error al obtener la materia", tipo: false });
            }
        };
        consultarMateria();
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={1}>
                Visualizar Materia
            </Typography>
            <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={3}>
                Este módulo permite visualizar los datos de la materia.
            </Typography>
            <Box width="100%" display="flex" justifyContent="center">
                {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <Card sx={{ boxShadow: 4, borderRadius: 5, p: 2, maxWidth: "700px", backgroundColor: "#f9f9f9" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "justify", textAlign: "justify" }}>
                        <Typography variant="h6" gutterBottom><strong>Nombre:</strong> {materia.nombre}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Código:</strong> {materia.codigo}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Descripción:</strong> {materia.descripcion}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Créditos:</strong> {materia.creditos}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Fecha de Nacimiento:</strong> {materia.fecha_nacimiento ? new Date(materia.fecha_nacimiento).toLocaleDateString() : "No disponible"}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Fecha de Creación:</strong> {materia.createdAt ? new Date(materia.createdAt).toLocaleDateString() : "No disponible"}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Última Modificación:</strong> {materia.updatedAt ? new Date(materia.updatedAt).toLocaleDateString() : "No disponible"}</Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* Botón de regreso */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ fontSize: "18px", fontWeight: "bold", px: 3, borderRadius: 2, boxShadow: 2 }}
                    onClick={() => navigate("/dashboard/gestionar-materia")}
                >
                    Regresar a la Gestión de Materias
                </Button>
            </Box>
        </Box>
    );
};

export default VisualizarMateria;
