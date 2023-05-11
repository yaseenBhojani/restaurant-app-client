import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Heading from '../../components/Common/Heading';
import { getOrders } from '../../store/reducers/orderReducer';
import { AppDispatch, RootState } from '../../store';
import { Order } from '../../types/interfaces';
import OrderCard from '../../components/User/OrderCard';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getOrders()).catch((error: unknown) => {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? 'An error occurred'
          : 'An error occurred'
      );
    });
  }, [dispatch]);

  const { items } = useSelector((state: RootState) => state.order);

  return (
    <>
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        YOUR ORDERS
      </Heading>
      <Box sx={{ m: 4 }}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        {isAuthenticated ? (
          <Grid container spacing={2} alignItems="stretch">
            {items.map((order: Order, index: number) => (
              <OrderCard key={order._id} order={order} index={index} />
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              fontSize: { xs: '1.8rem', sm: '2rem', md: '3rem' },
            }}
          >
            You need to log in to view your orders
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Orders;
