import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
});

const Title = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: '#333',
});

const Subtitle = styled(Typography)({
  fontSize: '2rem',
  color: '#666',
});

const ButtonLink = styled(Button)({
  marginTop: '2rem',
  padding: '1rem 2rem',
  backgroundColor: 'primary',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'primary',
  },
});

const Error = () => {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Oops! Page not found.</Subtitle>
      <Link to="/">
        <ButtonLink variant="contained">Go back home</ButtonLink>
      </Link>
    </Container>
  );
};

export default Error;
