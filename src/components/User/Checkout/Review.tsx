import * as React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { RootState } from '../../../store';

const Review = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const shippingAddress = useSelector(
    (state: RootState) => state.checkout.shippingAddress
  );
  const paymentMethod = useSelector(
    (state: RootState) => state.checkout.paymentMethod
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map(item => (
          <ListItem key={item._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography variant="body2">${item.price.toFixed(2)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping address
          </Typography>
          <Typography gutterBottom>{shippingAddress.address}</Typography>
          <Typography gutterBottom>
            {shippingAddress.city}, {shippingAddress.zip}
          </Typography>
          <Typography gutterBottom>{shippingAddress.country}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography gutterBottom>Card holder:</Typography>
              <Typography gutterBottom>Card number:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentMethod.cardName}</Typography>
              <Typography gutterBottom>{paymentMethod.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date:</Typography>
              <Typography gutterBottom>CVV:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentMethod.expDate}</Typography>
              <Typography gutterBottom>{paymentMethod.cvv}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
