import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

import Heading from '../../components/Common/Heading';
import ImageGallery from '../../components/User/ImageGallery';
import Pricing from '../../components/User/Pricing';
import img from '../../assets/images/img1.jpg';

const Description = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '2rem',
  padding: '20px',
  [theme.breakpoints.down('lg')]: {
    gap: '20px',
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const DescriptionLeft = styled('div')({
  textAlign: 'center',
  marginBottom: '10px',
});

const descriptionTextStyles = {
  fontSize: '24px',
  fontWeight: 300,
  lineHeight: 1.5,
  padding: '5px 10px',
  margin: '20px 0',
  color: '#666666',
  textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
  '&::before': {
    content: "''",
    display: 'block',
    width: '70px',
    height: '2px',
    margin: '20px auto',
    backgroundColor: '#fd2046',
  },
  '@media (max-width: 600px)': {
    fontSize: '20px',
  },
  '@media (max-width: 480px)': {
    fontSize: '18px',
    margin: '30px 0',
  },
};

const Home = () => {
  return (
    <div className="root">
      <div>
        <Heading level={1} imageUrl={img}>
          SPICE ROUTE KITCHEN
        </Heading>

        <Description>
          <DescriptionLeft>
            <Typography variant="h6" sx={descriptionTextStyles}>
              Welcome to our restaurant! We take pride in using the freshest
              ingredients to prepare our delicious meals. Our team of chefs and
              staff are dedicated to providing you with an unforgettable dining
              experience. Whether you are looking for a quick bite or a romantic
              dinner, we have the perfect meal for you. Come and try our menu
              today and taste the difference!
            </Typography>

            <Link to="/foods">
              <Button variant="contained">See Foods</Button>
            </Link>
          </DescriptionLeft>
          <div>
            <ImageGallery />
          </div>
        </Description>
      </div>

      <Pricing />
    </div>
  );
};

export default Home;
