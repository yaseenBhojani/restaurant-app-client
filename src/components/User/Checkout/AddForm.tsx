import * as React from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  setEmail,
  setAddress,
  setCity,
  setZip,
  setCountry,
  setSaveAddress,
} from '../../../store/reducers/checkoutReducer';

const AddressForm = () => {
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value));
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAddress(event.target.value));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCity(event.target.value));
  };

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setZip(event.target.value));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCountry(event.target.value));
  };

  const handleSaveAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSaveAddress(event.target.checked));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping"
            variant="standard"
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleCityChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleZipChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleCountryChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveAddress"
                value="yes"
                onChange={handleSaveAddressChange}
              />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddressForm;
