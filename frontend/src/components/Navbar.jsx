import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    window.addEventListener('storage', checkToken);
    return () => {
      window.removeEventListener('storage', checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    Swal.fire({
      title: "Sesión cerrada",
      text: "Has cerrado sesión exitosamente",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK"
    }).then(() => {
      navigate('/'); 
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>}
          {!isLoggedIn && <Button color="inherit" component={Link} to="/register">Registrar</Button>}
          {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
