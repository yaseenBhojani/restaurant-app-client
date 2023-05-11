import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: '#fff',
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              About us
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Contact us
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Careers
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Features
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Pricing
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              FAQs
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Blog
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Documentation
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Support
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Social
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Facebook
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              Twitter
            </Typography>
            <Typography variant="body2" sx={{ cursor: 'pointer' }}>
              LinkedIn
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
