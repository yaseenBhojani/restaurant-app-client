import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Heading from '../../components/Common/Heading';
import img from '../../assets/images/img4.jpg';
import { AppDispatch, RootState } from '../../store';
import { getOrders } from '../../store/reducers/orderReducer';

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getOrders())
      .unwrap()
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <>
      <Heading level={2} imageUrl={img}>
        YOUR ORDERS
      </Heading>
      <Box sx={{ m: 4 }}>
        <Grid container spacing={2} alignItems="stretch">
          {items.map((order, index) => (
            <Grid item key={order._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardHeader
                  title={`Order #${index + 1}`}
                  subheader={order.createdAt?.toString().slice(0, 10)}
                />
                <Divider />
                <CardContent sx={{ flexGrow: 1 }}>
                  {order.items.length > 0 ? (
                    <List
                      sx={{
                        maxHeight: 200,
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                          width: 8,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 4,
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        },
                      }}
                    >
                      {order.items.map(item => (
                        <ListItem key={item._id} disableGutters>
                          <ListItemText
                            primary={item.name}
                            secondary={`$${item.price} x ${item.quantity}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1">
                      No items in this order
                    </Typography>
                  )}
                </CardContent>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Total: ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color={
                      order.status === 'Pending'
                        ? 'primary'
                        : order.status === 'Accepted'
                        ? 'success'
                        : 'error'
                    }
                    sx={{ width: '100%' }}
                  >
                    {order.status}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Orders;
