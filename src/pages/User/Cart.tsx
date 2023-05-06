import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import CartItem from '../../components/User/CartItem';
import Heading from '../../components/Common/Heading';
import headingImg from '../../assets/images/img4.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Cart = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <Heading level={2} imageUrl={headingImg}>
        Your Cart
      </Heading>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ margin: '10px auto' }}
      >
        {items.map(item => (
          <Grid xs={6} sm={4} md={4} key={item._id}>
            <CartItem {...item} />
          </Grid>
        ))}
      </Grid>
      {items.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
          <Typography variant="h6" component="div">
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Link to="/checkout">
            <Button variant="contained">Checkout</Button>
          </Link>
        </Box>
      )}
    </div>
  );
};

export default Cart;
