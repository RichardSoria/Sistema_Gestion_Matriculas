import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../context/EstudianteProvider";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    // Estado para los campos del formulario
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: false, password: false });

    // Función para actualizar los campos y limpiar errores
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false }); // Eliminar error al escribir
    };

    // Validación de correo electrónico con regex

    // Manejo del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let newErrors = { email: "", password: "" };
    
        const isSuperAdmin = form.email === "Email" && form.password === "Clave";
    
        // Si es Super Admin, no validar y hacer login directamente
        if (!isSuperAdmin) {
            if (!form.email) {
                newErrors.email = "El correo es obligatorio.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
                newErrors.email = "Ingrese un correo válido.";
            }
    
            if (!form.password) {
                newErrors.password = "La contraseña es obligatoria.";
            } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)) {
                newErrors.password = "Debe tener al menos 8 caracteres, una mayúscula y un número.";
            }
    
            if (newErrors.email || newErrors.password) {
                toast.error("Por favor, verifique los campos.");
                setErrors(newErrors);
                return;
            }
        }
    
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, form);
    
            localStorage.setItem("token", respuesta.data.token);
            setAuth(respuesta.data);
            toast.success(`Bienvenido ${respuesta.data.nombre} ${respuesta.data.apellido}`);
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Ocurrió un error al iniciar sesión.");
        }
    };
    
    return (
        <>
            <ToastContainer />
            <div className="flex h-screen">
                {/* Imagen de fondo */}
                <div
                    className="w-1/2 bg-no-repeat bg-cover hidden sm:block border-r-8 border-custom-light-blue"
                    style={{ backgroundImage: `url(/images/panecillo.jpg)` }}
                >
                </div>

                {/* Formulario de Login */}
                <div className="w-full sm:w-1/2 flex justify-center items-center">
                    <div className="md:w-4/5 sm:w-full p-6">
                        <img
                            className="mx-auto mb-4"
                            src="/images/logo_quito_transporte.png"
                            alt="Logo"
                        />
                        <small className="text-gray-600 block text-xl">
                            ¡Bienvenido de nuevo! Por favor ingrese sus credenciales
                        </small>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Correo Electrónico"
                                name="email"
                                variant="outlined"
                                margin="normal"
                                value={form.email || ""}
                                onChange={handleChange}
                                error={Boolean(errors.email)} // Aplica borde rojo si hay error
                                helperText={errors.email} // Muestra mensaje específico
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "20px",
                                        "& fieldset": { borderColor: errors.email ? "red" : "gray" },
                                        "&:hover fieldset": { borderColor: errors.email ? "red" : "primary" },
                                        "&.Mui-focused fieldset": { borderColor: errors.email ? "red" : "primary" },
                                    },
                                    "& .MuiInputLabel-root": { fontSize: "20px" },
                                    "& .MuiFormHelperText-root": { fontSize: "15px" },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                name="password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={form.password || ""}
                                onChange={handleChange}
                                error={Boolean(errors.password)} // Aplica borde rojo si hay error
                                helperText={errors.password} // Muestra mensaje específico
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "20px",
                                        "& fieldset": { borderColor: errors.password ? "red" : "gray" },
                                        "&:hover fieldset": { borderColor: errors.password ? "red" : "primary" },
                                        "&.Mui-focused fieldset": { borderColor: errors.password ? "red" : "primary" },
                                    },
                                    "& .MuiInputLabel-root": { fontSize: "20px" },
                                    "& .MuiFormHelperText-root": { fontSize: "15px" },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: "#1976D2", // Color del botón
                                    fontSize: "20px", // Tamaño de la letra del botón
                                    fontWeight: "bold",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "red", // Color cuando pasas el mouse (hover)
                                    },
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
