import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventForm from './components/EventForm'; // Importa tu componente EventForm

function App() {
  const handleEventSubmit = () => {
    console.log("Evento guardado correctamente");
    // Aquí podrías redirigir al usuario o actualizar la lista de eventos
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<EventForm onSubmit={handleEventSubmit} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
