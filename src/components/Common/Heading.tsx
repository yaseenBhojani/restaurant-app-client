import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IHeading } from '../../types/interfaces';

// Heading component
const Heading = ({ children, level, imageUrl }: IHeading) => {
  const levels = ['50vh', '30vh', '20vh', '10vh'];

  return (
    // Container for the heading
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: levels[level - 1], // Use index to access the correct level from the levels array
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant={
              level === 1
                ? 'h1'
                : level === 2
                ? 'h2'
                : level === 3
                ? 'h3'
                : 'h4'
            }
            component="div"
            color="white"
            sx={{
              textShadow: '2px 2px 4px #000000',
              textAlign: 'center',
              fontSize: { xs: '3rem', md: '5rem' },
            }}
          >
            {children}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Heading;
