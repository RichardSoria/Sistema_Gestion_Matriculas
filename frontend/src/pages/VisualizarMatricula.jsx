import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Mensaje from "../components/Alertas/Mensaje";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const VisualizarMatricula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [matricula, setMatricula] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarMatricula = async () => {
            try {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/matricula/${id}`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setMatricula(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response?.data?.msg || "Error al obtener la matricula", tipo: false });
            }
        };
        consultarMatricula();
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box width="100%" display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={1}>
                Visualizar Matricula
            </Typography>
            <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={3}>
                Este módulo permite visualizar los datos de la matricula.
            </Typography>
            <Box width="100%" display="flex" justifyContent="center">
                {mensaje.respuesta && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                <Card sx={{ boxShadow: 4, borderRadius: 5, p: 2, maxWidth: "700px", backgroundColor: "#f9f9f9" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "justify", textAlign: "justify" }}>
                        <Typography variant="h6" gutterBottom><strong>Código:</strong> {matricula.codigo}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Descripción:</strong> {matricula.descripcion}</Typography> 

                        <Typography variant="h6" gutterBottom><strong>Estudiante: </strong> 
                            {matricula.estudiante ? `${matricula.estudiante.nombre} ${matricula.estudiante.apellido} (Cédula: ${matricula.estudiante.cedula})` : "No disponible"}
                        </Typography>

                        <Typography variant="h6" gutterBottom><strong>Materia: </strong> 
                            {matricula.materia ? matricula.materia.nombre : "No disponible"}
                        </Typography>

                        <Typography variant="h6" gutterBottom><strong>Fecha de Creación:</strong> {matricula.createdAt ? new Date(matricula.createdAt).toLocaleDateString() : "No disponible"}</Typography>
                        <Typography variant="h6" gutterBottom><strong>Última Modificación:</strong> {matricula.updatedAt ? new Date(matricula.updatedAt).toLocaleDateString() : "No disponible"}</Typography>
                    </CardContent>
                </Card>
            </Box>
            {/* Botón de regreso */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ fontSize: "18px", fontWeight: "bold", px: 3, borderRadius: 2, boxShadow: 2 }}
                    onClick={() => navigate("/dashboard/gestionar-matricula")}
                >
                    Regresar a la Gestión de Matriculas
                </Button>
            </Box>
        </Box>
    );
};

export default VisualizarMatricula;
