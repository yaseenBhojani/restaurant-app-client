import * as React from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  setCardName,
  setCardNumber,
  setExpDate,
  setCvv,
  setSaveCard,
} from '../../../store/reducers/checkoutReducer';

const PaymentForm = () => {
  const dispatch = useDispatch();

  const handleCardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCardName(event.target.value));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setCardNumber(event.target.value));
  };

  const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setExpDate(event.target.value));
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCvv(event.target.value));
  };

  const handleSaveCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSaveCard(event.target.checked));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleCardNameChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleCardNumberChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleExpDateChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleCvvChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveCard"
                value="yes"
                onChange={handleSaveCardChange}
              />
            }
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PaymentForm;
