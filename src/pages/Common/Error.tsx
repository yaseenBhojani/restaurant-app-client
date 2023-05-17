import { Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// Styled container for the error page
const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
});

// Styled title component
const Title = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: '#333',
});

// Styled subtitle component
const Subtitle = styled(Typography)({
  fontSize: '2rem',
  color: '#666',
});

// Styled button component with link
const ButtonLink = styled(Button)({
  marginTop: '2rem',
  padding: '1rem 2rem',
  backgroundColor: 'primary',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'primary',
  },
});

// Error component
const Error = () => {
  return (
    <Container>
      {/* Error title */}
      <Title>ERROR</Title>

      {/* Error subtitle */}
      <Subtitle>Oops! Something Went Wrong</Subtitle>

      {/* Link to go back home */}
      <Link to="/">
        <ButtonLink variant="contained">Go back home</ButtonLink>
      </Link>
    </Container>
  );
};

export default Error;
