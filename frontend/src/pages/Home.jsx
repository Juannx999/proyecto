import EventList from '../components/EventList';
import { Container, Typography } from '@mui/material';

const Home = () => {

  return (
    <Container>
      <Typography variant="h3" gutterBottom></Typography>
      
      <EventList />
    </Container>
  );
};

export default Home;
