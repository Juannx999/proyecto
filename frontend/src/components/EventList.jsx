import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Box, Paper, Divider, Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

const EventList = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:3000/api/eventos', config);
        setEventos(response.data);
      } catch (error) {
        alert('Error al obtener eventos', error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <Box sx={{ mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>Eventos</Typography>
      <Paper elevation={3} sx={{ bgcolor: '#eaeaea', p: 3, borderRadius: '10px' }}>
        <List>
          {eventos.map((evento) => (
            <React.Fragment key={evento._id}>
              <ListItem alignItems="flex-start" sx={{ 
                bgcolor: '#fff', 
                borderRadius: '5px', 
                mb: 2, 
                boxShadow: 1,
                p: 2 
              }}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <EventIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span" sx={{ color: '#333', fontWeight: 'bold' }}>
                      {evento.nombre}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Fecha: {evento.fecha} - Hora: {evento.hora}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Ubicación: {evento.ubicacion}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {evento.descripcion}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="middle" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default EventList;
