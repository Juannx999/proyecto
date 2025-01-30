import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Paper, Avatar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      
      window.dispatchEvent(new Event("storage"));

      
      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Bienvenido de nuevo",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar"
      }).then(() => {
        navigate('/create-event'); 
      });

    } catch (error) {
      
      Swal.fire({
        title: "Error en inicio de sesión",
        text: error.response?.data?.message || "Verifica tus credenciales e intenta nuevamente",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Intentar de nuevo"
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px', bgcolor: '#fafafa' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
