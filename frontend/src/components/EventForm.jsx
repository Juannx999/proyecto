import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

const EventForm = ({ existingEvent, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    descripcion: ''
  });

  const [isEditing, setIsEditing] = useState(false); 
  const [eventos, setEventos] = useState([]); 


  useEffect(() => {
    fetchEventos();
  }, []);

 
  useEffect(() => {
    if (existingEvent) {
      setFormData(existingEvent);
      setIsEditing(true); 
    } else {
      setIsEditing(false); 
    }
  }, [existingEvent]); 

  // Obtener la lista de eventos
  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isEditing && formData._id) {
        await axios.put(`http://localhost:3000/api/eventos/${formData._id}`, formData, config);
        Swal.fire("Evento actualizado", "El evento ha sido actualizado con éxito.", "success");
      } else {
      
        await axios.post('http://localhost:3000/api/eventos', formData, config);
        Swal.fire("Evento creado", "El evento se ha creado correctamente.", "success");
      }

      setFormData({ nombre: '', fecha: '', hora: '', ubicacion: '', descripcion: '' });
      fetchEventos(); 

      if (typeof onSubmit === 'function') {
        onSubmit();
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      Swal.fire("Error", error.response ? error.response.data : "Hubo un problema al guardar el evento.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el evento de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/api/eventos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          Swal.fire("Eliminado", "El evento ha sido eliminado.", "success");
          fetchEventos(); 
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el evento.", "error", error);
        }
      }
    });
  };


  const handleCancel = () => {
    setFormData({ nombre: '', fecha: '', hora: '', ubicacion: '', descripcion: '' });
    setIsEditing(false);
  };


  const handleEdit = (evento) => {
    setFormData(evento);
    setIsEditing(true);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" gutterBottom>
          {isEditing ? "Editar Evento" : "Crear Evento"}
        </Typography>
        <TextField label="Nombre del evento" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <TextField type="date" name="fecha" value={formData.fecha} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField type="time" name="hora" value={formData.hora} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField label="Ubicación" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
        <TextField label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} required multiline rows={4} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isEditing ? (
            <>
              <Button type="submit" variant="contained" sx={{ bgcolor: 'yellow', color: 'black' }}>
                Actualizar Evento
              </Button>
              <Button variant="contained" sx={{ bgcolor: 'red', color: 'white' }} onClick={handleCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Guardar Evento
            </Button>
          )}
        </Box>
      </Box>

      {/* Tabla de eventos */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Lista de Eventos</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Hora</strong></TableCell>
              <TableCell><strong>Ubicación</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map((evento) => (
              <TableRow key={evento._id}>
                <TableCell>{evento.nombre}</TableCell>
                <TableCell>{evento.fecha}</TableCell>
                <TableCell>{evento.hora}</TableCell>
                <TableCell>{evento.ubicacion}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(evento)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(evento._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

EventForm.propTypes = {
  existingEvent: PropTypes.shape({
    _id: PropTypes.string,
    nombre: PropTypes.string,
    fecha: PropTypes.string,
    hora: PropTypes.string,
    ubicacion: PropTypes.string,
    descripcion: PropTypes.string,
  }),
  onSubmit: PropTypes.func
};

export default EventForm;
